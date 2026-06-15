# @glasskit-ui/mcp

## 0.2.0

### Minor Changes

- 8f1c2f6: Agent guidance now covers navigation and is glasses-first by default. The
  scaffold's AGENTS.md / SKILL.md gain a "glasses-first golden rules" block, a
  prominent "navigation is a history router" section (Navigator, the back
  gesture, history.state restoration, useBackHandler), wayfinding
  (DirectionArrow vs MapView), and component discovery via the MCP (no more
  hardcoded component count). The MCP server gains a `glasskit_guidelines` tool
  so an agent with only the MCP still learns the rules before generating screens.
- 95ee88b: GlassKit UI 0.5: token-driven theming, a component quality pass, semantic
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

## 0.1.0

### Minor Changes

- cfc814d: First release. `@glasskit-ui/cli` (bin: `glasskit`) scaffolds complete Vite +
  React glasses apps with `init` (600×600 + `mrbd-web-app-capable` meta tags,
  GlassViewport + useDpad wired) and vendors registry components with `add`
  (resolves registry dependencies, installs npm dependencies). `@glasskit-ui/mcp`
  exposes the same registry to AI agents over the Model Context Protocol.
