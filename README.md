# GlassKit UI

The open-source React component library for **Meta Ray-Ban Display** apps — the
ergonomic, additive-lens layer Meta does not ship. An SDK + a shadcn-style
registry of 28 components, built for the see-through 600×600 HUD: emitted light
on true black, a glasses-tuned D-pad focus engine, and the Neural Band gesture
vocabulary.

> **Additive, not glass.** On a see-through waveguide, black (`#000`) emits no
> light and shows the real world through it. So every component is built from
> *emitted light* — luminous hairline edges, a single phosphor-green accent, soft
> glow — never fills or backdrop-blur. See [`docs/design/apple-feel.md`](./docs/design/apple-feel.md).

## What's here

- **`@glasskit/glasses-ui`** ([`packages/glasses-ui`](./packages/glasses-ui)) —
  the SDK: `GlassViewport`, the spatial focus engine (`useDpad` / `scoreRect`),
  the four W3C sensor + Neural Band hooks, and the scoped additive stylesheet.
- **The registry** ([`registry/ui`](./registry/ui)) — 28 styled components you
  vendor and own, shadcn-style, via the `glasskit` CLI. Covers all eight HUD
  jobs: Monitor, Navigate, Guide, Caption, Notify/Comms, Capture/Control,
  Annotate, Launch/Select — including the world-anchored set (DirectionArrow,
  Compass, Pin, Callout, Reticle) that a watch kit can't do.
- **`ui.glasskit.app`** ([`apps/web`](./apps/web)) — docs, per-component pages
  with live previews, and a realtime playground.

## Quick start

```sh
pnpm add @glasskit/glasses-ui          # the SDK (react 19 peer dep)
```

```css
/* your CSS entry, after Tailwind v4 */
@import "tailwindcss";
@import "@glasskit/glasses-ui/styles.css";
```

```tsx
import { GlassViewport, useDpad } from "@glasskit/glasses-ui";
import { Screen } from "@/components/glasskit/screen";
import { Readout } from "@/components/glasskit/readout";

export function App() {
  useDpad(); // arrow keys / Neural Band → spatial focus; Enter → activate
  return (
    <GlassViewport>
      <Screen>
        <Readout label="Heart rate" value="128" unit="BPM" />
      </Screen>
    </GlassViewport>
  );
}
```

Add components with the CLI (vendors the source into your project):

```sh
glasskit add screen readout button     # also pulls their dependencies
glasskit list                          # browse all 28
```

## Monorepo

```
packages/glasses-ui/   the npm SDK (hooks + viewport + base stylesheet)
packages/cli/          the `glasskit` CLI (vendors from the registry)
registry/ui/           the 28 styled components (you own these)
apps/web/              ui.glasskit.app — docs, playground, served registry (/r/*.json)
docs/design/           the additive-lens design spec
```

pnpm + Turborepo. Contributing and the "add a component" flow:
[`CONTRIBUTING.md`](./CONTRIBUTING.md). Full strategy: [`PLAN.md`](./PLAN.md).

## Status

Built and complete as a surface — 28 components, generated registry, docs site,
55+ tests. **Not yet public on npm.** The repo, the npm packages, and the branded
CLI publish stay gated on the owner's go-ahead; CI + Changesets are wired but
inert. License: TBD before going public.
