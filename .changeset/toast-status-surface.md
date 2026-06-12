---
"@glasskit-ui/react": patch
---

Accent toasts no longer wear the primary-button treatment. The filled accent
gradient (`--accent-surface`) means "pinch me" and belongs to actions
(Button, Toggle, Segmented); `gk-toast--accent` now reads as an
accent-tinted status surface — a quiet fill from the faint end of the ramp,
an accent edge, and a soft underglow. Ramp-derived, so retheming still
carries it.
