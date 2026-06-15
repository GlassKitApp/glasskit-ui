---
"@glasskit-ui/react": minor
"@glasskit-ui/mcp": minor
---

GlassKit UI 0.5: token-driven theming, a component quality pass, semantic
actions, installable templates, and an agent-first onboarding surface.

- **Token-driven theming (shadcn model).** Components are Tailwind utilities
  mapped to `--gk-*` design tokens via a new `theme.css`; re-theme by overriding
  the tokens on `.glass-viewport`, so any DESIGN.md applies with zero component edits.
- **Component quality pass across the set.** A single inset focus ring (no
  background "moat", so dense List rows stay flush), a Pressable layering fix so
  consumer utilities win, Avatar photo/initials/icon, a connected Segmented, and
  a real Props table in the docs.
- **Semantic action colors.** New `--gk-positive` / `--gk-danger` tokens +
  `btn-positive` / `btn-danger` recipes; `Button` gains `positive` / `danger`
  variants; destructive `Confirm` reads red.
- **Installable templates.** `workout` and `messages` ship as `registry:block`
  items with full CLI + Manual install and usage.
- **Navigator history seam.** A swappable history adapter (browser default
  unchanged on-device; memory adapter for tests).
- **MCP gains `get_add_command` and `get_component_example`** (real usage via a
  `meta.usage` field on served registry items).
