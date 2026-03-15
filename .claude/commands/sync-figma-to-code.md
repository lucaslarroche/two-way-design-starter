---
description: Pull design tokens from Figma color styles and update the codebase
---

You are performing a **Figma → Code** sync for the two-way-design-starter design system.

## Goal

Pull the latest color values from Figma into `src/tokens/tokens.json`, rebuild
CSS variables, and show a clear summary of what changed.

Never modify files without showing a diff first and getting approval.

---

## Step 1 — Check environment

Read `.env.local` and confirm `FIGMA_TOKEN` and `FIGMA_FILE_ID` are present.
If either is missing, stop and tell the user exactly what to add.

---

## Step 2 — Snapshot current tokens

Read `src/tokens/tokens.json` and keep it in memory as the "before" state.

---

## Step 3 — Run the pull script

```bash
npm run figma:pull
```

This fetches all color styles from the Figma file and writes updated values
directly into `src/tokens/tokens.json`.

---

## Step 4 — Compute and show the diff

Read `src/tokens/tokens.json` again and compare it to the "before" snapshot.

Show a human-readable diff:

```
CHANGED
  color.blue.700: #1d4ed8 → #1447e6
  color.red.700:  #b91c1c → #c10007

NO CHANGES
  ✓ tokens already match Figma
```

Ask: **"Apply these changes and rebuild CSS? (yes / cancel)"**

If the user cancels, restore the original `src/tokens/tokens.json` from the
"before" snapshot.

---

## Step 5 — Rebuild CSS variables

If approved, run:

```bash
npm run tokens:build
```

Confirm it ran without errors.

---

## Step 6 — Summary

Print a clean final summary:

- How many tokens changed
- Which files were updated
- Suggested next step (`npm run dev` or `npm run storybook` to review visually)
