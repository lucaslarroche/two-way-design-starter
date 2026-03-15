/**
 * tokens-to-figma.ts
 * Read src/tokens/tokens.json and push color values to Figma styles.
 *
 * Token values are hex colors (e.g. "#1447e6"). These are sent directly to
 * Figma as SOLID fill colors — no intermediate name lookup required.
 *
 * Only updates existing Figma styles — structural changes (new color families,
 * new shades) must be added manually in Figma first.
 *
 * Usage: npm run figma:push
 * Requires: FIGMA_TOKEN and FIGMA_FILE_ID in .env.local
 */

import fs from "fs"
import path from "path"

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : null
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
  if (!res.ok) throw new Error(`Figma GET ${res.status}: ${await res.text()}`)
  return res.json()
}

async function figmaPut(endpoint: string, body: unknown) {
  const res = await fetch(`https://api.figma.com/v1${endpoint}`, {
    method: "PUT",
    headers: { "X-Figma-Token": FIGMA_TOKEN!, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Figma PUT ${res.status}: ${await res.text()}`)
  return res.json()
}

// ---------------------------------------------------------------------------
// Flatten tokens — uses "/" separator to match Figma style names
// e.g. { color: { blue: { "700": "#1447e6" } } } → { "color/blue/700": "#1447e6" }
// ---------------------------------------------------------------------------
type TokenNode = string | { [key: string]: TokenNode }

function flattenTokens(obj: TokenNode, prefix = ""): Record<string, string> {
  if (typeof obj === "string") return { [prefix]: obj }
  return Object.entries(obj).reduce<Record<string, string>>((acc, [key, val]) => {
    const fullKey = prefix ? `${prefix}/${key}` : key
    return { ...acc, ...flattenTokens(val, fullKey) }
  }, {})
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function run() {
  console.log(`\n🔍  Reading tokens from ${TOKENS_PATH}`)
  const tokens = JSON.parse(fs.readFileSync(TOKENS_PATH, "utf-8")) as TokenNode
  const flat = flattenTokens(tokens)

  console.log(`📡  Fetching Figma styles from file: ${FIGMA_FILE_ID}\n`)
  const stylesData = await figmaGet(`/files/${FIGMA_FILE_ID}/styles`)
  const stylesMeta: Record<string, { name: string; style_type: string; key: string }> =
    stylesData.meta?.styles ?? {}

  // Build a lowercase name → style key map
  // Handles both "color/blue/700" and "Colors/Blue/700" naming conventions
  const figmaStyleMap = Object.values(stylesMeta).reduce<Record<string, string>>(
    (acc, s) => ({ ...acc, [s.name.toLowerCase()]: s.key }),
    {}
  )

  let updatedCount = 0
  let skippedCount = 0

  for (const [tokenPath, hex] of Object.entries(flat)) {
    // Match "color/blue/700" in tokens to Figma style named "color/blue/700"
    // Fall back to "colors/blue/700" for files using the plural form
    const figmaStyleKey =
      figmaStyleMap[tokenPath.toLowerCase()] ??
      figmaStyleMap[tokenPath.toLowerCase().replace(/^color\//, "colors/")]

    if (!figmaStyleKey) {
      console.log(`  ⏭  ${tokenPath}: no matching Figma style found`)
      skippedCount++
      continue
    }

    const rgb = hexToRgb(hex)
    if (!rgb) {
      console.log(`  ⏭  ${tokenPath}: "${hex}" is not a valid hex color`)
      skippedCount++
      continue
    }

    try {
      await figmaPut(`/styles/${figmaStyleKey}`, {
        fills: [{ type: "SOLID", color: { r: rgb.r, g: rgb.g, b: rgb.b, a: 1 } }],
      })
      console.log(`  ✓  ${tokenPath} → ${hex}`)
      updatedCount++
    } catch (err) {
      console.error(`  ❌  ${tokenPath}: ${(err as Error).message}`)
    }
  }

  console.log(`\n✓  Done: ${updatedCount} updated, ${skippedCount} skipped\n`)
}

run().catch((err) => {
  console.error("❌ ", err.message)
  process.exit(1)
})
