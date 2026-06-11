# @glasskit-ui/react

## 0.2.0

### Minor Changes

- 6b2b7f3: Focus-engine quality pass + two new component styles.
  - **Sliders are now operable**: a focused `input[type=range]` owns
    ArrowLeft/ArrowRight (native value adjust) — the D-pad engine no longer
    preventDefaults the slider's own axis. Vertical arrows still navigate away.
  - **Zero-size elements are skipped**: `focusables()` filters collapsed/hidden
    elements, so spatial navigation and `seedFocus()` can no longer land focus
    on something invisible (e.g. an inactive Deck page).
  - New `styles.css` blocks for the registry's new `Timer` (`gk-timer`) and
    `EmptyState` (`gk-emptystate`) components.

## 0.1.1

### Patch Changes

- 1a930ae: styles.css: add `.gk-nav` screen-stack entrance styles for the new Navigator
  registry component (sub-200ms rise-in, reduced-motion fallback).
- 506e01e: Publish-readiness: add MIT `license` field + LICENSE file to the package,
  declare `engines.node >= 18`, and fix the `homepage` to `glasskit.app/ui`.
- a2454da: styles.css: bump the `.readout` label from 11px to 12px — the type ramp's
  floor for caps-tracked labels on the lens.
