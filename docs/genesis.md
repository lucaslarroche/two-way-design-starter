# Genesis Prompt

This is the prompt that started this project — lightly edited from the original
to be less technical, while still being specific enough to produce a repo close
to what you see here.

---

## The Prompt

I want to build an open-source starter repository, plus a full Google Slides
presentation in Markdown, to demonstrate a two-way design system sync between
Figma and code using Claude Code.

### Main goal

Build a clean and minimal starter repo that shows how a small design system can
stay synced both ways between Figma and Storybook/code.

The sync should work through Claude Code commands, with the ability to choose
the direction:

- Figma → code
- code → Figma

The final result should be practical, easy to understand, easy to demo, and
easy to reuse as a starting point.

---

### How I want you to work

Please do not treat this as a one-shot answer. I want you to act like a
hands-on technical guide and collaborator across the full roadmap.

**Your working mode:**

- Work step by step
- Maintain a clear TODO list during the whole process
- Break the project into logical phases
- At each phase, explain what we are doing and why
- Ask me every question you need answered before making assumptions that matter
- When something can reasonably be decided by best practice, propose a
  recommendation instead of blocking
- Guide me through the full roadmap from setup to final demo
- Keep track of what is done, what is next, and what still needs my input
- Prefer progress over theory
- Keep the repo minimal and avoid over-engineering

**Important behavior:**

- If something is ambiguous, ask me
- If there are multiple valid options, recommend one clearly
- Do not jump straight to final implementation without first organizing the plan
- Always keep the TODO list updated

---

### Tech stack

Use this stack. Do not add tests.

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Storybook

---

### What to build

#### 1) Figma components

Build a Figma plugin (a single `code.js` file) that programmatically generates
the 3 component sets directly inside Figma. The plugin should run once to
create all components on a dedicated page, with each component set showing
all its variants in a clean grid layout.

The plugin should use auto layout throughout and reference local Figma color
styles when they exist, falling back to hardcoded hex values otherwise.

**Button** — use the visual styles from https://flowbite.com/docs/components/buttons/

Variants: Default, Secondary, Tertiary, Success, Danger, Warning, Dark, Ghost
States: Default, Hover, Focus

**Input** — use the default visual styles from https://flowbite.com/docs/components/forms/

- One size only
- Optional label
- States: Default, Hover, Focus

**Checkbox** — use the default visual styles from https://flowbite.com/docs/components/forms/

- Checked and unchecked
- Optional label
- States: Default, Hover, Focus

#### 2) Storybook

Create the same 3 components in Storybook, matching the Figma components.
Make it easy to sync in both directions between Figma and Storybook/code
using Claude Code commands.

#### 3) Next.js demo page

Create a minimal demo page with a login form using the components above.

The form should include:

- Your email
- Your password
- I agree with the terms and conditions
- Submit

Keep the page minimal and clean.

---

### Code rules

- Tailwind-first styling
- TypeScript only
- Component props should always extend the type of the underlying HTML element
- Keep the implementation simple and readable
- Avoid over-engineering

Examples:
- Button extends `ButtonHTMLAttributes<HTMLButtonElement>`
- Input extends `InputHTMLAttributes<HTMLInputElement>`
- Checkbox extends `InputHTMLAttributes<HTMLInputElement>`

---

### What I want from you

**A) Build plan** — Create a step-by-step plan to build the repo, including:

- project structure
- Figma setup
- Storybook setup
- Claude Code setup
- sync flow in both directions

**B) Claude Code config** — Define the Claude config and files needed for this
workflow.

**C) Custom commands** — Design custom Claude Code commands to make the sync
easy in both directions.

**D) Final repo outcome** — The result should be:

- a clean and minimal starter repo
- a Figma plugin that generates the 3 component sets programmatically
- the Claude commands and config needed for two-way sync
- a working demo page
- a small Storybook with the 3 synced components

**E) Presentation in Markdown** — Write a full presentation in Markdown covering:

- title slide
- problem / opportunity
- what the repo demonstrates
- stack overview
- repo structure
- setup and install steps
- how the two-way sync works
- day-to-day usage flow
- commands to run
- example workflow 1: change in Figma first, then sync to code
- example workflow 2: change in code first, then sync to Figma
- limitations, risks, and assumptions
- conclusion

Each slide should have a title and full bullet content. Include code and
command snippets where helpful. Keep it practical and demo-friendly.

---

### Important constraints

- Keep the repo minimal
- Prefer clarity over completeness
- Avoid over-engineering
- No tests, no unnecessary tooling
- The goal is to teach and demonstrate the workflow clearly
- The output should be practical and implementation-oriented
