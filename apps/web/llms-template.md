# GlassKit UI

> The open-source React component library for Meta Ray-Ban Display (smart-glasses) web apps. It ships the platform primitives Meta does not: a glasses-tuned D-pad focus engine, system-back-aware navigation, W3C sensor + Neural Band hooks, and {{COUNT}} premium HUD components for the 600×600 lens. Published on npm under the `@glasskit-ui` scope; components vendor shadcn-style (you own the source).

## Install

```sh
npm create glasskit my-app                 # scaffold a complete Vite glasses app
npx @glasskit-ui/cli add list button compass navigator   # vendor components (writes to components/glasskit/)
npm i @glasskit-ui/react                   # the SDK alone (hooks + GlassViewport + styles.css); React 19 peer dep, ESM only
```

IMPORTANT: the bare `glasskit` npm package is UNRELATED to this project — always use the scoped names (`@glasskit-ui/react`, `@glasskit-ui/cli`, `@glasskit-ui/mcp`) or `create-glasskit`. An MCP server (`npx @glasskit-ui/mcp`) exposes this registry to AI agents.

## SDK (`@glasskit-ui/react`)

- `GlassViewport` — the 600×600 lens surface; wrap your app in it.
- `useDpad()` — call once at the root: arrow keys / Neural Band swipes move a focus ring between `.focusable` elements; Enter / pinch activates.
- `useDeviceOrientation()`, `useDeviceMotion()`, `useGeolocation()` — W3C sensor hooks (GPS is proxied from the paired phone).
- `useNeuralBand()` — one-shot CustomEvent seam for richer gestures (forward-compat: the platform currently delivers only arrows/Enter to web apps).
- `import "@glasskit-ui/react/styles.css"` — the design system, scoped under `.glass-viewport`.

## Platform facts (verified 2026-06 against Meta's docs/toolkit)

- Input arrives as `ArrowUp/Down/Left/Right` + `Enter` keydowns; no cursor, touch, or text input.
- The system back gesture (middle pinch, glasses OS v125.1+) pops browser history → your page gets `popstate`. `Escape` is the desktop-simulator mapping only.
- Fixed 600×600 viewport; required meta tags: `width=600, height=600, user-scalable=no` + `<meta name="mrbd-web-app-capable" content="yes">`.
- Black renders transparent (waveguide); camera/mic/WebXR not yet available to web apps; apps must be served over public HTTPS.
- Perf budget: <500 KB gzipped JS, <10 requests, <3 s on 4G (enforced in this repo's CI).

## Conventions

- **Auto-wiring**: sensor components self-connect when their data prop is omitted — `<Compass />` follows live head orientation, `<Compass heading={290} />` is controlled (the prop always wins). Same for DirectionArrow (`target={{lat,lon}}`), Clock (self-ticking), Deck (Neural Band swipe).
- **Navigation**: `<Navigator screens={{...}} initial="home" />` + `useNavigator()` (`push/pop/popToTop/replace`) — every push adds a real history entry so the system back gesture just works; `useBackHandler(fn)` lets overlays consume back.
- Design language ("premium surfaces", 2026-06): calm dark base (`#0b0e16`→`#090b11`), surfaces that pop (top-lit gradient + 1px light edge + soft depth), gradient icon plates, one blue accent (`--accent: #4c8dff`). One task per view, tabular numerals, logical RTL-safe CSS — but world-anchored components (DirectionArrow, Compass, Pin, Callout, Reticle, Viewfinder) never mirror.

## Components ({{COUNT}})

Vendored shadcn-style. Live preview + props + usage at `https://glasskit.app/ui/docs/components/<slug>`; machine-readable source + deps at `https://glasskit.app/ui/r/<slug>.json` (shadcn-compatible registry: `https://glasskit.app/ui/r/registry.json`). Every docs page has a QR that installs the component as a runnable app on real glasses.

{{COMPONENTS}}

## Toasts & notifications

`<Toaster />` + `toast()` (built on Sonner, themed to the lens, bottom-anchored): mount once at the root; it owns queueing, stacking, auto-dismiss. `Toast` is the static one-liner surface; `NotificationCard` the inline notification.

## Links

- Docs / getting started: https://glasskit.app/ui/docs
- Components reference: https://glasskit.app/ui/docs/components
- Playground: https://glasskit.app/ui/playground
- npm: https://www.npmjs.com/package/@glasskit-ui/react
- Source (MIT): https://github.com/GlassKitApp/glasskit-ui
- Platform audit: https://github.com/GlassKitApp/glasskit-ui/blob/main/docs/platform-audit-2026-06.md
