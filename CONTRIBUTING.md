# Contributing to GlassKit UI

Thanks for helping build the component layer for Meta Ray-Ban Display apps.
Start with [`AGENTS.md`](./AGENTS.md) and the design source of truth,
[`docs/design/meta-hud-language.md`](./docs/design/meta-hud-language.md)
([`apple-feel.md`](./docs/design/apple-feel.md) is the earlier additive-lens
reference — its type ramp, motion, and RTL rules still apply; where the two
conflict on fills/gradients/colors, the Meta-HUD spec wins).

## Repo layout

```
packages/glasses-ui/     # the npm SDK: hooks + GlassViewport + the lens stylesheet
packages/cli/            # the `glasskit` CLI — vendors components from the registry
packages/mcp/            # MCP server exposing the registry to AI agents
registry/ui/             # the styled components (vendored, shadcn-style) — you own these
registry/lib/            # shared vendorable helpers (cn(), bearing math)
registry/registry.json   # generated index of the registry (do not hand-edit)
apps/web/                # glasskit.app/ui — docs, the playground, served registry
scripts/build-registry.mjs
```

The split is deliberate: **the npm package is the moat** (focus engine, sensor
hooks, viewport, base tokens) and never changes lightly — releases flow through
Changesets (see [`docs/RELEASING.md`](./docs/RELEASING.md)). **Styled
components live in the registry** and are vendored into a consumer's app —
they own and restyle the source.

## The lens design rules (non-negotiable)

These come from `meta-hud-language.md` and `AGENTS.md`:

- **Premium surfaces on a calm dark base.** Background stays quiet
  (`#0b0e16` → `#090b11`); cards, rows, pills, and buttons are real surfaces —
  top-lit gradient fill, 1px specular top edge, soft depth. App/hero glyphs sit
  on gradient squircle plates. **No `backdrop-filter`/blur on lens content** —
  surface fills, never frosted glass.
- **No inline CSS** (`style={{}}`). Tailwind `@theme` tokens + the semantic
  classes in `styles.css` only. Dynamic geometry (rotation, gauge fill, world
  position) goes through **SVG `transform` / `stroke-dashoffset` attributes**,
  which are not inline style — see `Meter`, `DirectionArrow`, `Pin`.
  **The one sanctioned exception:** `List`'s scroll-rail thumb mutates
  `style.height`/`style.transform` from an effect — re-rendering React on
  every scroll frame would blow the device perf budget, and the rail is
  `aria-hidden` chrome. Don't add new exceptions without that level of
  justification.
- **One accent.** UI accent is blue (`#4c8dff`, swappable via `--accent`);
  convey extra state with luminance and motion, never a second hue (not even
  red for errors). Gradient plates are for icons, not for state.
- **RTL from day one.** Logical CSS (`*-inline`, `inset-inline`,
  `start`/`end`). **Exception:** world-anchored components (DirectionArrow,
  Compass, Reticle, Pin, Callout, Viewfinder) must use **physical/absolute**
  positioning and must **never mirror** — a flipped bearing or marker points at
  the wrong real-world thing.
- **Glanceable.** One task per view; ≤ 3–5 focusable elements; tabular numerals
  on changing readouts; ≥ 15px for sustained reading, 12–13px caps-tracked
  labels only; motion collapses under `prefers-reduced-motion`.

## The auto-wire convention (components that touch sensors)

Sensor-driven components **self-connect to the SDK hooks when their data prop
is omitted**; passing the prop makes them fully controlled — the prop always
wins. `<Compass />` follows `useDeviceOrientation()`, `<Compass heading={290}/>`
renders 290°. The pattern:

```tsx
"use client";
import { useDeviceOrientation } from "@glasskit/glasses-ui";

// Hooks are always called (rules of hooks); the prop wins by selection.
const live = useDeviceOrientation();
const deg = normalizeDeg(heading ?? live.alpha ?? 0); // controlled > sensor > fallback
```

