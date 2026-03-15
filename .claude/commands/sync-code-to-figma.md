---
description: Push current design tokens from code to Figma (via plugin rebuild)
---

You are performing a **Code → Figma** sync for the two-way-design-starter design system.

## Goal

Reconcile `_theme.css` → `tokens.json` → `figma-plugin/code.js`, then instruct
the user to re-run the Figma plugin to apply the changes in Figma.

---

## Step 1 — Check environment

Confirm `tokens.json` and `_theme.css` are readable.

---

## Step 2 — Extract values from `_theme.css`

Read `src/app/_theme.css`. Parse every CSS variable between
`/* tokens:start */` and `/* tokens:end */`.

Map each variable to a token path:
- `--color-blue-700` → `color.blue.700`
- `--color-white`    → `color.white`

---

## Step 3 — Compare with `tokens.json`

Read `src/tokens/tokens.json` and show any values that differ:

```
_theme.css differs from tokens.json:
  color.blue.700:  #1447e6 → #ff0000
```

If there are differences, ask: **"Update tokens.json to match _theme.css? (yes / cancel)"**

---

## Step 4 — Update `tokens.json`

If approved, update `src/tokens/tokens.json` with the changed values.

---

## Step 5 — Rebuild plugin palette

Run:

```bash
npm run figma:push
```

This runs `plugin:build` to embed the latest token values into
`figma-plugin/code.js` and prints instructions to re-run the plugin.

---

## Step 6 — Summary

Show what changed and remind the user of the final manual step:

```
✓ tokens.json updated — 1 token changed
✓ figma-plugin/code.js rebuilt with latest values

Next: re-run the Figma plugin to apply changes in Figma.
  Plugins → two-way-design-starter → Run
```
