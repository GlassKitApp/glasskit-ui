# GlassKit UI

[![npm](https://img.shields.io/npm/v/%40glasskit-ui%2Freact?label=%40glasskit-ui%2Freact)](https://www.npmjs.com/package/@glasskit-ui/react)
[![npm](https://img.shields.io/npm/v/%40glasskit-ui%2Fcli?label=%40glasskit-ui%2Fcli)](https://www.npmjs.com/package/@glasskit-ui/cli)
[![CI](https://github.com/GlassKitApp/glasskit-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/GlassKitApp/glasskit-ui/actions/workflows/ci.yml)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

The open-source React component library for **Meta Ray-Ban Display** apps —
the ergonomic layer Meta does not ship. An SDK + a shadcn-style registry of
48 components, built for the 600×600 lens: a glasses-tuned D-pad focus
engine, system-back-aware navigation, live sensor wiring, and a premium HUD
visual language. Every component is QR-launchable as a working app on real
glasses from its [docs page](https://glasskit.app/ui/docs/components).

> **Built for the lens.** Black renders transparent on the Display's
> waveguide, input is Neural Band gestures arriving as arrow/Enter keys, and
> the system back gesture pops browser history. Components are verified
> against the actual platform — see
> [`docs/platform-audit-2026-06.md`](./docs/platform-audit-2026-06.md) and
> the design spec, [`docs/design/meta-hud-language.md`](./docs/design/meta-hud-language.md).

## What's here

- **`@glasskit-ui/react`** ([`packages/glasses-ui`](./packages/glasses-ui)) —
  the SDK: `GlassViewport`, the spatial focus engine (`useDpad` / `scoreRect`),
  the W3C sensor + Neural Band hooks, and the scoped lens stylesheet.
- **The registry** ([`registry/ui`](./registry/ui)) — 48 styled components you
  vendor and own, shadcn-style, via the `glasskit` CLI. Covers all eight HUD
  jobs: Monitor, Navigate, Guide, Caption, Notify/Comms, Capture/Control,
  Annotate, Launch/Select — including the world-anchored set (DirectionArrow,
  Compass, Pin, Callout, Reticle) that a watch kit can't do, and a
  system-back-integrated `Navigator`.
- **`glasskit.app/ui`** ([`apps/web`](./apps/web)) — docs, per-component pages
  with live previews + on-glasses QR install, and a realtime playground.

## Quick start

```sh
npm create glasskit my-app           # a complete glasses app, D-pad wired
```

Or add the SDK to an existing project:

```sh
pnpm add @glasskit-ui/react          # the SDK (react 19 peer dep)
```

```css
/* your CSS entry, after Tailwind v4 */
@import "tailwindcss";
@import "@glasskit-ui/react/styles.css";
```

```tsx
import { GlassViewport, useDpad } from "@glasskit-ui/react";
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
npx @glasskit-ui/cli add screen readout button  # also pulls their dependencies
npx @glasskit-ui/cli list                       # browse all 45
```

## Monorepo

```
packages/glasses-ui/       @glasskit-ui/react — the SDK (hooks + viewport + stylesheet)
packages/cli/              @glasskit-ui/cli — scaffold + vendor from the registry
packages/create-glasskit/  npm create glasskit
packages/mcp/              @glasskit-ui/mcp — the registry for AI agents
registry/ui/               the 48 styled components (you own these)
apps/web/                  glasskit.app/ui — docs, playground, served registry (/r/*.json)
docs/                      design spec + platform audit + release process
```

pnpm + Turborepo. Contributing and the "add a component" flow:
[`CONTRIBUTING.md`](./CONTRIBUTING.md). Full strategy: [`PLAN.md`](./PLAN.md).

## Status

Live: packages publish to npm with provenance through an automated
Changesets pipeline, the registry serves from production, and every change
runs the full gate — 100+ behavior tests, package audits (`publint`/`attw`),
and Meta's device bundle budget enforced in CI. Releases: see
[`docs/RELEASING.md`](./docs/RELEASING.md). License: [MIT](./LICENSE).
