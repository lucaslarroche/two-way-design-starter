# Figma Component Spec

Generated from the React source. Every value here maps directly to a Tailwind class
and a Figma color style. These components are generated automatically by running
the Figma plugin — this spec is for reference and manual verification.

---

## Global settings

| Property      | Value         | Notes                          |
| ------------- | ------------- | ------------------------------ |
| Font family   | Inter          | or your system default         |
| Font size (sm)| 14px           | `text-sm`                      |
| Line height   | 20px           | Tailwind's default for text-sm |
| Border radius | 8px            | `rounded-lg`                   |

---

## Color styles to use

These styles are created automatically when you run the Figma plugin.
Reference these style names in every component layer.

| Style name         | Hex      | Used for                               |
| ------------------ | -------- | -------------------------------------- |
| color/white        | #ffffff  | Button text (solid variants)           |
| color/blue/50      | #eff6ff  | Tertiary hover background              |
| color/blue/100     | #dbeafe  | Tertiary focus ring                    |
| color/blue/300     | #8ec5ff  | Default button focus ring              |
| color/blue/500     | #2b7fff  | Input/Checkbox focus ring + border     |
| color/blue/600     | #155dfc  | Checkbox checked fill                  |
| color/blue/700     | #1447e6  | Default button bg, Tertiary text       |
| color/blue/800     | #193cb8  | Default button hover bg                |
| color/green/300    | #7bf1a8  | Success button focus ring              |
| color/green/700    | #008236  | Success button bg                      |
| color/green/800    | #016630  | Success button hover bg                |
| color/red/300      | #ffa2a2  | Danger button focus ring               |
| color/red/700      | #c10007  | Danger button bg                       |
| color/red/800      | #9f0712  | Danger button hover bg                 |
| color/yellow/300   | #ffdf20  | Warning button focus ring              |
| color/yellow/400   | #fdc700  | Warning button bg                      |
| color/yellow/500   | #f0b100  | Warning button hover bg                |
| color/gray/50      | #f9fafb  | Input background                       |
| color/gray/100     | #f3f4f6  | Secondary/Ghost focus ring             |
| color/gray/200     | #e5e7eb  | Secondary button border                |
| color/gray/300     | #d1d5dc  | Input/Ghost border, Dark focus ring    |
| color/gray/400     | #99a1af  | Input/Checkbox hover border, placeholder |
| color/gray/800     | #1e2939  | Dark button bg                         |
| color/gray/900     | #101828  | Dark button hover bg, Secondary/Ghost/Input/Checkbox text |

---

## Button

### Structure

```
Button (component)
└── Label (text layer)
```

### Auto-layout

| Property         | Value              |
| ---------------- | ------------------ |
| Direction        | Horizontal         |
| Alignment        | Center / Center    |
| Padding          | 10px top/bottom, 20px left/right (`py-2.5 px-5`) |
| Corner radius    | 8px                |
| Width            | Hug contents       |

### Component properties

| Property | Type    | Values                                                              |
| -------- | ------- | ------------------------------------------------------------------- |
| Variant  | Variant | default, secondary, tertiary, success, danger, warning, dark, ghost |
| State    | Variant | default, hover, focus                                               |
| Label    | Text    | "Button"                                                            |
| Disabled | Boolean | false                                                               |

### Variant specs

#### default
| State   | Fill              | Text   | Border | Ring (outside, 4px) |
| ------- | ----------------- | ------ | ------ | ------------------- |
| default | color/blue/700    | white  | –      | –                   |
| hover   | color/blue/800    | white  | –      | –                   |
| focus   | color/blue/700    | white  | –      | color/blue/300      |

#### secondary
| State   | Fill              | Text            | Border (1px)      | Ring (outside, 4px) |
| ------- | ----------------- | --------------- | ----------------- | ------------------- |
| default | color/white       | color/gray/900  | color/gray/200    | –                   |
| hover   | color/gray/100    | color/blue/700  | color/gray/200    | –                   |
| focus   | color/white       | color/gray/900  | color/gray/200    | color/gray/100      |

#### tertiary
| State   | Fill              | Text           | Border | Ring (outside, 4px) |
| ------- | ----------------- | -------------- | ------ | ------------------- |
| default | transparent       | color/blue/700 | –      | –                   |
| hover   | color/blue/50     | color/blue/700 | –      | –                   |
| focus   | transparent       | color/blue/700 | –      | color/blue/100      |

#### success
| State   | Fill              | Text  | Border | Ring (outside, 4px) |
| ------- | ----------------- | ----- | ------ | ------------------- |
| default | color/green/700   | white | –      | –                   |
| hover   | color/green/800   | white | –      | –                   |
| focus   | color/green/700   | white | –      | color/green/300     |

#### danger
| State   | Fill             | Text  | Border | Ring (outside, 4px) |
| ------- | ---------------- | ----- | ------ | ------------------- |
| default | color/red/700    | white | –      | –                   |
| hover   | color/red/800    | white | –      | –                   |
| focus   | color/red/700    | white | –      | color/red/300       |

