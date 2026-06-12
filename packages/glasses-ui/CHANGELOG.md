# @glasskit-ui/react

## 0.3.0

### Minor Changes

- 465ebd5: The accent ramp is now the complete theming contract.

  Primary "on" surfaces (Button primary, Toggle on-track, Segmented on, Badge
  accent, Toast accent, Toaster action, ChatBubble me) hardcoded their blue
  gradient and depth shadow — retheming `--accent` recolored focus rings but
  left every filled surface blue. New tokens close the gap:
  - `--accent-grad-hi` / `--accent-grad-lo` — the primary-surface gradient stops
  - `--accent-surface` — the derived filled treatment (override the stops)
  - `--accent-glow` / `--accent-glow-strong` — the accent-tinted depth shadows

  Defaults are byte-identical to the previous literals, so existing apps render
  unchanged. Toasts portal outside `.glass-viewport`; when retheming, re-declare
  the grad stops on `:root` too so toast action buttons match the lens.

### Patch Changes

- 6880d7f: Visual composition pass across the stylesheet.
  - **Tabs**: selected and focused were pixel-identical (both white text +
    accent underline). Selected keeps the persistent underline; focused now
    shows the system focus ring/bloom like every other focusable.
  - **Toaster**: toasts no longer inherit a centered ancestor's text alignment
    (title floated mid-card inside a `<Screen>`); toast copy reads from the
    start edge.
  - **NotificationCard** and **LiveCaptions**: start-aligned — title beside the
    avatar, message preview, actions, and transcribed lines ragged-right like
    real notifications/captions instead of inheriting Screen's centering.

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
