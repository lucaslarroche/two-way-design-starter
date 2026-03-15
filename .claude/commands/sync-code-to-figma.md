---
description: Push current design tokens from code to Figma styles
---

You are performing a **Code → Figma** sync for the two-way-design-starter design system.

## Goal

Read `src/tokens/tokens.json` and update the matching Figma color styles via the Figma REST API.

Never call the Figma API without showing a diff and getting confirmation first.

---

## Step 1 — Load environment

Read `.env.local` and extract:

- `FIGMA_TOKEN`
- `FIGMA_FILE_ID`

If either is missing or empty, stop and tell me exactly what to add to `.env.local`.

---

## Step 2 — Read current tokens

Read `src/tokens/tokens.json` in full.

Token values are hex colors (e.g. `"#1447e6"`), keyed by color family and shade.

---

## Step 3 — Read current Figma styles via MCP

Use the Figma MCP tool to read all styles from the file at `FIGMA_FILE_ID`.

Map Figma style names to token paths:
| Figma style name  | Token path       |
|-------------------|------------------|
| color/blue/700    | color.blue.700   |
| color/green/700   | color.green.700  |
| color/gray/900    | color.gray.900   |

---

## Step 4 — Compute and show the diff

Compare code token values against current Figma style values.

Show the diff:

```
WILL UPDATE IN FIGMA
  color/blue/700:  #1d4ed8 → #1447e6
  color/red/700:   #b91c1c → #c10007

IN CODE BUT NOT IN FIGMA (will be skipped — no Figma style to update)
  color.mauve.900: #1d161e

IN FIGMA BUT NOT IN CODE (will be left untouched)
  color/brand/accent: #ff5733
```

Ask: **"Push these changes to Figma? (yes / skip individual items / cancel)"**

---

## Step 5 — Execute Figma API updates

For each approved change, run the sync script:

```bash
npx tsx scripts/tokens-to-figma.ts
```

The script reads `.env.local` for credentials and `src/tokens/tokens.json` for values.
Confirm success for each updated style.

---

## Step 6 — Handle structural component diffs

If there are new component variants in code that have no match in Figma, do NOT try
to auto-create Figma components. The Figma REST API does not support creating
component variants programmatically.

Instead, generate a manual checklist:

```
⚠️  Manual Figma steps needed:
[ ] Button component: add new variant "ghost"
    - Fill: transparent
    - Border: 1px solid color/gray/300
    - Hover fill: color/gray/100
    - Focus ring: color/gray/100
```

---

## Step 7 — Summary

Print a clean final summary:

- Figma styles updated
- Styles skipped (in code but not in Figma)
- Manual Figma steps needed
- Suggested next step
