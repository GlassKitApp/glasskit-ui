# Platform audit — Meta Ray-Ban Display Web Apps vs GlassKit UI (2026-06-11)

Audit of every GlassKit assumption against the current platform: the official
Web Apps docs (wearables.developer.meta.com/docs/develop/webapps + /build,
/test, /troubleshooting), Meta's toolkit repo
(facebookincubator/meta-wearables-webapp, read in full), the wearables FAQ,
and Meta-engineer replies on the toolkit issue tracker. Platform state:
Developer Preview (opened 2026-05-14), glasses OS v125.1.

## Confirmed correct — no changes needed

| GlassKit assumption                                                                         | Platform reality                                                                                                                    | Source                              |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| D-pad = `ArrowUp/Down/Left/Right` keydown, select = `Enter` (`useDpad`)                     | Exactly the official mapping: `DPAD = { UP:'ArrowUp', …, SELECT:'Enter', BACK:'Escape' }`; swipes/captouch translate to these       | /build                              |
| Focus-based input, no cursor/touch/hover                                                    | "No continuous cursor support"; no mouse/touch/keyboard                                                                             | /build                              |
| 600×600 fixed surface, no scrolling document (`GlassViewport`)                              | "600×600px fixed viewport", `overflow:hidden` body                                                                                  | /build                              |
| Additive display — `#000` renders transparent; surfaces need dark-gray fills to read opaque | "Black pixels render transparent"; toolkit prescribes `#0a0a0f`–`#1C1E21` surfaces — our premium-surfaces direction is exactly this | /build + toolkit display-guidelines |
| Sensors: `deviceorientation`/`devicemotion`/`geolocation` (auto-wired components)           | All officially supported; GPS proxied from the phone (5–50 m, slow first fix)                                                       | /build                              |
| `TextField` is display-only (no keyboard)                                                   | "Text Input" officially unsupported                                                                                                 | /build                              |
| `Dictation`/`LiveCaptions`/`Viewfinder` display-only                                        | Camera + microphone officially unsupported ("not yet")                                                                              | /build                              |
| `fb-viewapp://web_app_deep_link?appName=&appUrl=` QR flow                                   | Still the current install path; HTTPS mandatory                                                                                     | /test                               |
| Permission requests behind a user gesture (`PermissionPrompt` pattern)                      | Required: "triggered by user gestures … not automatically"                                                                          | /build                              |
| List rows sized near 88px                                                                   | Official minimum interactive height is 88dp                                                                                         | toolkit display-guidelines          |

## Fixed in this PR

1. **Back navigation is real — shipped in glasses OS v125.1 (~2026-06-05).**
   The system back gesture (middle-finger pinch) pops **browser history** and
   the page receives **`popstate`** — only when a history stack exists; at an
   empty stack the gesture falls through to the system menu. `Escape` keydown
   is the _desktop simulator_ mapping only — it is **not delivered
   on-device**. (Meta engineer, toolkit issue #12, 2026-06-10; the /build
   page's "Back Navigation unsupported" line is stale per the same thread.)
   → New **`<Navigator>`** (`registry/ui/navigator.tsx`): in-memory screen
   stack where push = `history.pushState`, back (gesture, Escape in dev, or
   `pop()`) flows through one path: history → `popstate` → stack.
   `useBackHandler` lets overlays consume back (Android BackHandler
   contract); at the root the gesture escapes to the system.
2. **Required web-app meta tags** on the `/preview/*` glass routes:
   `<meta name="viewport" content="width=600, height=600, initial-scale=1,
user-scalable=no">` (was `device-width`) and
   `<meta name="mrbd-web-app-capable" content="yes">` (toolkit requirement
   added 2026-06-05).
3. **`useNeuralBand` reality check documented.** The FAQ is explicit: web
   apps get swipes/pinch only as arrows/Enter — "no ability to do custom
   gestures from the Neural Band." Nothing dispatches a `neuralband`
   CustomEvent on-device today; it is a forward-compat seam. Deck's JSDoc now
   says so and points at on-device-safe paging. (The SDK hook itself is
   frozen API — its docs ship with the next SDK release.)

## Known deviations — deliberate, owner-approved design

- **Toast anchoring**: Meta's pattern doc anchors toasts 24dp from the _top_;
  GlassKit anchors bottom-center (meta-hud-language.md, "below the
  sightline"). Keeping ours — revisit only with on-device evidence.
- **Focus treatment**: Meta's reference shows a cyan ring + container
  scale-down with 300–625ms curves; GlassKit uses the blue accent ring +
  bloom with sub-200ms motion per meta-hud-language.md. Their guidelines are
  recommendations, not enforcement.
- **Background**: toolkit wants pure `#000` page background (full
  transparency); GlassKit's premium-surfaces base is near-black
  (`#0b0e16→#090b11`) by explicit owner decision (2026-06). The base still
  reads ~transparent at 2% light leak; surfaces follow Meta's own dark-gray
  guidance.

## Watchlist (platform gaps that could move under us)

- **Browser engine/UA/devicePixelRatio**: undocumented anywhere — keep
  feature-detecting, no engine-specific code.
- **Offline/service workers**: docs say unsupported, toolkit ships a SW
  example — contradiction unresolved; don't depend on SW.
- **Escape on-device**: if Meta ever delivers it as keydown too, Navigator
  already handles both paths idempotently (Escape routes through
  `history.back()`).
- **Camera/mic/WebXR/notifications**: requested by the community, all open.
  `Viewfinder`/`Dictation` become wireable the day MediaDevices lands.
- **Performance budget**: <500 KB JS gzipped, <3 s on 4G, 60 fps, ≤128 MB —
  worth a CI bundle-size check before the registry markets "device-ready".
