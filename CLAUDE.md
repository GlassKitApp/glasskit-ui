@AGENTS.md

## Styling — Tailwind for the site, semantic classes only for the lens

- **Site chrome (everything in `apps/web`) = Tailwind utility classes, always.**
  Never hand-write CSS rules / bespoke class names in `apps/web/app/globals.css`
  or `apps/web/app/(docs)/docs-theme.css` for a component. Use utilities
  directly in the JSX (arbitrary values like `bg-[#14171f]`,
  `grid-cols-[auto_minmax(0,1fr)]` are fine and encouraged). Those global
  stylesheets are only for `@theme`/tokens, third-party overrides, and the few
  shared frame primitives — not per-component styling.
- **The lens design system is the one exception.**
  `packages/glasses-ui/styles.css` and the `gk-*` semantic classes in
  `registry/ui/*` ship as a standalone stylesheet that consumers import
  (`@glasskit-ui/react/styles.css`), scoped under `.glass-viewport` — it can't
  be Tailwind. There the rule is the inverse: semantic `gk-*` classes, **no
  inline `style={{}}`**, no Tailwind.

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
