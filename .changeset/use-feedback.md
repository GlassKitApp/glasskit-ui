---
"@glasskit-ui/react": minor
---

`useFeedback()` / `buzz()` — the haptic seam. Dispatches a
`glasskitfeedback` CustomEvent and calls `navigator.vibrate` where the UA
supports it; no haptics API reaches Display web apps yet (see the platform
wishlist), so call it at interaction points and every call site lights up
the day one ships. SSR-safe, no-ops gracefully.
