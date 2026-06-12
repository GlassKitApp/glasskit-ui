---
"@glasskit-ui/react": minor
---

Focus engine v2: ownership, intent, and memory primitives.

- **`<FocusScope>`** — contain the D-pad ring to a subtree while mounted
  (modal surfaces: confirms, permission prompts, sheets). Seeds focus inside
  on mount; arrows/Enter only see focusables within the innermost scope;
  unmounting restores focus to the element that had it before. Layout-inert
  (`display: contents`).
- **`data-autofocus`** — `seedFocus()` now starts the ring at the first
  focusable carrying this attribute (falling back to DOM order), so screens
  can declare where focus begins — e.g. a destructive confirm seeding on
  cancel.
- **`getFocusables()`** — the current D-pad candidate list (scope- and
  visibility-aware), exported so navigation containers can implement focus
  memory: record the focused index on push, restore it on pop.
