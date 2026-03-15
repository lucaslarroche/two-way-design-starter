/**
 * figma-to-tokens.ts
 * Fetch color styles from Figma and update src/tokens/tokens.json.
 *
 * Figma style names follow the color/family/shade convention
 * (e.g. "color/blue/700") and are stored directly as hex values
 * in tokens.json under the matching path (e.g. color.blue.700 = "#1447e6").
 *
 * Usage: npm run figma:pull
 * Requires: FIGMA_TOKEN and FIGMA_FILE_ID in .env.local
 */

import fs from "fs"
import path from "path"

function hexFromRgba(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((c) =>
        Math.round(c * 255)
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
  )
}

// ---------------------------------------------------------------------------
// Load .env.local
// ---------------------------------------------------------------------------
const envPath = path.resolve(".env.local")
if (!fs.existsSync(envPath)) {
  console.error("❌  .env.local not found. Copy .env.example and fill in your credentials.")
  process.exit(1)
}
for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
  const [key, ...rest] = line.split("=")
  if (key && rest.length) process.env[key.trim()] = rest.join("=").trim()
}

const FIGMA_TOKEN = process.env.FIGMA_TOKEN
const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID

if (!FIGMA_TOKEN || !FIGMA_FILE_ID) {
  console.error("❌  FIGMA_TOKEN and FIGMA_FILE_ID must be set in .env.local")
  process.exit(1)
}

const TOKENS_PATH = path.resolve("src/tokens/tokens.json")

// ---------------------------------------------------------------------------
// Figma helpers
// ---------------------------------------------------------------------------
async function figmaGet(endpoint: string) {
  const res = await fetch(`https://api.figma.com/v1${endpoint}`, {
    headers: { "X-Figma-Token": FIGMA_TOKEN! },
  })
  if (!res.ok) throw new Error(`Figma API ${res.status}: ${await res.text()}`)
  return res.json()
}

/**
 * Map a Figma style name to a token path array.
 * "color/blue/700" or "Colors/Blue/700" → ["color", "blue", "700"]
 */
function figmaNameToTokenPath(name: string): string[] {
  return name
    .toLowerCase()
    .replace(/^colors?\//i, "color/")
    .split("/")
    .map((s) => s.trim())
}

function setNestedValue(obj: Record<string, unknown>, keys: string[], value: string) {
  let current = obj
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]] || typeof current[keys[i]] !== "object") current[keys[i]] = {}
    current = current[keys[i]] as Record<string, unknown>
  }
  current[keys[keys.length - 1]] = value
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function run() {
  console.log(`\n🔍  Fetching styles from Figma file: ${FIGMA_FILE_ID}\n`)

  const stylesData = await figmaGet(`/files/${FIGMA_FILE_ID}/styles`)
  const stylesMeta: Record<string, { name: string; style_type: string; node_id: string }> =
    stylesData.meta?.styles ?? {}

  const nodeIds = Object.values(stylesMeta).map((s) => s.node_id)
  if (nodeIds.length === 0) {
    console.log("⚠️   No styles found. Check that your Figma file has local color styles.")
    return
  }

  const nodesData = await figmaGet(`/files/${FIGMA_FILE_ID}/nodes?ids=${nodeIds.join(",")}`)
  const nodes = nodesData.nodes ?? {}

  const currentTokens = JSON.parse(fs.readFileSync(TOKENS_PATH, "utf-8"))
  let updateCount = 0

  for (const [, meta] of Object.entries(stylesMeta)) {
    const { name, style_type, node_id } = meta as {
      name: string
      style_type: string
      node_id: string
    }
    const node = nodes[node_id]?.document
    if (!node || style_type !== "FILL") continue

    const fill = node.fills?.[0]
    if (fill?.type !== "SOLID" || !fill.color) continue

    const hex = hexFromRgba(fill.color.r, fill.color.g, fill.color.b)
    const tokenPath = figmaNameToTokenPath(name)

    setNestedValue(currentTokens, tokenPath, hex)
    console.log(`  ✓  ${name} → ${hex}`)
    updateCount++
  }

  fs.writeFileSync(TOKENS_PATH, JSON.stringify(currentTokens, null, 2) + "\n")
  console.log(`\n✓  ${updateCount} tokens updated in ${TOKENS_PATH}`)
  console.log(`▶  Run "npm run tokens:build" to regenerate CSS variables\n`)
}

run().catch((err) => {
  console.error("❌ ", err.message)
  process.exit(1)
})
