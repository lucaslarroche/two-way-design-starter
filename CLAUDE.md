# two-way-design-starter

A minimal starter demonstrating bidirectional sync between Figma and
Storybook/code using Claude Code custom slash commands.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Storybook 10

## Components

| Name     | Variants                                       | States                |
| -------- | ---------------------------------------------- | --------------------- |
| Button   | default, secondary, tertiary, success, danger, | default, hover, focus |
|          | warning, dark, ghost                           |                       |
| Input    | (one size, optional label)                     | default, hover, focus |
| Checkbox | (one size, optional label)                     | default, hover, focus |

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

```
FIGMA_TOKEN=your_figma_personal_access_token
FIGMA_FILE_URL=https://www.figma.com/file/YOUR_FILE_ID/two-way-design-starter
FIGMA_FILE_ID=YOUR_FILE_ID
```

## Sync commands (run inside Claude Code)

- `/sync-figma-to-code` — Pull latest from Figma → update tokens + flag component diffs
- `/sync-code-to-figma` — Push current tokens → update Figma styles

## Design tokens

`src/tokens/tokens.json` is the bridge between Figma and code.
Token values are hex colors (e.g. `"#1447e6"`), keyed by Tailwind color family and shade.
CSS variables are generated from it via `npm run tokens:build`, overriding Tailwind v4's
built-in oklch values with the Figma-sourced hex equivalents.
The markers `/* tokens:start */` and `/* tokens:end */` in `globals.css`
are managed automatically — do not edit between them by hand.

## Scripts

- `npm run dev` — Next.js dev server
- `npm run storybook` — Storybook dev server
- `npm run tokens:build` — Regenerate CSS variables from tokens.json
- `npm run figma:pull` — CLI shortcut: Figma → tokens.json (no AI)
- `npm run figma:push` — CLI shortcut: tokens.json → Figma (no AI)

## Naming convention (critical for sync)

Figma style names must match token paths using `/` as separator:
| Token path       | Figma style name  | CSS variable        |
|------------------|-------------------|---------------------|
| color.blue.700   | color/blue/700    | --color-blue-700    |
| color.green.700  | color/green/700   | --color-green-700   |
| color.gray.900   | color/gray/900    | --color-gray-900    |

## Rules for Claude

- Never hardcode color hex values in components — use Tailwind classes that map to CSS variables
- Never delete a token that exists in code but not in Figma — surface it as a warning
- Never write to Figma without showing a diff and asking for confirmation
- Never auto-merge conflicting token values — ask which source wins
- Keep components thin — logic in props, styles in Tailwind utility classes
- All components must extend their native HTML element type (e.g. ButtonHTMLAttributes)
