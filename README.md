# two-way-design-starter

A minimal open-source starter demonstrating **bidirectional design system sync** between Figma and Storybook/code using Claude Code.

→ [View on GitHub](https://github.com/lucaslarroche/two-way-design-starter)

---

## What this is

A practical starting point that shows how a small design system can stay in sync between Figma and your codebase — in both directions — using Claude Code slash commands.

**Sync directions:**

- `Figma → code` — Change a color style in Figma, pull it into tokens and CSS with one command
- `code → Figma` — Edit `_theme.css`, push the change to Figma by re-running the plugin

---

## Stack

| Layer      | Tool                    |
| ---------- | ----------------------- |
| Framework  | Next.js 16 (App Router) |
| Language   | TypeScript              |
| Styling    | Tailwind CSS v4         |
| Components | Custom (no UI library)  |
| Storybook  | v10                     |
| Sync agent | Claude Code             |

---

## Components

| Component  | Variants                                                            |
| ---------- | ------------------------------------------------------------------- |
| `Button`   | default, secondary, tertiary, success, danger, warning, dark, ghost |
| `Input`    | one size, optional label                                            |
| `Checkbox` | one size, optional label                                            |

---

## Prerequisites

- Node.js 20+
- A Figma account (free tier works)
- Claude Code: `npm install -g @anthropic-ai/claude-code`
- An Anthropic API key or Claude Pro/Team account

---

## Getting started

```bash
git clone https://github.com/lucaslarroche/two-way-design-starter.git
cd two-way-design-starter
npm install
cp .env.example .env.local   # fill in FIGMA_TOKEN and FIGMA_FILE_ID
npm run tokens:build          # generate CSS variables from tokens.json
npm run dev                   # http://localhost:3000
npm run storybook             # http://localhost:6006
```

---

## Figma setup

1. Go to [figma.com/settings](https://www.figma.com/settings) → **Personal access tokens** → **Generate new token**. Enable at minimum: `file_content:read`, `file_metadata:read`, `library_assets:read`.
2. Copy your token into `.env.local` as `FIGMA_TOKEN`
3. Create a new Figma file and copy the file ID from the URL: `figma.com/design/**FILE_ID**/your-file-name`
4. Add it to `.env.local` as `FIGMA_FILE_ID`
5. In Figma, go to **Plugins → Development → Import plugin from manifest** and point it at `figma-plugin/manifest.json`
6. Run the plugin once — it creates all color styles and component sets automatically
7. **Publish** the styles in Figma (Main menu → Libraries → Publish) so the REST API can read them

---

## Two-way sync with Claude Code

```bash
cd two-way-design-starter
claude   # open Claude Code in the repo
```

Then use the slash commands:

| Command               | Direction    | What it does                                                              |
| --------------------- | ------------ | ------------------------------------------------------------------------- |
| `/sync-figma-to-code` | Figma → code | Reads Figma color styles, diffs against tokens.json, updates with approval |
| `/sync-code-to-figma` | code → Figma | Reads `_theme.css`, diffs against tokens.json, rebuilds plugin palette, prompts you to re-run the plugin in Figma |

Both commands always **show a diff and ask for confirmation** before writing anything.

---

## Design tokens

`src/tokens/tokens.json` is the single source of truth.

CSS variables are generated from it:

```bash
npm run tokens:build   # updates the /* tokens:start */ … /* tokens:end */ block in _theme.css
```

Tailwind CSS v4 reads CSS variables natively — no `tailwind.config.ts` needed.

**Naming convention (required for sync to work):**

| Token path        | Figma style name  | CSS variable        |
| ----------------- | ----------------- | ------------------- |
| `color.blue.700`  | `color/blue/700`  | `--color-blue-700`  |
| `color.green.700` | `color/green/700` | `--color-green-700` |
| `color.gray.900`  | `color/gray/900`  | `--color-gray-900`  |

Token values are hex colors sourced from Figma. `tokens:build` writes them into a `@theme` block in `_theme.css`, overriding Tailwind v4's built-in oklch values so the entire codebase uses your Figma colors.

---

## Scripts

| Script                  | What it does                                              |
| ----------------------- | --------------------------------------------------------- |
| `npm run dev`           | Start Next.js dev server                                  |
| `npm run storybook`     | Start Storybook                                           |
| `npm run tokens:build`  | Regenerate CSS variables from tokens.json                 |
| `npm run plugin:build`  | Regenerate RGB palette in figma-plugin/code.js            |
| `npm run figma:pull`    | CLI: Figma color styles → tokens.json (no AI)             |
| `npm run figma:push`    | CLI: rebuild plugin palette, then re-run plugin in Figma  |

---

## Project structure

```
two-way-design-starter/
├── .claude/commands/
│   ├── sync-figma-to-code.md    ← Claude slash command
│   └── sync-code-to-figma.md   ← Claude slash command
├── .storybook/
├── figma-plugin/
│   ├── manifest.json            ← plugin entry point
│   └── code.js                  ← generates styles + components in Figma
├── scripts/
│   ├── build-tokens.ts          ← tokens.json → CSS variables
│   ├── build-plugin.ts          ← tokens.json → RGB palette in code.js
│   ├── figma-to-tokens.ts       ← Figma color styles → tokens.json
│   └── tokens-to-figma.ts       ← rebuilds plugin palette for re-run
├── src/
│   ├── app/
│   │   ├── page.tsx             ← login form demo
│   │   └── _theme.css           ← CSS vars generated from tokens
│   ├── components/
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Checkbox/
│   └── tokens/tokens.json       ← single source of truth
├── .env.example
└── CLAUDE.md                    ← project brief for Claude
```

---

## License

MIT — fork it, break it, make it yours.
