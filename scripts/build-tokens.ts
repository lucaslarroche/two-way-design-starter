/**
 * build-tokens.ts
 * Reads src/tokens/tokens.json and writes a @theme block into
 * src/app/globals.css between the /* tokens:start * / and /* tokens:end * / markers.
 *
 * Token values are hex colors (e.g. "#1447e6").
 * Each becomes a CSS variable override in @theme:
 *   color.blue.700 = "#1447e6"  →  --color-blue-700: #1447e6;
 *
 * This overrides Tailwind v4's built-in oklch values with the hex values
 * sourced from Figma, keeping code and design in sync.
 *
 * Usage: npm run tokens:build
 */

import fs from "fs"
import path from "path"

const TOKENS_PATH = path.resolve("src/tokens/tokens.json")
const CSS_PATH = path.resolve("src/app/_theme.css")
const START_MARKER = "/* tokens:start */"
const END_MARKER = "/* tokens:end */"

type TokenNode = string | { [key: string]: TokenNode }

function flattenTokens(obj: TokenNode, prefix = ""): Record<string, string> {
  if (typeof obj === "string") return { [prefix]: obj }
  return Object.entries(obj).reduce<Record<string, string>>((acc, [key, val]) => {
    const fullKey = prefix ? `${prefix}-${key}` : key
    return { ...acc, ...flattenTokens(val, fullKey) }
  }, {})
}

function run() {
  const tokens = JSON.parse(fs.readFileSync(TOKENS_PATH, "utf-8")) as TokenNode
  const flat = flattenTokens(tokens)

  const lines = Object.entries(flat).map(([key, val]) => `  --${key}: ${val};`)

  const block = `${START_MARKER}\n@theme {\n${lines.join("\n")}\n}\n${END_MARKER}`

  let css = fs.readFileSync(CSS_PATH, "utf-8")

  if (css.includes(START_MARKER) && css.includes(END_MARKER)) {
    const startIdx = css.indexOf(START_MARKER)
    const endIdx = css.indexOf(END_MARKER) + END_MARKER.length
    css = css.slice(0, startIdx) + block + css.slice(endIdx)
  } else {
    css = block + "\n\n" + css
  }

  fs.writeFileSync(CSS_PATH, css)
  console.log(`✓ @theme block written to src/app/_theme.css`)
  console.log(`  ${Object.keys(flat).length} tokens exported`)
}

run()
