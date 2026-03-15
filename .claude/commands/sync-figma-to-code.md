---
description: Pull design tokens and component styles from Figma and update the codebase
---

You are performing a **Figma → Code** sync for the two-way-design-starter design system.

## Goal

Read the current state of the Figma file and:

1. Update `src/tokens/tokens.json` with any changed values
2. Regenerate CSS variables (`npm run tokens:build`)
3. Flag any component-level diffs that need manual review
4. Never write to any file without showing a diff first and getting my approval

---

## Step 1 — Load environment

Read `.env.local` and extract:

- `FIGMA_TOKEN`
- `FIGMA_FILE_ID`

If either is missing or empty, stop and tell me exactly what to add to `.env.local`.

---

## Step 2 — Read the Figma file via MCP

Use the Figma MCP tool to fetch the file at `FIGMA_FILE_ID`.

Extract from Figma:

- **Color styles** → hex fill values mapped to token paths in `src/tokens/tokens.json`

Use the naming convention:

- Figma style `color/blue/700` → token path `color.blue.700` → value is the hex fill color
- Figma style `color/gray/900` → token path `color.gray.900`

---

## Step 3 — Read current tokens

Read `src/tokens/tokens.json` in full.

---

## Step 4 — Compute and show the diff

Compare extracted Figma hex values against current token values.

Show a human-readable diff in this format:

```
CHANGED
  color.blue.700: #1d4ed8 → #1447e6
  color.red.700:  #b91c1c → #c10007

ADDED (in Figma, not in tokens.json)
  color.teal.500: #00bba7

MISSING (in tokens.json, not in Figma — will NOT be deleted)
  color.mauve.900: #1d161e
```

Then ask: **"Apply these changes? (yes / skip individual items / cancel)"**

Do not touch any file until I confirm.

---

## Step 5 — Apply approved changes

For each approved change, update `src/tokens/tokens.json`.

Then run:

```bash
npm run tokens:build
```

Confirm that it ran without errors.

---

## Step 6 — Check for component-level issues

For each changed token, search `src/components/**/*.tsx` for hardcoded hex values that
should now reference a CSS variable instead.

Report them as warnings — do not auto-fix component code.

---

## Step 7 — Summary

Print a clean final summary:

- How many tokens changed
- Which files were updated
- Warnings requiring manual attention
- Suggested next step (e.g. "run `npm run storybook` to review visually")