Requirements:

- `"use client"` at the top of any hook-consuming component.
- A **deterministic fallback** when no prop and no sensor data exist (the SDK
  hooks start `null` on the server and the first client render, so this is
  also what makes live mode hydration-safe).
- Gesture consumers (`useNeuralBand`) must act in a `useEffect` keyed on the
  gesture **alone** (read other values through a latest-ref) — the gesture is
  a one-shot that clears on the next microtask, and extra effect deps can
  re-fire it before the clear lands (see `Deck`).

## Adding a registry component

1. **Component** — `registry/ui/<name>.tsx`. Lead with a `/** <Name> — one
   sentence. … */` JSDoc (the registry generator reads the first sentence).
   Compose the semantic classes; add any new classes to
   `packages/glasses-ui/styles.css` under a scoped `.glass-viewport` selector.
   Controlled inputs must attach `onClick` **only when a handler is given**
   (`onClick={onChange ? () => … : undefined}`) so static docs previews can be
   server-rendered. **Imports:** a component may import `../lib/<helper>` (the
   shared `registry/lib` files), `./<sibling>` (another registry component),
   and **npm packages — including `@glasskit/glasses-ui`** (the generator
   detects bare imports and declares them as the item's `dependencies`, which
   the CLI installs). The served targets (`components/lib/*` +
   `components/glasskit/<name>.tsx`) mirror the registry layout so relative
   imports resolve in a consumer with no rewriting.
2. **Docs entry** — add to `apps/web/lib/component-docs.tsx`: `slug`, `name`,
   `category` (Shell · Display · Status · Action · Navigation · Spatial), a
   `summary`, a handler-free `preview` node, a `props` table, and `usage`. This
   one entry drives the index, the sidebar, and the `/docs/components/<slug>`
   page (statically generated).
3. **Test** — add to `apps/web/__tests__/registry/`. Cover the logic-bearing
   behavior (state, clamping, focus, the rendered transform/offset attribute,
   auto-wire precedence). World-anchored components get a never-mirrors-under-
   RTL assertion.
4. **Regenerate the index** — `pnpm build:registry`.
5. **Verify** — `pnpm --filter @glasskit/web typecheck && pnpm --filter
   @glasskit/web test`. Then run the site (`pnpm --filter @glasskit/web dev`)
   and check the component's docs page + the playground.

## The registry index

`registry/registry.json` is a [shadcn-format](https://ui.shadcn.com/docs/registry)
index, **generated** from the component files by `scripts/build-registry.mjs`:

```sh
pnpm build:registry
```

It derives each item's title, description (from the JSDoc),
`registryDependencies` (cross-component + `../lib/*` imports), and npm
`dependencies` (bare imports; the SDK is pinned to the version in
`packages/glasses-ui/package.json`). The same script also emits the **served
distribution** to `apps/web/public/r/` — one `registry-item.json` per component
with file content inlined, so a shadcn-compatible client can fetch
`/r/<name>.json`. That directory is gitignored (built on demand / in CI).

The branded CLI ([`packages/cli`](./packages/cli)) consumes these endpoints —
`glasskit add <name>` fetches `/r/<name>.json`, resolves `registryDependencies`,
writes the files to `components/glasskit/`, and installs the npm
`dependencies` (skip with `--no-install`). An MCP server
([`packages/mcp`](./packages/mcp)) exposes the same registry to AI agents. Both
are built and runnable but **not published to npm yet**.

## House rules

- **No `Co-Authored-By` / agent attribution** on commits.
- pnpm only (`pnpm@10.8.0`); run `pnpm format` before pushing.
- Changes under `packages/glasses-ui/` need a changeset (`pnpm changeset`) or
  the `no-changeset-needed` PR label — CI enforces it.
- Do **not** publish to npm or make the repo public without the owner's
  go-ahead (publishing is gated on `RELEASE_ENABLED`, see
  [`docs/RELEASING.md`](./docs/RELEASING.md)).
