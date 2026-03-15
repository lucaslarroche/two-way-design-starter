/**
 * tokens-to-figma.ts
 * Prepare a code→Figma push by regenerating the Figma plugin's RGB palette
 * from the current tokens.json, then printing instructions to re-run the plugin.
 *
 * The Figma Variables REST API requires the file_variables:write scope, which
 * is only available via OAuth 2.0 — not personal access tokens. As a workaround,
 * this script runs `plugin:build` to embed the latest token values into
 * figma-plugin/code.js, so re-running the plugin in Figma applies all changes.
 *
 * Usage: npm run figma:push
 * Requires: tokens.json to be up to date (run tokens:build first if needed)
 */

import { execSync } from "child_process"
import path from "path"
import fs from "fs"

const TOKENS_PATH = path.resolve("src/tokens/tokens.json")

async function run() {
  if (!fs.existsSync(TOKENS_PATH)) {
    console.error("❌  src/tokens/tokens.json not found.")
    process.exit(1)
  }

  console.log("\n🔧  Rebuilding Figma plugin palette from tokens.json...")
  execSync("npm run plugin:build", { stdio: "inherit" })

  console.log(`
✓  figma-plugin/code.js updated with the latest token values.

┌─────────────────────────────────────────────────────────────┐
│  To apply changes in Figma:                                 │
│                                                             │
│  1. Open your Figma file                                    │
│  2. Plugins → two-way-design-starter → Run                  │
│                                                             │
│  The plugin will update all variable values and re-render   │
│  the component sets in one step.                            │
└─────────────────────────────────────────────────────────────┘
`)
}

run().catch((err) => {
  console.error("❌ ", err.message)
  process.exit(1)
})
