/**
 * build-plugin.ts
 * Reads src/tokens/tokens.json and regenerates the RGB palette constant
 * in figma-plugin/code.js between the markers:
 *   // rgb:start
 *   // rgb:end
 *
 * This keeps the plugin in sync with tokens.json so that re-running the
 * plugin in Figma acts as a "push" — styles are updated to match code tokens.
 *
 * Only the colors actually used by components are included (not the full
 * 288-token palette) to keep the plugin focused.
 *
 * Usage: npm run plugin:build
 */

import fs from "fs"
import path from "path"

const TOKENS_PATH  = path.resolve("src/tokens/tokens.json")
const PLUGIN_PATH  = path.resolve("figma-plugin/code.js")
const START_MARKER = "// rgb:start"
const END_MARKER   = "// rgb:end"

// The subset of tokens used by Figma components.
// Keys match the RGB object in code.js (e.g. "blue/700").
const USED_TOKENS: Record<string, string[]> = {
  white:    ["white"],
  blue:     ["50", "100", "300", "500", "600", "700", "800"],
  green:    ["300", "700", "800"],
  red:      ["300", "700", "800"],
  yellow:   ["300", "400", "500"],
  gray:     ["50", "100", "200", "300", "400", "800", "900"],
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Math.round((parseInt(result[1], 16) / 255) * 1000) / 1000,
        g: Math.round((parseInt(result[2], 16) / 255) * 1000) / 1000,
        b: Math.round((parseInt(result[3], 16) / 255) * 1000) / 1000,
      }
    : null
}

function run() {
  const tokens = JSON.parse(fs.readFileSync(TOKENS_PATH, "utf-8"))

  const entries: string[] = []

  // white is a special case — stored as color.white, not color.white.xxx
  const whiteHex = tokens?.color?.white ?? "#ffffff"
  const whiteRgb = hexToRgb(whiteHex)!
  entries.push(`  white:         { r: ${whiteRgb.r}, g: ${whiteRgb.g}, b: ${whiteRgb.b} },`)

  for (const [family, shades] of Object.entries(USED_TOKENS)) {
    if (family === "white") continue
    for (const shade of shades as string[]) {
      const hex = tokens?.color?.[family]?.[shade]
      if (!hex) { console.warn(`  ⚠️  token color.${family}.${shade} not found`); continue }
      const rgb = hexToRgb(hex)
      if (!rgb) { console.warn(`  ⚠️  invalid hex for color.${family}.${shade}: ${hex}`); continue }
      const key = `"${family}/${shade}"`
      const pad = " ".repeat(Math.max(0, 12 - key.length))
      entries.push(`  ${key}:${pad}{ r: ${rgb.r}, g: ${rgb.g}, b: ${rgb.b} },`)
    }
  }

  const block = `${START_MARKER}\nconst RGB = {\n${entries.join("\n")}\n}\n${END_MARKER}`

  let js = fs.readFileSync(PLUGIN_PATH, "utf-8")

  if (js.includes(START_MARKER) && js.includes(END_MARKER)) {
    const startIdx = js.indexOf(START_MARKER)
    const endIdx   = js.indexOf(END_MARKER) + END_MARKER.length
    js = js.slice(0, startIdx) + block + js.slice(endIdx)
  } else {
    console.error("❌  Markers // rgb:start and // rgb:end not found in figma-plugin/code.js")
    process.exit(1)
  }

  fs.writeFileSync(PLUGIN_PATH, js)
  console.log(`✓ RGB palette in figma-plugin/code.js updated from tokens.json`)
  console.log(`  ${entries.length} color entries written`)
}

run()
