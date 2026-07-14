@AGENTS.md

## Platform claims

Before writing or editing ANY content that states facts about the Meta
Ray-Ban Display platform (docs, marketing copy, llms-template.md, JSON-LD,
READMEs), read the validated Meta fact sheet in the sibling repo:
`~/Documents/Github/glasskit/.claude/skills/platform-content/SKILL.md`
(single source of truth for both repos — never write platform facts from
model memory). Local reminder: `public/llms.txt` is GENERATED from
`apps/web/llms-template.md` by `scripts/build-registry.mjs`; edit the
template, never the output.

## Styling — Tailwind + tokens everywhere (shadcn model)

- **Both the site and the lens are Tailwind utilities, always.** No inline
  `style={{}}`. Use utilities directly in the JSX (arbitrary values like
  `bg-[#14171f]`, `grid-cols-[auto_minmax(0,1fr)]`, `[box-shadow:...]` are fine).
- **The lens is token-driven so any DESIGN.md can re-theme it.** Lens components
  in `registry/ui/*` use Tailwind utilities + the `--gk-*` design tokens:
  `text-foreground` / `text-muted-foreground` / `text-foreground-faint`,
  `border-border`, `bg-primary` / `text-primary`, `ring-ring`, `rounded-lens`,
  and the `surface` / `btn-primary` / `press-scale` `@utility` recipes (for the
  gradient/shadow/press cases utilities can't express). `theme.css` maps those
  utilities to the tokens; `styles.css` defines the scoped `--gk-*` values on
  `.glass-viewport`. Re-theme by overriding `--gk-*` on `.glass-viewport`.
- **`packages/glasses-ui/styles.css` holds only primitives**, never per-component
  styling: the `--gk-*` tokens, the `.glass-viewport` base, the `.focusable`
  recipe, the `@keyframes` + their animation hooks, the masked-pseudo recipes
  (`.hairline`/`.glow-*`), the icon-plate tones (`.gk-plate`/`.gk-grad-*`), and
  the native-control pseudo-element rules (slider/progress/list-scrollbar/toggle/
  tabs-pill) + world-anchored SVG geometry. A component's layout/color lives in
  its `.tsx` as utilities.
- **RTL: logical utilities only** in lens components (`ps-*`/`pe-*`, `ms-*`/`me-*`,
  `start-*`/`end-*`, `text-start`/`text-end`, `rounded-s/e`, `size-*`). Never
  `pl/pr/ml/mr/left/right/text-left/text-right`. Never mirror world-anchored
  components (DirectionArrow, Compass, Pin, Callout, MapView).
- **`cn()`** (`registry/lib/utils.ts`) is clsx + tailwind-merge, so a consumer's
  `className` override wins. Keep the `focusable` class on every interactive
  element (the focus engine selects it) and the `.t-title/.t-readout/.t-body/
  .t-caption` classes for type.

## graphify

This project will have a knowledge graph at `graphify-out/` (god nodes, community
structure, cross-file relationships). It is **not generated yet** — create it in
Phase 1 with `graphify update .` (AST-only, no API cost), then keep it current.

Once `graphify-out/` exists, follow the same rules as the sibling `adelaide` repo:

- For codebase questions, first run `graphify query "<question>"` when
  `graphify-out/graph.json` exists. Use `graphify path "<A>" "<B>"` for
  relationships and `graphify explain "<concept>"` for focused concepts.
- If `graphify-out/wiki/index.md` exists, use it for broad navigation instead of
  raw source browsing.
- Read `graphify-out/GRAPH_REPORT.md` only for broad architecture review.
- After modifying code, run `graphify update .` to keep the graph current.
