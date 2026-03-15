# two-way-design-starter

A minimal open-source starter demonstrating **bidirectional design system sync** between Figma and Storybook/code using Claude Code.

→ [View on GitHub](https://github.com/lucaslarroche/two-way-design-starter)

---

## What this is

A practical starting point that shows how a small design system can stay in sync between Figma and your codebase — in both directions — using Claude Code slash commands.

**Sync directions:**

- `Figma → code` — Pull latest styles from Figma, update design tokens and CSS variables
- `code → Figma` — Push current token values to Figma styles

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
| Figma MCP  | figma-developer-mcp     |

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

1. Go to [figma.com/settings](https://www.figma.com/settings) → **Personal access tokens** → **Generate new token**
2. Copy your token into `.env.local` as `FIGMA_TOKEN`
3. Create a new Figma file. Use the [Tailwind CSS v4 Variables to Figma](https://www.figma.com/community/plugin/1463378448591477945) plugin to import the full Tailwind v4 palette as local color styles
4. Name your color styles using this convention: `color/blue/700`, `color/gray/900`, etc.
5. Copy the file ID from the URL: `figma.com/design/**FILE_ID**/your-file-name`
6. Add it to `.env.local` as `FIGMA_FILE_ID`

---

## Two-way sync with Claude Code

```bash
cd two-way-design-starter
claude   # open Claude Code in the repo
```

Then use the slash commands:

| Command               | Direction    | What it does                                                         |
| --------------------- | ------------ | -------------------------------------------------------------------- |
| `/sync-figma-to-code` | Figma → code | Reads Figma styles, diffs against tokens.json, updates with approval |
| `/sync-code-to-figma` | code → Figma | Reads tokens.json, diffs against Figma, updates styles with approval |

Both commands always **show a diff and ask for confirmation** before writing anything.

---

## Design tokens

`src/tokens/tokens.json` is the single source of truth.

CSS variables are generated from it:

```bash
npm run tokens:build   # updates the /* tokens:start */ … /* tokens:end */ block in globals.css
```

Tailwind CSS v4 reads CSS variables natively — no `tailwind.config.ts` needed.

**Naming convention (required for sync to work):**

| Token path        | Figma style name  | CSS variable        |
| ----------------- | ----------------- | ------------------- |
| `color.blue.700`  | `color/blue/700`  | `--color-blue-700`  |
| `color.green.700` | `color/green/700` | `--color-green-700` |
| `color.gray.900`  | `color/gray/900`  | `--color-gray-900`  |

Token values are hex colors sourced from Figma. `tokens:build` writes them into a `@theme` block in `globals.css`, overriding Tailwind v4's built-in oklch values so the entire codebase uses your Figma colors.

---

## Scripts

| Script                 | What it does                              |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | Start Next.js dev server                  |
| `npm run storybook`    | Start Storybook                           |
| `npm run tokens:build` | Regenerate CSS variables from tokens.json |
| `npm run figma:pull`   | CLI: Figma API → tokens.json (no AI)      |
| `npm run figma:push`   | CLI: tokens.json → Figma API (no AI)      |

---

## Project structure

```
two-way-design-starter/
├── .claude/commands/
│   ├── sync-figma-to-code.md    ← Claude slash command
│   └── sync-code-to-figma.md   ← Claude slash command
├── .storybook/
├── scripts/
│   ├── build-tokens.ts          ← tokens.json → CSS variables
│   ├── figma-to-tokens.ts       ← Figma API → tokens.json
│   └── tokens-to-figma.ts       ← tokens.json → Figma API
├── src/
│   ├── app/
│   │   ├── page.tsx             ← login form demo
│   │   └── globals.css          ← CSS vars generated from tokens
│   ├── components/
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Checkbox/
│   └── tokens/tokens.json       ← single source of truth
├── .env.example
├── .mcp.json                    ← MCP server config for Claude Code
└── CLAUDE.md                    ← project brief for Claude
```

---

## License

MIT — fork it, break it, make it yours.
