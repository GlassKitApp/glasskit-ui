# Contributing to GlassKit UI

Thanks for helping build the component layer for Meta Ray-Ban Display apps.
Start with [`AGENTS.md`](./AGENTS.md) and the design source of truth,
[`docs/design/apple-feel.md`](./docs/design/apple-feel.md).

## Repo layout

```
packages/glasses-ui/     # the npm SDK: hooks + GlassViewport + the lens stylesheet
registry/ui/             # the styled components (vendored, shadcn-style) — you own these
registry/lib/utils.ts    # the cn() helper every component uses
registry/registry.json   # generated index of the registry (do not hand-edit)
apps/web/                # ui.glasskit.app — docs, the playground, served registry
scripts/build-registry.mjs
```

The split is deliberate: **the npm package is the moat** (focus engine, sensor
hooks, viewport, base tokens) and never changes lightly. **Styled components live
in the registry** and are vendored into a consumer's app — they own and restyle
the source.

## The lens design rules (non-negotiable)

These come from `apple-feel.md` and `AGENTS.md`:

- **Additive light only.** `--color-bg` stays `#000`; no glassmorphism, no
  backdrop-blur, no gray fills. Surfaces are luminous hairline edges + glow.
- **No inline CSS** (`style={{}}`). Tailwind `@theme` tokens + the semantic
  classes in `styles.css` only. Dynamic geometry (rotation, gauge fill, world
  position) goes through **SVG `transform` / `stroke-dashoffset` attributes**,
  which are not inline style — see `Meter`, `DirectionArrow`, `Pin`.
- **One accent.** A single phosphor green (`#36e27f`); convey extra state with
  luminance and motion, never a second hue (not even red for errors).
- **RTL from day one.** Logical CSS (`*-inline`, `inset-inline`, `start`/`end`).
  **Exception:** world-anchored components (DirectionArrow, Compass, Reticle,
  Pin, Callout) must use **physical/absolute** positioning and must **never
  mirror** — a flipped bearing or marker points at the wrong real-world thing.
- **Glanceable.** One task per view; ≤ 3–5 focusable elements; tabular numerals
  on changing readouts.

## Adding a registry component

1. **Component** — `registry/ui/<name>.tsx`. Lead with a `/** <Name> — one
   sentence. … */` JSDoc (the registry generator reads the first sentence).
   Compose the semantic classes; add any new classes to
   `packages/glasses-ui/styles.css` under a scoped `.glass-viewport` selector.
   Controlled inputs must attach `onClick` **only when a handler is given**
   (`onClick={onChange ? () => … : undefined}`) so static docs previews can be
   server-rendered.
2. **Docs entry** — add to `apps/web/lib/component-docs.tsx`: `slug`, `name`,
   `category` (Shell · Display · Status · Action · Navigation · Spatial), a
   `summary`, a handler-free `preview` node, a `props` table, and `usage`. This
   one entry drives the index, the sidebar, and the `/docs/components/<slug>`
   page (statically generated).
3. **Test** — add to `apps/web/__tests__/registry/`. Cover the logic-bearing
   behavior (state, clamping, focus, the rendered transform/offset attribute).
4. **Regenerate the index** — `pnpm build:registry`.
5. **Verify** — `pnpm --filter @glasskit/web typecheck && pnpm --filter
   @glasskit/web test`. Then run the site (`pnpm --filter @glasskit/web dev`) and
   check the component's docs page + the playground.

## The registry index

`registry/registry.json` is a [shadcn-format](https://ui.shadcn.com/docs/registry)
index, **generated** from the component files by `scripts/build-registry.mjs`:

```sh
pnpm build:registry
```

It derives each item's title, description (from the JSDoc) and
`registryDependencies` (cross-component imports + the shared `utils`). The same
script also emits the **served distribution** to `apps/web/public/r/` — one
`registry-item.json` per component with file content inlined, so a
shadcn-compatible client can fetch `/r/<name>.json`. That directory is gitignored
(built on demand / in CI).

The branded CLI (`npx glasskit add <name>`) that consumes these endpoints is
planned but not built yet; the registry format is ready for it.

## House rules

- **No `Co-Authored-By` / agent attribution** on commits.
- pnpm only (`pnpm@10.8.0`); run `pnpm format` before pushing.
- Do **not** publish to npm or make the repo public without the owner's go-ahead.
