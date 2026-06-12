# @glasskit-ui/react

The typed 600×600 + D-pad component library for **Meta Ray-Ban Display**
Web Apps. The platform primitives Meta does not ship.

```sh
npm install @glasskit-ui/react
# react + react-dom ^19 are peer dependencies
```

## What's in here

- `<GlassViewport>` — the 600×600 surface. Wrap the app root in it.
- `useDpad()` — call once near the app root. Arrow keys → spatial focus
  navigation between elements with the `focusable` class. Enter → click.
  The Neural Band wristband translates pinches into these same keyboard
  events, so this hook is the same code path for desktop dev and
  on-device use.
- `useDeviceOrientation()` · `useDeviceMotion()` · `useGeolocation()` —
  standard W3C sensor APIs wrapped in a React-friendly shape. Each
  guards setState so a 60 Hz event stream doesn't re-render on every
  fire.
- `useNeuralBand()` — listens for the wristband's richer gestures
  (pinch, double-pinch, swipe). One-shot — the gesture string is
  exposed for one render, then cleared.
- `useFeedback()` / `buzz()` — the haptic seam. Dispatches a
  `glasskitfeedback` CustomEvent and calls `navigator.vibrate` where
  supported; no haptics API reaches Display web apps yet, so call it at
  interaction points and every call site lights up the day one ships.
- `<FocusScope>` — contain the D-pad ring to a subtree while mounted
  (modal surfaces: confirms, permission prompts, sheets). Seeds focus
  inside on mount, restores the previous focus on unmount. Layout-inert
  (`display: contents`).
- `data-autofocus` — put it on any `focusable` element and `seedFocus()`
  starts the ring there instead of the first element in DOM order (e.g.
  a confirm screen seeding on the safe action).
- `scoreRect` · `seedFocus` · `getFocusables` · `orientationEqual` ·
  `motionEqual` · `type Dir` — the focus-engine and sensor helpers,
  exported for composition and testing (`getFocusables` powers focus
  memory in navigation containers).

Plus `styles.css` — the on-lens design system (tokens, surface recipes, and
semantic classes: `.glass-viewport`, `.screen`, `.focusable`, `.launcher*`,
`.readout`, …). The whole system is **scoped to `.glass-viewport`**, so
importing it never touches the rest of your page — it only paints inside a
`<GlassViewport>`, even on a light-mode host. Tokens are CSS custom properties
on that scope; retheme by re-declaring the accent ramp — it is the entire
theming contract (focus rings, primary buttons, switch tracks, and badges all
derive from it):

```css
.glass-viewport {
  --accent-active: #82e1f2; /* focused/hot */
  --accent: #34c8e6; /* base accent */
  --accent-muted: #1f7d92; /* secondary edges */
  --accent-faint: #133f4a; /* trailing edges */
  --accent-grad-hi: #48cde8; /* primary-surface gradient, lit stop */
  --accent-grad-lo: #2ba6c0; /* primary-surface gradient, deep stop */
  --accent-glow: rgba(43, 166, 192, 0.6); /* depth shadow under accents */
}
```

(The live playground at https://glasskit.app/ui/playground emits this block
for each preset accent.)

## Usage

In your app's `index.css` (after importing Tailwind):

```css
@import "tailwindcss";
@import "@glasskit-ui/react/styles.css";
```

In your components:

```tsx
import {
  GlassViewport,
  useDpad,
  useDeviceOrientation,
  useGeolocation,
} from "@glasskit-ui/react";

export function App() {
  useDpad();
  const { alpha } = useDeviceOrientation();
  const { position } = useGeolocation();

  return (
    <GlassViewport>
      <div className="screen">
        <h1>Heading: {alpha ?? "—"}°</h1>
        {position && (
          <p>
            {position.lat.toFixed(4)}, {position.lon.toFixed(4)}
          </p>
        )}
        <button type="button" className="focusable">
          Get directions
        </button>
      </div>
    </GlassViewport>
  );
}
```

### Subpath entries

Pull only part of the surface if you don't need the rest:

```ts
import { useDpad, scoreRect } from "@glasskit-ui/react/hooks";
import { GlassViewport } from "@glasskit-ui/react/primitives";
```

## Design constraints

This library is built for the spec at
[wearables.developer.meta.com/docs/develop/webapps](https://wearables.developer.meta.com/docs/develop/webapps):

- 600 × 600 dp, single screen, no scrolling document
- Additive waveguide display — `#000` renders fully transparent
- D-pad / Neural Band input only — no touch, no cursor
- Min 14 dp text, 88 dp interactive height
- < 500 KB JS gzipped, < 3 s load on 4G, 60 fps, < 10 network requests

The hooks + components are factored to respect these constraints (no
re-renders on idle sensor streams, focus model that scores spatial
distance, sparse default styling).

## Testing

`pnpm --filter @glasskit-ui/react test` runs the unit suite (focus
scoring + sensor no-op guards). Pure helpers, no DOM dependency.

## Part of the GlassKit ecosystem

This is the free, open-source SDK. Need auth, a backend, payments, and
deploy wired in? Ship the whole production app with the
[GlassKit Starter Kit](https://glasskit.app).

## Documentation

Full docs, live 600×600 previews, and the component registry live at
[glasskit.app/ui](https://glasskit.app/ui).

## License

[MIT](./LICENSE)
