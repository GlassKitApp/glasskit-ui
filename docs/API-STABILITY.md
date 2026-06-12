# API stability — the road to 1.0

Status (2026-06): **0.x — stable in practice, pre-commitment.** This
document is what 1.0.0 will promise, and what still gates it.

## What is already treated as frozen

- **SDK exports** (`@glasskit-ui/react`): `GlassViewport`, `useDpad`,
  `seedFocus`, `getFocusables`, `FocusScope`, `scoreRect`, the sensor hooks
  (`useDeviceOrientation` / `useDeviceMotion` / `useGeolocation`),
  `useNeuralBand`, `useFeedback`/`buzz`, and the exported types. Additive
  changes only; renames/removals require a major.
- **The theming contract**: the accent ramp tokens
  (`--accent-active/--accent/--accent-muted/--accent-faint/--accent-grad-hi/
--accent-grad-lo/--accent-glow`) and the scoping rule (everything under
  `.glass-viewport`). New tokens may be added; existing ones keep meaning.
- **The focusable contract**: the `focusable` class, `data-autofocus`, the
  Enter/Space activation path, and the slider-owns-its-axis rule.
- **Prop vocabulary**: `emphasis` (visual weight) / `status` (semantic
  state) / `tone` (gradient palette). New components must use these words
  with these meanings.

## What 0.x still allows

- **Registry component props** may still get breaking renames (announced in
  the changelog; you re-vendor to update — your copy never breaks in place).
  The `tone`→`emphasis`/`status` consolidation was the big one; nothing else
  is planned.
- **CSS class names** (`gk-*`) are implementation detail, not API. Style
  overrides belong on the ramp tokens or your own classes.

## Versioning

- npm packages follow SemVer via Changesets; every release has a changelog.
- Registry components are unversioned source you own. Breaking changes land
  in the changelog under the SDK release that accompanies them.
- Deprecations: one minor of overlap with a JSDoc `@deprecated` pointer,
  then removal in the next major.

## What gates 1.0.0

1. **An on-device validation pass** — the focus engine, back gesture,
   ComposeFlow, and scroll behavior confirmed on real hardware (every other
   gate is met; this is the honest blocker).
2. No open correctness issues against the focus engine.
3. The platform wishlist reviewed: any API Meta shipped gets wired before
   the freeze, so 1.0 doesn't immediately deprecate a workaround.
