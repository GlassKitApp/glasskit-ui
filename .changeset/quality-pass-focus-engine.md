---
"@glasskit-ui/react": minor
---

Focus-engine quality pass + two new component styles.

- **Sliders are now operable**: a focused `input[type=range]` owns
  ArrowLeft/ArrowRight (native value adjust) — the D-pad engine no longer
  preventDefaults the slider's own axis. Vertical arrows still navigate away.
- **Zero-size elements are skipped**: `focusables()` filters collapsed/hidden
  elements, so spatial navigation and `seedFocus()` can no longer land focus
  on something invisible (e.g. an inactive Deck page).
- New `styles.css` blocks for the registry's new `Timer` (`gk-timer`) and
  `EmptyState` (`gk-emptystate`) components.
