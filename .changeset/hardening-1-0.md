---
"@glasskit-ui/react": patch
---

1.0-hardening pass:

- **Long lists are cheap by default** — `gk-list-row` uses
  `content-visibility: auto` with an intrinsic placeholder size, so
  offscreen rows skip layout/paint while scroll metrics and focus-engine
  rects stay honest (near-free virtualization, no windowing library).
- **Cue is `role="status"`** — the screen's narration line announces
  politely to screen readers.
