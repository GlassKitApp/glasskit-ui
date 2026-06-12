---
"@glasskit-ui/react": patch
---

Visual composition pass across the stylesheet.

- **Tabs**: selected and focused were pixel-identical (both white text +
  accent underline). Selected keeps the persistent underline; focused now
  shows the system focus ring/bloom like every other focusable.
- **Toaster**: toasts no longer inherit a centered ancestor's text alignment
  (title floated mid-card inside a `<Screen>`); toast copy reads from the
  start edge.
- **NotificationCard** and **LiveCaptions**: start-aligned — title beside the
  avatar, message preview, actions, and transcribed lines ragged-right like
  real notifications/captions instead of inheriting Screen's centering.
