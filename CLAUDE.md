@AGENTS.md

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
