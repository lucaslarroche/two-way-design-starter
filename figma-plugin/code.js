/**
 * two-way-design-starter — Create Components
 *
 * Generates Button, Input, and Checkbox component sets in a "🧩 Components"
 * page, using the exact specs from the React source:
 *   - Button: 8 variants × 3 states (Default / Hover / Focus)
 *   - Input:  3 states × 2 label variants
 *   - Checkbox: 6 states (3 × checked/unchecked) × 2 label variants
 *
 * All fills reference local color styles (color/blue/700, etc.).
 * If a style isn't found, falls back to the hardcoded hex from tokens.json.
 */

// ---------------------------------------------------------------------------
// Palette fallback (hex → RGB, matches src/tokens/tokens.json)
// ---------------------------------------------------------------------------
const RGB = {
  white:         { r: 1,     g: 1,     b: 1     },
  "blue/50":     { r: 0.937, g: 0.965, b: 1     },
  "blue/100":    { r: 0.859, g: 0.918, b: 0.996 },
  "blue/300":    { r: 0.557, g: 0.773, b: 1     },
  "blue/500":    { r: 0.169, g: 0.498, b: 1     },
  "blue/600":    { r: 0.082, g: 0.365, b: 0.988 },
  "blue/700":    { r: 0.078, g: 0.278, b: 0.902 },
  "blue/800":    { r: 0.098, g: 0.235, b: 0.722 },
  "green/300":   { r: 0.482, g: 0.945, b: 0.659 },
  "green/700":   { r: 0,     g: 0.510, b: 0.212 },
  "green/800":   { r: 0.004, g: 0.400, b: 0.188 },
  "red/300":     { r: 1,     g: 0.635, b: 0.635 },
  "red/700":     { r: 0.757, g: 0,     b: 0.027 },
  "red/800":     { r: 0.624, g: 0.027, b: 0.071 },
  "yellow/300":  { r: 1,     g: 0.875, b: 0.125 },
  "yellow/400":  { r: 0.992, g: 0.780, b: 0     },
  "yellow/500":  { r: 0.941, g: 0.694, b: 0     },
  "gray/50":     { r: 0.976, g: 0.980, b: 0.984 },
  "gray/100":    { r: 0.953, g: 0.957, b: 0.965 },
  "gray/200":    { r: 0.898, g: 0.906, b: 0.922 },
  "gray/300":    { r: 0.820, g: 0.835, b: 0.863 },
  "gray/400":    { r: 0.600, g: 0.631, b: 0.686 },
  "gray/800":    { r: 0.118, g: 0.161, b: 0.224 },
  "gray/900":    { r: 0.063, g: 0.094, b: 0.157 },
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function findStyle(key) {
  const name = key === "white" ? "color/white" : "color/" + key
  const match = figma.getLocalPaintStyles().find(function(s) { return s.name === name })
  return match || null
}

function applyFill(node, key) {
  if (!key || key === "transparent") {
    node.fills = []
    return
  }
  const style = findStyle(key)
  if (style) {
    node.fillStyleId = style.id
    return
  }
  const rgb = RGB[key]
  if (rgb) node.fills = [{ type: "SOLID", color: rgb }]
}

function applyStroke(node, key, weight = 1) {
  if (!key) {
    node.strokes = []
    return
  }
  const style = findStyle(key)
  if (style) {
    node.strokeStyleId = style.id
  } else {
    const rgb = RGB[key]
    if (rgb) node.strokes = [{ type: "SOLID", color: rgb }]
  }
  node.strokeWeight = weight
  node.strokeAlign = "INSIDE"
}

// Mimics CSS `ring` using a zero-blur drop shadow with spread
function applyRing(node, key, spread) {
  if (!key) {
    node.effects = []
    return
  }
  const style = findStyle(key)
  var fallbackRgb = RGB[key] || { r: 0, g: 0, b: 0 }
  var color
  if (style) {
    var paint = style.paints[0]
    color = (paint && paint.type === "SOLID")
      ? { r: paint.color.r, g: paint.color.g, b: paint.color.b, a: 1 }
      : { r: 0, g: 0, b: 0, a: 1 }
  } else {
    color = { r: fallbackRgb.r, g: fallbackRgb.g, b: fallbackRgb.b, a: 1 }
  }

  node.effects = [
    {
      type: "DROP_SHADOW",
      color,
      offset: { x: 0, y: 0 },
      radius: 0,
      spread,
      visible: true,
      blendMode: "NORMAL",
    },
  ]
}

async function txt(content, colorKey, size = 14, weight = "Medium") {
  const t = figma.createText()
  t.characters = content
  t.fontSize = size
  t.fontName = { family: "Inter", style: weight }
  applyFill(t, colorKey)
  return t
}

// ---------------------------------------------------------------------------
// Grid layout helper — applied to every component set after combineAsVariants.
// Uses WRAP auto-layout so variants flow into rows of `numCols` columns,
// which matches how Figma UI shows component sets (grouped by first property).
// ---------------------------------------------------------------------------
function applyGrid(set, comps, numCols) {
  var GAP = 16
  var PAD = 16
  var itemW = (comps.length > 0) ? comps[0].width : 100
  set.layoutMode = "HORIZONTAL"
  set.layoutWrap = "WRAP"
  set.itemSpacing = GAP
  set.counterAxisSpacing = GAP
  set.paddingTop = PAD
  set.paddingLeft = PAD
  set.paddingRight = PAD
  set.paddingBottom = PAD
  // Fix width first (primaryAxisSizingMode = FIXED), then set counterAxis to
  // AUTO *after* resize so Figma recalculates height to hug all content rows.
  set.primaryAxisSizingMode = "FIXED"
  set.resize(numCols * itemW + (numCols - 1) * GAP + PAD * 2, set.height)
  set.counterAxisSizingMode = "AUTO"
}

// ---------------------------------------------------------------------------
// BUTTON  (8 variants × 3 states = 24 components)
// ---------------------------------------------------------------------------
const BUTTON_SPECS = [
  {
    variant: "default",
    states: [
      { state: "Default", fill: "blue/700",    text: "white",    border: null,       ring: null,        ringSpread: 0 },
      { state: "Hover",   fill: "blue/800",    text: "white",    border: null,       ring: null,        ringSpread: 0 },
      { state: "Focus",   fill: "blue/700",    text: "white",    border: null,       ring: "blue/300",  ringSpread: 4 },
    ],
  },
  {
    variant: "secondary",
    states: [
      { state: "Default", fill: "white",       text: "gray/900", border: "gray/200", ring: null,        ringSpread: 0 },
      { state: "Hover",   fill: "gray/100",    text: "blue/700", border: "gray/200", ring: null,        ringSpread: 0 },
      { state: "Focus",   fill: "white",       text: "gray/900", border: "gray/200", ring: "gray/100",  ringSpread: 4 },
    ],
  },
  {
    variant: "tertiary",
    states: [
      { state: "Default", fill: "transparent", text: "blue/700", border: null,       ring: null,        ringSpread: 0 },
      { state: "Hover",   fill: "blue/50",     text: "blue/700", border: null,       ring: null,        ringSpread: 0 },
      { state: "Focus",   fill: "transparent", text: "blue/700", border: null,       ring: "blue/100",  ringSpread: 4 },
    ],
  },
  {
    variant: "success",
    states: [
      { state: "Default", fill: "green/700",   text: "white",    border: null,       ring: null,        ringSpread: 0 },
      { state: "Hover",   fill: "green/800",   text: "white",    border: null,       ring: null,        ringSpread: 0 },
      { state: "Focus",   fill: "green/700",   text: "white",    border: null,       ring: "green/300", ringSpread: 4 },
    ],
  },
  {
    variant: "danger",
    states: [
      { state: "Default", fill: "red/700",     text: "white",    border: null,       ring: null,        ringSpread: 0 },
      { state: "Hover",   fill: "red/800",     text: "white",    border: null,       ring: null,        ringSpread: 0 },
      { state: "Focus",   fill: "red/700",     text: "white",    border: null,       ring: "red/300",   ringSpread: 4 },
    ],
  },
  {
    variant: "warning",
    states: [
      { state: "Default", fill: "yellow/400",  text: "white",    border: null,       ring: null,         ringSpread: 0 },
      { state: "Hover",   fill: "yellow/500",  text: "white",    border: null,       ring: null,         ringSpread: 0 },
      { state: "Focus",   fill: "yellow/400",  text: "white",    border: null,       ring: "yellow/300", ringSpread: 4 },
    ],
  },
  {
    variant: "dark",
    states: [
      { state: "Default", fill: "gray/800",    text: "white",    border: null,       ring: null,        ringSpread: 0 },
      { state: "Hover",   fill: "gray/900",    text: "white",    border: null,       ring: null,        ringSpread: 0 },
      { state: "Focus",   fill: "gray/800",    text: "white",    border: null,       ring: "gray/300",  ringSpread: 4 },
    ],
  },
  {
    variant: "ghost",
    states: [
      { state: "Default", fill: "transparent", text: "gray/900", border: "gray/300", ring: null,        ringSpread: 0 },
      { state: "Hover",   fill: "gray/100",    text: "gray/900", border: "gray/300", ring: null,        ringSpread: 0 },
      { state: "Focus",   fill: "transparent", text: "gray/900", border: "gray/300", ring: "gray/100",  ringSpread: 4 },
    ],
  },
]

async function buildButton() {
  const comps = []

  for (const { variant, states } of BUTTON_SPECS) {
    for (const s of states) {
      const c = figma.createComponent()
      c.name = `Variant=${variant}, State=${s.state}`

      c.layoutMode = "HORIZONTAL"
      c.primaryAxisAlignItems = "CENTER"
      c.counterAxisAlignItems = "CENTER"
      c.paddingTop = 10
      c.paddingBottom = 10
      c.paddingLeft = 20
      c.paddingRight = 20
      c.cornerRadius = 8
      c.primaryAxisSizingMode = "AUTO"
      c.counterAxisSizingMode = "AUTO"

      applyFill(c, s.fill)
      applyStroke(c, s.border)
      applyRing(c, s.ring, s.ringSpread)

      c.appendChild(await txt("Button", s.text, 14, "Medium"))

      comps.push(c)
    }
  }

  const set = figma.combineAsVariants(comps, figma.currentPage)
  set.name = "Button"
  applyGrid(set, comps, 3)  // 3 cols = one per State (Default / Hover / Focus)
  return set
}

// ---------------------------------------------------------------------------
// INPUT  (3 states × 2 label variants = 6 components)
// ---------------------------------------------------------------------------
const INPUT_STATES = [
  { state: "Default", fieldFill: "gray/50", border: "gray/300", ring: null,        ringSpread: 0 },
  { state: "Hover",   fieldFill: "gray/50", border: "gray/400", ring: null,        ringSpread: 0 },
  { state: "Focus",   fieldFill: "gray/50", border: "blue/500", ring: "blue/500",  ringSpread: 1 },
]

async function buildInput() {
  const comps = []

  for (const s of INPUT_STATES) {
    for (const showLabel of [true, false]) {
      const c = figma.createComponent()
      c.name = `State=${s.state}, Label=${showLabel ? "True" : "False"}`

      c.layoutMode = "VERTICAL"
      c.primaryAxisAlignItems = "MIN"
      c.counterAxisAlignItems = "MIN"
      c.itemSpacing = 8
      c.paddingTop = 0
      c.paddingBottom = 0
      c.paddingLeft = 0
      c.paddingRight = 0
      c.primaryAxisSizingMode = "AUTO"
      c.counterAxisSizingMode = "AUTO"
      c.fills = []

      // Label — only added when visible so it takes no layout space otherwise
      if (showLabel) {
        c.appendChild(await txt("Label", "gray/900", 14, "Medium"))
      }

      // Field — append placeholder first so Figma calculates AUTO height,
      // then lock only the width to 280 (height stays auto-calculated)
      const field = figma.createFrame()
      field.layoutMode = "HORIZONTAL"
      field.primaryAxisAlignItems = "MIN"
      field.counterAxisAlignItems = "CENTER"
      field.paddingTop = 10
      field.paddingBottom = 10
      field.paddingLeft = 10
      field.paddingRight = 10
      field.cornerRadius = 8
      field.primaryAxisSizingMode = "FIXED"
      field.counterAxisSizingMode = "AUTO"

      applyFill(field, s.fieldFill)
      applyStroke(field, s.border)
      applyRing(field, s.ring, s.ringSpread)

      field.appendChild(await txt("Placeholder", "gray/400", 14, "Regular"))
      field.resize(280, field.height)  // fix width only; height already auto-sized

      c.appendChild(field)

      comps.push(c)
    }
  }

  const set = figma.combineAsVariants(comps, figma.currentPage)
  set.name = "Input"
  applyGrid(set, comps, 2)  // 2 cols = one per Label option (True / False)
  return set
}

// ---------------------------------------------------------------------------
// CHECKBOX  (6 state combinations × 2 label variants = 12 components)
// ---------------------------------------------------------------------------
const CHECKBOX_STATES = [
  { checked: "False", state: "Default", boxFill: "gray/100", border: "gray/300", ring: null,        ringSpread: 0, checkmark: false },
  { checked: "False", state: "Hover",   boxFill: "gray/100", border: "gray/400", ring: null,        ringSpread: 0, checkmark: false },
  { checked: "False", state: "Focus",   boxFill: "gray/100", border: "blue/500", ring: "blue/500",  ringSpread: 2, checkmark: false },
  { checked: "True",  state: "Default", boxFill: "blue/600", border: "blue/600", ring: null,        ringSpread: 0, checkmark: true  },
  { checked: "True",  state: "Hover",   boxFill: "blue/600", border: "blue/600", ring: null,        ringSpread: 0, checkmark: true  },
  { checked: "True",  state: "Focus",   boxFill: "blue/600", border: "blue/600", ring: "blue/500",  ringSpread: 2, checkmark: true  },
]

async function buildCheckbox() {
  const comps = []

  for (const s of CHECKBOX_STATES) {
    for (const showLabel of [true, false]) {
      const c = figma.createComponent()
      c.name = `Checked=${s.checked}, State=${s.state}, Label=${showLabel ? "True" : "False"}`

      c.layoutMode = "HORIZONTAL"
      c.primaryAxisAlignItems = "CENTER"
      c.counterAxisAlignItems = "CENTER"
      c.itemSpacing = 8
      c.paddingTop = 0
      c.paddingBottom = 0
      c.paddingLeft = 0
      c.paddingRight = 0
      c.primaryAxisSizingMode = "AUTO"
      c.counterAxisSizingMode = "AUTO"
      c.fills = []

      // Checkbox box (16 × 16, rounded = 4px — matches Flowbite)
      const box = figma.createFrame()
      box.layoutMode = "HORIZONTAL"
      box.primaryAxisAlignItems = "CENTER"
      box.counterAxisAlignItems = "CENTER"
      box.primaryAxisSizingMode = "FIXED"
      box.counterAxisSizingMode = "FIXED"
      box.resize(16, 16)
      box.cornerRadius = 4
      applyFill(box, s.boxFill)
      applyStroke(box, s.border)
      applyRing(box, s.ring, s.ringSpread)

      if (s.checkmark) {
        box.appendChild(await txt("✓", "white", 10, "Medium"))
      }

      c.appendChild(box)

      // Label — only added when visible so it takes no layout space otherwise
      if (showLabel) {
        c.appendChild(await txt("Label", "gray/900", 14, "Medium"))
      }

      comps.push(c)
    }
  }

  const set = figma.combineAsVariants(comps, figma.currentPage)
  set.name = "Checkbox"
  applyGrid(set, comps, 2)  // 2 cols = one per Label option (True / False)
  return set
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" })
  await figma.loadFontAsync({ family: "Inter", style: "Medium" })

  // Create or switch to Components page
  let page = figma.root.children.find((p) => p.name === "🧩 Components")
  if (!page) {
    page = figma.createPage()
    page.name = "🧩 Components"
  }
  figma.currentPage = page

  const buttonSet = await buildButton()
  buttonSet.x = 0
  buttonSet.y = 0

  const inputSet = await buildInput()
  inputSet.x = 0
  inputSet.y = buttonSet.y + buttonSet.height + 80

  const checkboxSet = await buildCheckbox()
  checkboxSet.x = 0
  checkboxSet.y = inputSet.y + inputSet.height + 80

  figma.viewport.scrollAndZoomIntoView([buttonSet, inputSet, checkboxSet])
  figma.closePlugin("✓ Button, Input, and Checkbox component sets created!")
}

main().catch((err) => figma.closePlugin(`❌ ${err.message}`))
