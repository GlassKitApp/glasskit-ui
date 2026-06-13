# GlassKit UI

> The open-source React component library for Meta Ray-Ban Display (smart-glasses) web apps. It ships the platform primitives Meta doesn't: a glasses-tuned D-pad focus engine, system-back-aware navigation, W3C sensor and Neural Band hooks, and {{COUNT}} HUD components for the 600×600 lens. Published on npm under the `@glasskit-ui` scope; components vendor shadcn-style, so you own the source.

## Install

```sh
npm create glasskit my-app                 # scaffold a complete Vite glasses app
npx @glasskit-ui/cli add list button compass navigator   # vendor components (writes to components/glasskit/)
npm install @glasskit-ui/react                   # the SDK alone (hooks + GlassViewport + styles.css); React 19 peer dep, ESM only
```

Agent skill: every scaffold ships AGENTS.md + a Claude Code skill + Cursor/Copilot rules (the platform contract, pre-briefed); add to an existing project with `npx @glasskit-ui/cli agents`. Details: https://glasskit.app/ui/docs/ai

IMPORTANT: the bare `glasskit` npm package is UNRELATED to this project. Always use the scoped names (`@glasskit-ui/react`, `@glasskit-ui/cli`, `@glasskit-ui/mcp`) or `create-glasskit`. An MCP server (`npx @glasskit-ui/mcp`) exposes this registry to AI agents.

## SDK (`@glasskit-ui/react`)

- `GlassViewport` is the 600×600 lens surface. Wrap your app in it.
- `useDpad()`: call once at the root. Arrow keys and Neural Band swipes move a focus ring between `.focusable` elements; Enter or pinch activates.
- `useDeviceOrientation()`, `useDeviceMotion()`, `useGeolocation()` are W3C sensor hooks (GPS is proxied from the paired phone).
- `useNeuralBand()` is a one-shot CustomEvent seam for richer gestures. It's forward-compat: the platform currently delivers only arrows/Enter to web apps.
- `useFeedback()` / `buzz("tap"|"success"|"warning")` is the haptic seam. It dispatches a `glasskitfeedback` CustomEvent plus `navigator.vibrate` where supported. No haptics API reaches web apps yet.
- `<FocusScope>` contains the D-pad ring to a subtree while mounted (modals), then restores the previous focus on unmount. `data-autofocus` on any focusable picks where a screen's ring starts. Use `seedFocus()` / `getFocusables()` for custom containers.
- `import "@glasskit-ui/react/styles.css"` pulls in the design system, scoped under `.glass-viewport`. Retheme by re-declaring the accent ramp on `.glass-viewport` (`--accent-active/--accent/--accent-muted/--accent-faint/--accent-grad-hi/--accent-grad-lo/--accent-glow`). The ramp is the entire theming contract, and the playground emits the block per preset.

## Platform facts (verified 2026-06 against Meta's docs/toolkit)

- Input arrives as `ArrowUp/Down/Left/Right` and `Enter` keydowns. No cursor, touch, or text input.
- The system back gesture (middle pinch, glasses OS v125.1+) pops browser history, so your page gets `popstate`. `Escape` is the desktop-simulator mapping only.
- Fixed 600×600 viewport. Required meta tags: `width=600, height=600, user-scalable=no` plus `<meta name="mrbd-web-app-capable" content="yes">`.
- Black renders transparent (waveguide). Camera/mic/WebXR aren't available to web apps yet, and apps must be served over public HTTPS.
- Perf budget: <500 KB gzipped JS, <10 requests, <3 s on 4G (enforced in this repo's CI).

## Conventions

- **Auto-wiring**: sensor components self-connect when their data prop is omitted. `<Compass />` follows live head orientation; `<Compass heading={290} />` is controlled, and the prop always wins. Same for DirectionArrow (`target={{lat,lon}}`), Clock (self-ticking), Deck (Neural Band swipe).
- **Navigation**: `<Navigator screens={{...}} initial="home" />` plus `useNavigator()` (`push/pop/popToTop/replace`). Every push adds a real history entry so the system back gesture just works, and `useBackHandler(fn)` lets overlays consume back. Pop restores focus to the row that pushed (focus memory). The stack rides `history.state`, so a mid-flow reload restores the screen, and opt-in `paths` mirrors pushes into the URL.
- **Text entry**: the platform has no keyboard or mic, so `<ComposeFlow options={[...]} value onChange />` is the working recipe: a TextField that opens a back-gesture-aware picker. It's the seam system dictation would replace.
- **Vocabulary**: `emphasis` is visual weight (`"default"|"accent"` on Badge/Cue/Toast), `status` is semantic state (`"on"|"live"|"off"` on StatusDot), `tone` is the gradient palette (Avatar, GlowIcon plates, Launcher tiles).
- Design language ("premium surfaces", 2026-06): calm dark base (`#0b0e16`→`#090b11`), surfaces that pop (top-lit gradient, 1px light edge, soft depth), gradient icon plates, one blue accent (`--accent: #4c8dff`). One task per view, tabular numerals, logical RTL-safe CSS. World-anchored components (DirectionArrow, Compass, Pin, Callout) never mirror.

## Components ({{COUNT}})

Vendored shadcn-style. Live preview, props, and usage at `https://glasskit.app/ui/docs/components/<slug>`; machine-readable source and deps at `https://glasskit.app/ui/r/<slug>.json` (shadcn-compatible registry: `https://glasskit.app/ui/r/registry.json`). Every docs page has a QR that installs the component as a runnable app on real glasses.

{{COMPONENTS}}

## Toasts & notifications

`<Toaster />` plus `toast()`, built on Sonner, themed to the lens, top-anchored (Screen's Cue line owns the bottom strip). Mount it once at the root; it owns queueing, stacking, and auto-dismiss. Keep toasts non-interactive, since auto-dismiss strands the focus ring; actionable items are `NotificationCard`s. `Toast` is the static one-liner surface.

## Links

- Docs / getting started: https://glasskit.app/ui/docs
- Components reference: https://glasskit.app/ui/docs/components
- Playground: https://glasskit.app/ui/playground
- npm: https://www.npmjs.com/package/@glasskit-ui/react
- Source (MIT): https://github.com/GlassKitApp/glasskit-ui
- Platform audit: https://github.com/GlassKitApp/glasskit-ui/blob/main/docs/platform-audit-2026-06.md
