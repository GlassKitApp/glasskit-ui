# GlassKit visual language — "premium surfaces" (owner-approved 2026-06)

The locked direction for rebuilding every component. Approved from the
`.context/mockups/surfaces.html` mockup. Apply all three skills on each
component: **impeccable** (craft/contrast), **design-taste-frontend** (taste),
**emilkowal-animations** (motion).

## The decision (supersedes strict additive purity)

The owner chose a **premium app-UI look over literal see-through-device truth**.
This intentionally relaxes the old "additive lens" rules in `AGENTS.md` /
`apple-feel.md` (pure `#000`, no fills, no gradients, no shadows). Those remain
useful history; this doc wins where they conflict.

**The rule of three:**
1. **Background stays calm** — a deep near-black base (`#0b0e16` → `#090b11`,
   with a faint cool radial highlight up top). Never a loud gradient bg.
2. **Surfaces pop** — cards, rows, pills, buttons are real surfaces: a subtle
   top-lit gradient fill, a 1px light top edge (specular), and a soft depth
   shadow. They lift off the base; they are not flat hairline boxes.
3. **Icons get tasteful gradients** — app/hero glyphs sit on a **gradient
   squircle plate** (iOS/Meta home-screen style): distinct per-app gradient,
   white stroke glyph, inner top highlight, soft colored shadow.

## Tokens

- **Base:** `--lens-bg: radial(cool highlight top) + linear(#0b0e16→#090b11)`.
- **Surface:** fill `linear(rgba(255,255,255,.08)→.028)`, edge
  `1px rgba(255,255,255,.10)`, lift `inset 0 1px 0 rgba(255,255,255,.14),
  0 14px 30px -18px rgba(0,0,0,.85)`. Radii: cards/plates 19–22px, pills full.
- **Gradient icon palette** (6 tasteful, ~150° angle): nav/maps blue
  `#5b9dff→#2f5fe0`, msg green `#3fe0a3→#11a36f`, music `#ff7eb3→#ff8a5b`,
  camera violet `#b08bff→#7C3AED`, location cyan `#36d6ee→#0e8fc7`, captions
  amber `#ffd66b→#f5a623`. Plate: inner `0 1px 0 rgba(255,255,255,.32)` highlight
  + soft colored drop shadow. Glyph: white, 2px stroke, round caps.
- **Type:** system SF. Title 30–38/700, readout 25–40/700 tabular, body 15–18/
  500–600, label 12–13 caps tracked dim. Value = the one bright thing.
- **Ink:** `#fff` / `#9aa3b5` / `#7c8498`.
- **Accent (UI, non-icon):** blue `#4c8dff`; focus/on-state + soft glow.

## Motion (Emil)

Ease-out `cubic-bezier(0.23,1,0.32,1)`, sub-200ms focus/state, press
`scale(0.97)` ~140ms, surfaces lift slightly on focus. Stagger grid/list
entrances. `prefers-reduced-motion: reduce` → opacity/instant fallback. Mandatory.

## Preview tile

The docs preview is now a **calm dark device tile** (rounded, device shadow) —
the component renders on its own dark base. The earlier world-behind photo
composite (`scene` prop, screen-blend, `public/world/` assets) has been removed.

## Per-component application

- **GlowIcon:** gains a `plate`/gradient mode (gradient squircle + white glyph)
  for app/hero use; small inline glyphs stay plain white stroke.
- **Launcher:** app grid of gradient icon plates + labels; focus lifts the plate.
- **List/ListRow:** rows become popping surfaces (or a grouped surface with
  dividers); leading gradient glyph, trailing value/chevron.
- **Readout/StatGrid/Meter:** big value on the calm base; optional surface card.
- **Button/Confirm/QuickReplyChips:** popping pill/surface, press scale, primary
  gets an accent-gradient fill.
- **Toggle/Stepper/Segmented:** surface controls; accent-gradient on-state.
- **Card-bearing (Toast/Callout/Badge/Cue):** surface treatment, soft depth.
- **Toasts & notifications:** the dynamic system is `<Toaster>` + `toast()`, built
  on **Sonner** (Emil Kowalski's lib), themed to the surfaces and **bottom-anchored**
  (below the sightline, device-accurate; configurable). Sonner portals to the
  window edge, so the `.gk-toaster__*` theme is intentionally **unscoped** (it
  can't live under `.glass-viewport`). `NotificationCard` is the inline/static
  notification surface; `Toast` is the static one-liner; `Toaster`/`toast()` shows
  them live. Comms/Media/AI surfaces (Avatar, NotificationCard, NowPlaying,
  AssistantOrb) follow the same calm-base + pop-surface + gradient-plate rules.
- **Spatial (Compass/DirectionArrow/Reticle/Pin):** hero gradient plate / accent
  with soft bloom; world-anchored, never mirrored (RTL-safe).