#### warning
| State   | Fill              | Text  | Border | Ring (outside, 4px) |
| ------- | ----------------- | ----- | ------ | ------------------- |
| default | color/yellow/400  | white | –      | –                   |
| hover   | color/yellow/500  | white | –      | –                   |
| focus   | color/yellow/400  | white | –      | color/yellow/300    |

#### dark
| State   | Fill             | Text  | Border | Ring (outside, 4px) |
| ------- | ---------------- | ----- | ------ | ------------------- |
| default | color/gray/800   | white | –      | –                   |
| hover   | color/gray/900   | white | –      | –                   |
| focus   | color/gray/800   | white | –      | color/gray/300      |

#### ghost
| State   | Fill        | Text           | Border (1px)    | Ring (outside, 4px) |
| ------- | ----------- | -------------- | --------------- | ------------------- |
| default | transparent | color/gray/900 | color/gray/300  | –                   |
| hover   | color/gray/100 | color/gray/900 | color/gray/300 | –                   |
| focus   | transparent | color/gray/900 | color/gray/300  | color/gray/100      |

### Disabled state (all variants)
Opacity: 50%. Add as a boolean property that reduces the layer opacity to 50%.

---

## Input

### Structure

```
Input (component)
├── Label (text layer, optional)
└── Field (frame)
    └── Value / Placeholder (text layer)
```

### Auto-layout — wrapper

| Property      | Value              |
| ------------- | ------------------ |
| Direction     | Vertical           |
| Gap           | 8px (`gap-2`)      |
| Width         | Fill container     |

### Auto-layout — field

| Property      | Value              |
| ------------- | ------------------ |
| Direction     | Horizontal         |
| Padding       | 10px all sides (`p-2.5`) |
| Corner radius | 8px                |
| Width         | Fill container     |

### Component properties

| Property    | Type    | Values                  |
| ----------- | ------- | ----------------------- |
| State       | Variant | default, hover, focus   |
| Show label  | Boolean | true                    |
| Label text  | Text    | "Label"                 |
| Value text  | Text    | "" (or placeholder)     |

### Label layer
| Property  | Value           |
| --------- | --------------- |
| Font size | 14px            |
| Weight    | 500 (medium)    |
| Color     | color/gray/900  |

### Field layer specs

| State   | Fill           | Border (1px)    | Ring                        |
| ------- | -------------- | --------------- | --------------------------- |
| default | color/gray/50  | color/gray/300  | –                           |
| hover   | color/gray/50  | color/gray/400  | –                           |
| focus   | color/gray/50  | color/blue/500  | color/blue/500 (1px inside) |

### Value text
| Property    | Value           |
| ----------- | --------------- |
| Font size   | 14px            |
| Color       | color/gray/900  |

### Placeholder text
| Property    | Value           |
| ----------- | --------------- |
| Font size   | 14px            |
| Color       | color/gray/400  |

---

## Checkbox

### Structure

```
Checkbox (component)
├── Box (frame, 16×16)
│   └── Checkmark (vector, visible when checked)
└── Label (text layer, optional)
```

### Auto-layout — wrapper

| Property   | Value              |
| ---------- | ------------------ |
| Direction  | Horizontal         |
| Alignment  | Center             |
| Gap        | 8px (`gap-2`)      |

### Component properties

| Property   | Type    | Values                |
| ---------- | ------- | --------------------- |
| State      | Variant | default, hover, focus |
| Checked    | Boolean | false                 |
| Show label | Boolean | true                  |
| Label text | Text    | "Label"               |

### Box layer (16×16)

| State          | Fill            | Border (1px)    | Ring                       |
| -------------- | --------------- | --------------- | -------------------------- |
| default        | color/white     | color/gray/300  | –                          |
| hover          | color/white     | color/gray/400  | –                          |
| focus          | color/white     | color/blue/500  | color/blue/500 (2px)       |
| checked        | color/blue/600  | color/blue/600  | –                          |
| checked+hover  | color/blue/600  | color/blue/600  | –                          |
| checked+focus  | color/blue/600  | color/blue/600  | color/blue/500 (2px)       |

Corner radius: 4px (`rounded` in the browser default checkbox)

### Checkmark
White SVG checkmark, centered, visible only when Checked = true.

### Label layer
| Property  | Value          |
| --------- | -------------- |
| Font size | 14px           |
| Weight    | 500 (medium)   |
| Color     | color/gray/900 |

---

## Figma file organisation

Suggested page/layer structure:

```
🎨 Design System
├── 🖼 Components
│   ├── Button       ← all 8 variants × 3 states
│   ├── Input        ← 3 states × label/no-label
│   └── Checkbox     ← 3 states × checked/unchecked × label/no-label
├── 🎨 Styles        ← auto-populated by plugin
└── 📋 Playground    ← login form or free canvas for testing
```

---

## After building

Once components are in Figma, test the sync round-trip:

**Figma → code:**
1. Change a color style in Figma (e.g. edit `color/blue/700`), then publish
2. Run `npm run figma:pull` — verify `tokens.json` updates
3. Run `npm run tokens:build` — verify `_theme.css` updates

**Code → Figma:**
1. Edit a color in `src/app/_theme.css`
2. Run `npm run figma:push` — rebuilds `figma-plugin/code.js`
3. Re-run the Figma plugin — verify styles and components update
