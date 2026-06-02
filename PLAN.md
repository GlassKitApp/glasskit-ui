# GlassKit Ecosystem — Open-Source SDK + Registry (`glasskit-ui`)

## Context

GlassKit sells a $299/$1,299 boilerplate for building Meta Ray-Ban Display apps,
but the funnel is broken: "no one is willing to pay $299 at the moment." The
diagnosis is a **top-of-funnel / trust / distribution problem**, not a
missing-products problem. Building three peer products at once (design system +
no-code builder + boilerplate) risks producing three half-finished things.

**Strategy (agreed):** Extract one genuinely-best free thing — the SDK + a
shadcn-style component registry — and reposition the paid boilerplate as the
**premium production app you build on top of the free SDK.** The only defensible
moat today is the 5 Neural Band / sensor hooks: nobody else has a real SDK for
this platform. Own the *category* (the canonical way to build for Ray-Ban
Display), don't compete on generic components.

**Funnel after this work:** dev finds the only real Ray-Ban Display SDK (free,
npm + `npx` registry) → builds a toy → hits the wall (auth, backend, payments,
deploy, AI demos) → buys the boilerplate that solves all of it. One funnel, one
real wall. Studio (the pay-per-use no-code QR-publish builder) and the
boilerplate both consume the same component library — which is exactly why the
library must come first.

## Decisions locked (from brainstorming)

| Decision | Choice |
|---|---|
| Altitude | One free SDK foundation first; boilerplate repositioned on top; Studio is a downstream consumer (out of scope here) |
| Component model | Headless logic where real logic exists + styled layer; styled components **vendored via shadcn-style registry** (you own/restyle them) |
| Packaging | npm package `@glasskit/glasses-ui` (hooks + primitives + base styles) consumed as a dependency; styled components + blocks distributed via registry (single default accent, no preset palettes) |
| Repo | **New public monorepo `glasskit-ui`** → publishes to npm; boilerplate switches to consuming it |
| Site | Separate **`ui.glasskit.app`** = the monorepo's own Next.js + fumadocs site, fully open source (docs co-located with components). `glasskit.app` (this `adelaide` repo) stays the closed marketing/sales/Studio funnel |
| Docs | fumadocs (already proven in this repo; reuse the setup) |

## Competitive landscape & positioning (deep research, 2026-06, verified+cited)

**The React UI layer is wide open.** Meta's Wearable Device Access Toolkit (dev preview)
ships only native Swift/Kotlin UI primitives *or* "standard HTML/CSS/JS" web apps deployed
**via a URL**, "no proprietary framework" — focus via a manual `.focusable` CSS class,
scaffolding via raw skills (create-webapp/add-screen/add-button), **no React, no component
abstraction.** Therefore: (1) the ergonomic React component+hook+focus layer is unowned —
our lane; (2) the official runtime *already uses `.focusable`*, so GlassKit must be a
**superset of Meta's convention**, not a fork of it; (3) "deploy via URL" validates the
QR-to-glasses Studio vision. [developers.meta.com/blog/build-for-display-glasses;
facebookincubator/meta-wearables-webapp]

**Correction #1 — sensor hooks are pure commodity.** orientation/motion/geo are duplicated
across react-use (44k★), @uidotdev/usehooks (884k wk dl), ahooks (2.7M mo dl). Reach
*parity*, don't headline them. Mild parity-plus: usehooks-ts ships none and
@uidotdev/usehooks lacks device-motion — so a complete polished trio (incl. motion) is a
quiet edge.

**Correction #2 — the focus engine has real prior art.** Norigin Spatial Navigation (React
`useFocusable` + directional scoring), BBC lrud-spatial, react-tv-space-navigation are
mature — but all target TV remotes/CTV, are often markup/DOM-attribute-driven (not
React-idiomatic), and **none** target glasses / fixed 600×600 / pinch-swipe. W3C CSS
Spatial Navigation is a dead 2019 draft, never shipped — a JS engine is still needed. Moat
= **execution + React-hook DX + glasses/gesture tuning**, not novelty. Benchmark `useDpad`
against (consider building on) Norigin/LRUD rather than reinventing the scoring.
[NoriginMedia/Norigin-Spatial-Navigation; bbc/lrud-spatial; w3.org/TR/css-nav-1]

**No direct UI-kit competitor.** Horologist is Wear-OS-only, explicitly "not a
general-purpose design system"; @react-three/uikit renders 3D WebGL (Yoga-in-three.js),
not 2D DOM. Nobody owns the 2D additive-display glasses DOM library. [google/horologist;
pmndrs/uikit]

**Registry derisked.** shadcn CLI v4 (2026-03) supports namespaced registries;
@react-three/uikit already ships a shadcn-style `npx … add` registry (default kit "based on
Shadcn"; "horizon-kit based on Meta Horizon OS UI Set / RLDS" — a design-language reference
worth a look). [ui.shadcn.com/docs/registry/namespace; pmndrs/uikit]

**No glasses emulator exists.** Closest are Chrome DevTools Sensors (orientation/geo) + the
Android Wear emulator — neither simulates D-pad + Neural Band in a 600×600 additive frame.
Build ours *on top of* DevTools Sensors / Web APIs where possible, not from scratch.

**Revised headline (what we actually lead with):** NOT "5 hooks + a stylesheet." Lead with
the **dev loop + the unowned React layer** — a glasses-tuned focus engine (superset of
Meta's `.focusable`), the exclusive Neural Band gesture vocabulary, the in-browser emulator
powering live docs previews, a cohesive component system, and an `npx` registry. Sensor
hooks ship as polished table-stakes, not the pitch.

## Source of truth for current code

The current `@glasskit/glasses-ui` source is **locally available** at
`/Users/jarrius/Documents/GitHub/glasskit-boilerplate/packages/glasses-ui` (the boilerplate
is a pnpm + turborepo: `app/` Vite glasses app, `companion/` Next.js, `packages/{glasses-ui,
backend}/`, `docs/`). The package is tiny and clean — **5 source files + 2 test files** — so
extraction is low-risk:
- `src/GlassViewport.tsx`, `src/dpad.tsx` (useDpad, scoreRect, seedFocus, Dir),
  `src/sensors.ts` (the 4 sensor/gesture hooks + orientationEqual/motionEqual),
  `src/index.ts`, `src/styles.css`
- `src/dpad.test.ts`, `src/sensors.test.ts` — **tests already exist**; extraction inherits them.

API surface to preserve verbatim:

- **Primitive:** `<GlassViewport frame?>` (600×600 root)
- **Hooks:** `useDpad()`, `useNeuralBand()`, `useDeviceOrientation()`,
  `useDeviceMotion()`, `useGeolocation()`
- **Helpers:** `scoreRect(cur, cand, dir)`, `seedFocus()`, `orientationEqual()`, `motionEqual()`, `type Dir`
- **Stylesheet classes:** `.glass-viewport(.--frame)`, `.screen`, `.focusable`,
  `.app-head`, `.row`, `.readout`, `.label`, `.dim`, `.cue-script/.cue-line/.cue-bar`,
  `.launcher/.launcher-grid/.launcher-card(.__label/.__tagline)`
- **Theme tokens:** `--color-bg:#000` (must stay black), `--color-ink`,
  `--color-ink-dim`, `--color-accent` (phosphor green, swappable), `--color-surface`,
  `--color-rule`, `--color-room`, `--font-sans`

## What the actual source reveals (read 2026-06) — resolves most of the #1 risk

- **Sensor hooks are thin wrappers over standard W3C Web APIs** — `deviceorientation`/
  `devicemotion` window events; `navigator.geolocation.watchPosition` (paired phone's GPS).
  Source asserts *"The Display's Web Apps platform exposes standard W3C sensor APIs — no
  proprietary SDK."* Matches Meta's web path, but **asserted, not independently verified** →
  confirm on real hardware.
- **D-pad = arrow keys + Enter on `.focusable`** — *exactly* Meta's documented web
  convention. GlassKit is **already a superset of Meta's `.focusable`**, not a fork. Solid.
- **Neural Band pinch/swipe = a GlassKit-defined `neuralband` CustomEvent seam** —
  `useNeuralBand` listens on `window`; on-device, *something must dispatch it*. That bridge
  is the one genuinely unconfirmed piece → the focus of Phase 0.
- **`scoreRect` is a v0** — center-to-center + 2× perpendicular-drift penalty, 1px
  threshold; no edge-distance, containers/groups, wrap, or overlap (which Norigin/LRUD do).
  Confirms the plan: **benchmark vs Norigin/LRUD, then harden ours or build on theirs.**

## Architecture — the `glasskit-ui` monorepo

```
glasskit-ui/                      # NEW public repo, pnpm + turborepo
  apps/
    web/                          # Next.js + fumadocs → ui.glasskit.app
      app/(marketing)/page.tsx    # landing (hero = live emulator), CTA → /create
      app/(marketing)/create/     # the ui.shadcn.com/create analog (component picker)
      content/docs/               # migrated + expanded from adelaide/content/docs
      app/(docs) ...              # reuse adelaide's fumadocs wiring; live previews via emulator
      app/r/[...]/route.ts        # registry endpoints (/r/*.json)
  packages/
    glasses-ui/                   # the published npm package @glasskit/glasses-ui
      src/
        primitives/               # GlassViewport, Screen
        hooks/                    # the 5 hooks + scoreRect/equal helpers (unchanged API)
        components/               # styled+headless components (see inventory)
        ai/                       # AiResponse state machine (headless) + styled view
      styles.css                  # base stylesheet + @theme tokens
      package.json                # exports map, "@glasskit/glasses-ui" + subpaths
    cli/                          # `glasskit` CLI — add/init/create (vendors from the registry)
  registry/
    registry.json                 # shadcn-format-compatible index (served by apps/web; read by the glasskit CLI)
    ui/                           # registry:ui  — styled component source (vendored)
    blocks/                       # registry:block — generic patterns (confirm-flow, wizard, captions-view, launcher, ...)
  skills/                         # GlassKit agent skills (npx skills add) — glasskit-builder, glasskit-review
```

The boilerplate repo then **removes its local `packages/glasses-ui`** and depends
on the published `@glasskit/glasses-ui`; its demo apps become registry blocks.

## npm package vs registry — the split

- **npm `@glasskit/glasses-ui` (never-touch dependency):** the 5 hooks +
  `GlassViewport` + `scoreRect`/equality helpers + base `styles.css`/tokens. This
  is the SDK logic — the moat. Subpath exports so consumers can pull just hooks.
- **Registry (vendored, you own it):** styled components + generic blocks —
  added via the **GlassKit CLI**: `npx glasskit add <name>` (own branded command — **no
  `npx shadcn` in our docs/UX**). The registry JSON stays shadcn-*format*-compatible under
  the hood purely for interop (agents/tools that grok the schema can consume it as a
  fallback), but our CLI is the only documented path. `ui.shadcn.com/create`-style flow:
  pick components and scaffold. (No multi-palette preset system — one default accent,
  overridable via a token; see "Apple feel" below.)

**Headless-vs-styled policy (engineering honesty, not dogma):** split out
headless logic *only where real logic exists* — focus participation
(`FocusableButton`), async state (`AiResponse`), gesture/step machines
(launcher + pinch-advance). Pure-display pieces (`Readout`, `StatGrid`,
`StatusLine`, `CueScript`) ship styled-only; forcing a headless layer on a
number+label is over-engineering.

## Component inventory — derived from first principles (the 8 jobs of a HUD)

**Not** derived from the six demos (those exercise only 3 of the 8 jobs — Monitor,
Navigate, Guide — and have zero captions, comms, capture, annotate, or launch UI).
Derived from what a glanceable, hands-free, world-overlaid display fundamentally does.
Cross-checked against the mature wearable landscape (watchOS / Wear OS), which
independently lands on the same archetypes — strong validation, and a source of familiar
naming/conventions to borrow for the spine.

**The 8 jobs → archetypes:** Monitor · Navigate · Guide · Caption · Notify/Comms ·
Capture/Control · Annotate · Launch/Select.

### Design approach — port from watch UI kits, re-skin for glasses
~80% of the taxonomy (spine + status + display + action) overlaps with smartwatch UI.
This is a **build strategy, not a marketing angle**: use mature watch UI kits as the
reference blueprint instead of designing ~28 components from a blank page. The design
phase starts from a **watch-kit → glasskit component mapping matrix**, then adapts each.

Reference kits to port from (patterns / API ergonomics / naming — implement fresh):
- **Wear OS / Jetpack Compose (Horologist)** — closest analog. Stepper, Chip/ToggleChip,
  Confirmation, Alert, Card, CircularProgressIndicator, PositionIndicator, TimeText
  (status bar), list scaffolds → covers most of our spine + action set.
- **watchOS / SwiftUI** — List, vertical-paging TabView (≈ Deck/Stack), Gauge,
  ProgressView, Toggle, notification short/long-look (≈ NotificationCard
  collapsed/expanded), quick replies, the "complication" glanceability mindset.

**Borrow:** component vocabulary/naming, page/stack navigation, confirmation & alert
flows, quick-reply chips, glanceability/density discipline (their HIGs already encode
"one task, max N elements"), declarative slot-based API shape.

**Don't borrow (the ~20% that's ours):** the input layer (watch = touch + rotary crown →
ours = D-pad `scoreRect` + Neural Band), the visual system (opaque/curved → additive/flat,
glow not fills), round-screen-only ideas (curved text, vignette). Caveat: these kits are
native (SwiftUI/Compose), not React — port *patterns*, not code; concepts/naming aren't
copyrightable, build fresh.

**The ~20% that's uniquely ours (the reason it isn't "just a watch kit"):** additive
visual system, spatial/world-anchored components (DirectionArrow, Compass, Pin, Callout,
Reticle), and the spatial-focus input model.

**Internal north star:** GlassKit UI = a shadcn-style watch UI kit for see-through
glasses — same glanceable mentality, plus a spatial-focus input model and an AR layer.

### Registry `ui` components (~28, archetype-complete)
- **Shell & focus:** GlassViewport, Screen (status/stage/cue regions), Stack
  (one-screen-at-a-time router), Focusable + useDpad, FocusGroup
- **Status & async:** StatusBar, StatusDot (sensor/permission/connection), AsyncView
  (placeholder→loading→data/error), Toast, ErrorState
- **Display:** Readout, StatGrid, Cue/Caption, Heading, Badge, Progress
  (linear/step-of-N/countdown), Meter (bounded gauge), GlowIcon
- **Action & choice:** Button/ActionBar, List/Menu, Tabs/Segmented, Toggle, Stepper,
  OptionGroup, Confirm (decision screen), QuickReplyChips (no keyboard)
- **Spatial / world-anchored (glasses-only moat):** DirectionArrow/Bearing, Compass
  (heading tape), Pin/Waypoint, Callout (world label), Reticle (aim-to-select)
- **Navigation:** Launcher (app grid), Deck/Wizard (+ StepDots, pinch-advance)

**Spine** (≥4 archetypes, every app pulls it): Screen, StatusBar, Focusable/useDpad,
AsyncView, Readout, Cue, Progress, Button, List, GlowIcon.

**Headless-vs-styled:** split out logic only where it exists — focus (Focusable,
FocusGroup), async (AsyncView), gesture/step machines (Deck, Launcher, Stepper). Pure
display (Readout, StatGrid, Cue, Meter, Badge) ships styled-only.

### Deliberately NOT built (the medium forbids it)
Text inputs/keyboards (text = voice, a platform job) · tables/data grids ·
hover/tooltips/context menus · drag-drop/resizable panels · fine sliders (use Stepper) ·
scroll-heavy lists (paginate) · minimaps · stacked modals · **glassmorphism / backdrop-blur
on the additive lens** (no backdrop to refract; translucent fills wash out). The components
get the Apple feel via *emitted light*, not blur — see `docs/design/apple-feel.md`. (Real
Liquid-Glass is allowed on the website chrome only, never on the 600×600 lens.)

### Accent color — one default, no preset system (revised 2026-06-01)
**Dropped the multi-palette `registry:theme` presets.** The additive look leads with a single
phosphor-green accent (`--color-accent: #36e27f`), overridable for free by re-declaring the
token in a consumer `@theme` block. `--color-bg` stays `#000`. (A palette picker can return
later if there's demand — it's past the kill-gate, not MVP.) Full token set — accent
tints/dims, ink-on-black scale, hairline/glow specs — in `docs/design/apple-feel.md` §4.

### Registry `blocks` — generic patterns only (never named demos)
`confirm-flow`, `wizard`, `captions-view`, `launcher-home`, `stat-dashboard`,
`incoming-call`, `nav-arrow` — app-agnostic skeletons a developer (or Studio) fills in.
The six demo apps ship separately as a docs `/examples` gallery — learning material,
not registry items.

## Docs site (fumadocs at ui.glasskit.app)

Reuse this repo's proven fumadocs setup (`source.config.ts`, `lib/source.ts`,
`app/(docs)`, Orama `/api/search`). Migrate `glasses-ui.mdx`, `theming.mdx`,
`demos.mdx` as the seed; add per-component pages with live 600×600 previews and a
**accent/token styler** page (tweak the single accent + emit copy-paste tokens) to satisfy
the "match docs with the components themselves" requirement — docs and component
source live in the same repo.

## ui.glasskit.app — site design & pages

One Next.js app (`apps/web`) serving landing + docs + create + registry. Built with the
**ui-ux-pro-max** + **frontend-design** skills at implementation time for a distinctive,
polished ("sweet and sick") result — not generic AI aesthetic.

**Pages:**
- **Landing (`/`)** — hero leads with the moat: a **live in-browser glasses emulator**
  running a real 600×600 demo (the hero *is* the product), then focus engine + Neural Band
  + registry + `npx` DX. Primary CTA → `/create`.
- **`/create`** — the `ui.shadcn.com/create` analog: pick **components**, preview live in the
  emulator, copy the `npx glasskit add …` command / scaffold. The funnel's first conversion
  step. (No preset palette picker — one default phosphor-green accent, overridable via a token.)
- **`/docs`** — fumadocs; component pages with **live previews via the emulator**.
- **Registry** (`/r/*.json`).

**Design system:**
- **Glasskit theme** (additive/phosphor) as default, **switchable light/dark** via
  `next-themes`. The additive look is inherently dark — light mode is a *deliberate
  translation* of the aesthetic, **NOT** an inversion of `.fov`; design it as its own
  palette. Unify with the docs' existing fumadocs light+dark token set.
- **Liquid Glass for the site & emulator *chrome* (NOT the lens).** Apple's WWDC-2025
  "Liquid Glass" (refraction/lensing + specular highlights + translucency; web via
  `backdrop-filter` + SVG `feDisplacementMap`, Chromium-full / graceful degrade) is the
  right futuristic look for the **website, docs, `/create`, and the emulator bezel** — opaque
  screens where it shines, and on-brand for "GlassKit". **Hard rule: it stops at the lens.**
  The 600×600 on-device components (and their docs previews) stay **additive** — a
  see-through display has no backdrop to refract, and translucent fills break the additive
  medium + battery. Design story: **the frame is Liquid Glass; the light inside the lens is
  additive.** Reference OSS: nikdelvin/liquid-glass, rdev liquid-glass-react. Still no inline CSS.
- **shadcn/ui for the *site chrome*** (nav, buttons, dialogs, tabs, the create-picker) —
  repo already uses shadcn (`components.json`, base-nova). **Distinct from** the ~28
  glasskit-ui *product* components (the additive-display library being documented).
- **No inline CSS** — Tailwind v4 `@theme` tokens + semantic classes only; no `style={{}}`.
- **React/Next best practices** — RSC/server-component-first; client components only where
  needed (emulator, theme toggle, create-picker); follow `node_modules/next/dist/docs/`
  (modified Next 16) + vercel-react-best-practices / next-best-practices guidance.

### GlassKit UI's own "Apple feel" — one look, two surfaces (revised 2026-06-01)

The target is **Apple-Watch-grade crisp/clean/modern, premium** — and on a see-through additive
display that look and *renders-correctly-on-real-glasses* are the **same** design (watchOS is
itself a black-OLED, emitted-light, glanceable system; chasing the Apple-Watch feel pushes us
*toward* on-glasses correctness, not away). So the component library has **ONE look:
`additive`** — premium via *emitted light* (luminous hairline edges, specular-style highlights,
soft glow depth, concentric rounded "lens" geometry — the Apple feel **without**
backdrop-filter), rendered correctly on the lens. **The earlier dual-skin (`glass` +
`additive`) model is dropped** — there is no separate literal-glassmorphism component skin to
maintain. The full, cited spec (tokens, type ramp, hairline/glow recipe, focus ring, motion,
watchOS→GlassKit mapping) lives in **`docs/design/apple-feel.md`** — the source of truth the
components are built to.

The honest physics line still holds: **literal backdrop-blur glassmorphism cannot render on the
additive lens** — black stays black, no backdrop to refract, a frosted panel becomes washed-out
gray; components that look glassy in-browser but break on-device = trust dies on first deploy.
That is *exactly why* the components are emitted-light, not glassy.

- **The lens (the 600×600 components): `additive` only.** Emitted-light premium — no blur, no
  translucent fills, no scrims. A single phosphor-green accent carries all emphasis on black.
- **The website (landing / docs / `/create`): real Liquid Glass is fine** — opaque screens have
  a real backdrop. Go all in for the "I NEED that" moment (refraction, specular, depth) + the
  glasskit accent + Apple type. **Hard rule: Liquid Glass stops at the bezel; it never touches
  the lens.**
- **Typography ("modern Apple font").** SF Pro is Apple-licensed (Apple-platform UIs only —
  can't ship on web). Website: `system-ui`/`-apple-system` → Apple-device visitors get *real* SF
  free, **Inter**/**Geist** fallback. Lens: bundle one deterministic UI-tuned face (Geist/Inter,
  or SF Rounded if the runtime is Apple-licensed) — see the design reference §7.
- **References:** see `docs/design/apple-feel.md` §10 — 41 cited sources (watchOS HIG, SF
  typography, WWDC25 Liquid Glass, OLED color/motion).

## Three component layers in the repo (don't conflate)

All three live in the public monorepo (everything is open source), but they are distinct:
1. **`packages/glasses-ui` — the product.** The ~28 additive-display glasses components +
   hooks. Published to npm + offered via the registry. What users build *glasses apps* with.
2. **`apps/web/components` — the website's own components.** Builds the **landing page**
   (hero, feature grid, CTA, footer, nav) and the **create page** (component picker/checklist,
   copy-command box, emulator preview pane). Built from **shadcn/ui** primitives +
   custom composition (like `adelaide`'s `components/landing/*` today). Open source, but
   *app-local* — NOT published to npm, NOT registry items.
3. **`registry/` — vendored building blocks.** Glasses `ui` components + generic `blocks`
   pulled via `npx`. Glasses building blocks, not website furniture.

So the landing and create pages **do** have their own components, in the repo, fully open
source — layer 2, distinct from the published glasses library (layer 1) and the registry
(layer 3). The create page's component-picker + emulator-preview core is the seam Studio reuses.

## Funnel mechanics — OSS → Starter Kit (→ Studio)

The ecosystem is a **value ladder**, not three peers: **GlassKit UI (free) → Starter Kit
($299) → Studio (pay-per-use, coming).** Free tier builds adoption + goodwill; the wall converts.

**The wall (why people pay):** GlassKit UI is *frontend-only* — components, hooks, focus
engine, emulator. The moment a dev needs a real app they hit auth (Clerk), backend + realtime
DB (Convex), payments (Stripe), a companion marketing site, deploy + CI, and the 6 AI-wired
demos. **That's the Starter Kit.** Studio is the same ladder for no-coders (generate +
QR-publish, pay per use).

**Concrete touchpoints (build these, don't just "link out"):**
- **Contextual "graduate" callouts in ui.glasskit.app docs** — on any page touching what the
  Starter Kit solves (auth/backend/payments/deploy/AI): "Components are free; ship the whole
  production app with the Starter Kit." → glasskit.app.
- **`/create` upsell** — after picking components: "Want auth + backend + payments
  wired in? Start from the Starter Kit."
- **`/examples` gallery** — each demo labeled "1 of 6 fully-wired demos in the Starter Kit."
- **npm README + post-`npx` CLI note** — "Built with GlassKit UI. Ship the full app with the
  Starter Kit."

**glasskit.app landing redesign (THIS `adelaide` repo) — present TWO products as a ladder.**
Today it sells only the boilerplate. Restructure hero + nav to tell the ecosystem story:
**GlassKit UI (free, open source — CTA: docs / npm / GitHub → ui.glasskit.app)** and the
**Starter Kit (paid, production — CTA: buy)**, Studio teased as "coming". **Risk:** two
products can muddle the page and split conversion — frame as one ascending ladder (free →
paid → usage), NOT two competing CTAs. Update `lib/config.ts`, landing components, nav.
Deferrable; ships once GlassKit UI is live.

## SEO & agent/LLM visibility — "agent-native distribution"

A dev tool in 2026 wins top-of-funnel by being the thing **AI coding agents reach for**, not
just by ranking on Google. First-class moat pillar (ties to DX).

**Classic SEO:** Next.js Metadata API per page, semantic HTML, sitemap.xml + robots.txt,
OG/Twitter cards, canonical URLs, strong Core Web Vitals, JSON-LD (reuse adelaide's
`lib/structured-data.ts`): `SoftwareApplication`, `SoftwareSourceCode`, `TechArticle`,
`FAQPage`, `BreadcrumbList`. Own the category keyword ("Meta Ray-Ban Display UI / SDK").

**Agent-native (the differentiator):**
- **`llms.txt` + `llms-full.txt`** — fumadocs has built-in support; clean LLM-readable map +
  full-text of the docs.
- **Per-page Markdown** — serve `/docs/<x>.md` + a "copy as Markdown / open in Claude"
  affordance so agents ingest clean source.
- **A GlassKit MCP server** — expose component docs + the registry over MCP (shadcn ships a
  registry MCP) so agents can query usage and **scaffold components autonomously**.
- **`npx glasskit add` installability** + clear `AGENTS.md`/READMEs in repo and scaffolded
  output, so agents in a *consumer's* repo understand and wire GlassKit. Stable canonical
  component URLs for citation. Seeds Studio (agents that "know" GlassKit generate better apps).
- **Installable agent skills** (the Chakra-UI model) — ship Claude Code `SKILL.md` bundles in a
  repo `skills/` dir, installed with
  `npx skills add https://github.com/GlassKitApp/glasskit-ui/tree/main/skills/<name>`
  (auto-discovered, no config): **`glasskit-builder`** (build glasses apps with the SDK +
  registry, to the `docs/design/apple-feel.md` spec) and **`glasskit-review`** (audit code
  against the platform rules — lens/additive, D-pad focus, RTL world-anchored safety — the
  highest-value one, since those mistakes break on-device). Knowledge base = the design
  reference + platform constraints. A minimal `glasskit-builder` can ship early with the SDK
  and grow with the registry. The sharpest instantiation of "be the thing AI agents reach for."

## Graphify (knowledge graph, both repos)

Mirror this project's graphify workflow in `glasskit-ui`: generate `graphify-out/`, add the
same `CLAUDE.md` graphify rules, and `graphify update .` after code changes (AST-only, no API
cost) — keeps codebase Q&A + wiki current; doubles as input to the agent-visibility story.

## Execution setup & repo governance

- **Repo:** `GlassKitApp/glasskit-ui`, **public** (open source), created via `gh repo create`.
- **Working folder:** `/Users/jarrius/Documents/GitHub/glasskit-ui` — **sibling** to
  `glasskit-boilerplate` and `glasskit`; SDK extracted from
  `../glasskit-boilerplate/packages/glasses-ui`. (Separate repo, outside this Conductor
  workspace, which is tied to the `adelaide` marketing repo.)
- **Governance — owner-only merge.** Public for contribution (fork + PR), but **only the
  owner merges to `main`**:
  - Branch protection on `main`: require PR before merge, require Code Owner review,
    **restrict push/merge to the owner**, require status checks (lint, typecheck, unit +
    visual-regression tests, changeset check) to pass, no force-push, no bypass.
  - `CODEOWNERS` → owner on `*`, so every PR requires the owner's review.
  - Pairs with the release pipeline: same-repo-only auto-betas; owner-gated official releases
    on merge.

## Business reality, MVP slice & kill-criteria (stress test)

**The biggest risk is demand, not supply.** Every other risk in this plan is a *build* risk
(sensors, focus engine, scope); none is a *market* risk — yet that's the dominant variable.
The Display is a tiny early-adopter market; the dev population today is plausibly
hundreds–low-thousands. A perfect toolkit for a market that hasn't formed yet earns $0. This
plan assumes the funnel has water in it; **that is unproven and it outweighs every technical
risk here.**

**Revenue math (so "life-changing" has a number).** Boilerplate $299 ≈ $250 net/sale:
~100 sales ≈ $25k (side income); ~1,000 ≈ $250k (multi-year, needs the platform to take off);
~4,000+ ≈ $1M (life-changing). A one-time SKU is structurally capped — you re-acquire every
customer forever. **The boilerplate alone will not be life-changing.** The only piece with
life-changing *shape* is **Studio** — recurring, usage-scaling (v0/Lovable economics). So:
OSS + boilerplate = funnel + credibility; **Studio = the actual payday**, conditional on the
platform growing. Build the foundation first (correct), but don't mistake it for the prize.

**"Did I start wrong?" — wrong order, not wrong place.** Right: betting early on a real
emerging platform with a genuine moat; first-mover is the game. Wrong: a $299 paywall before
any audience/trust, and a one-time SKU for a recurring-revenue ambition. The free-OSS pivot
fixes trust; Studio fixes the model; only *demand validation* (below) fixes "are there buyers."

**Treat this as a cheap call option on the platform — not a cathedral.**
- **MVP slice (the only thing to build before measuring):** Phase 0 → publish the SDK →
  emulator + one killer focus-engine demo → ~6–8 **spine** components (Screen, StatusBar,
  Readout, Cue, Progress, Button, List, GlowIcon — NOT all 28) → llms.txt + MCP → ONE funnel
  CTA → a loud launch (Show HN, X, Meta dev community, glasses Discords).
- **Demand kill-gate (BEFORE the heavy build):** measure ~4–6 weeks — npm installs, stars,
  traffic, *inbound* ("can I build X"), any sales. **Flat signal → STOP**; reassess the
  platform bet instead of pouring months into 28 components + Liquid Glass + RTL + Studio.
  Real signal → proceed to the full plan.

**Other internal risks:** solo-founder scope/burnout (months of work — the MVP gate protects
time + morale); OSS support burden with owner-only merge (you're the bottleneck, no direct
revenue); quality investments (Liquid Glass, full 28, RTL) only pay off post-traction —
sequence them *after* signal, not before.

## Decomposition / phasing

Each phase is independently shippable; later phases get their own spec/plan as needed.

**Sequencing (stress test): ship a thin MVP first, then gate on demand.** MVP = Phases 0–3
trimmed to SDK + emulator + ~6–8 *spine* components + llms.txt/MCP + one funnel CTA + a loud
launch. Apply the **demand kill-gate** (see Business reality) BEFORE the full 28-component
build, Liquid Glass, RTL polish, and Studio. Don't build the cathedral before you know anyone
is coming to church.

0. **Validate the foundation (gate — narrowed after reading the source).** The hooks wrap
   standard W3C APIs + a self-defined `neuralband` CustomEvent. On a real Display, confirm:
   (a) `deviceorientation`/`devicemotion` fire and `navigator.geolocation` resolves in the
   web runtime; (b) **what the platform emits for Neural Band pinch/swipe** — i.e. what
   should dispatch the `neuralband` event (the one genuinely unconfirmed seam). D-pad (arrow
   keys + Enter on `.focusable`) already matches Meta's documented convention. If
   sensors/gestures aren't exposed on-device, hooks degrade to emulator-first and the
   headline shifts to focus engine + components + emulator + build/deploy loop; the unowned
   React layer stands either way.
1. **Scaffold `glasskit-ui` monorepo** (pnpm + turborepo) + `packages/glasses-ui`
   skeleton with exports map; CI + the **Changesets release pipeline** (PR beta / merge
   official, path-gated, same-repo-only betas); init **graphify** (`graphify-out/`, CLAUDE.md rules).
2. **Extract the SDK**: migrate the 5 hooks + `GlassViewport` + helpers + base
   `styles.css` from the boilerplate repo, **API unchanged**; add unit tests for
   `scoreRect`/equality helpers; publish `@glasskit/glasses-ui@0.x` to npm.
3. **Site + docs + emulator** (`apps/web`, fumadocs) → `ui.glasskit.app`: migrate seed
   docs; build the **in-browser glasses emulator** (simulated D-pad/gestures/sensors, layered
   on Chrome DevTools Sensors / Web APIs) powering live previews; build the **landing page**
   (ui-ux-pro-max + frontend-design; glasskit theme + switchable light/dark; hero = live
   emulator demo; CTA → `/create`). shadcn + Liquid Glass for site chrome, no inline CSS,
   RSC-first. Wire **SEO + agent-native visibility**: metadata, sitemap/robots, JSON-LD,
   **fumadocs `llms.txt`** + per-page Markdown.
4. **Registry + /create + MCP + skills**: from a **watch-kit → glasskit mapping matrix**
   (Horologist / watchOS analogs per component), build the ~28 `ui` components and
   generic-pattern `blocks` **to the `docs/design/apple-feel.md` spec** (+ a docs `/examples`
   gallery of the six demo apps with Starter-Kit labels); wire `registry.json` +
   `/r/<name>.json` endpoints, the **`/create`** component-picker (the `ui.shadcn.com/create`
   analog, with Starter-Kit upsell), the **`glasskit` CLI** (`add`/`init`/`create`, vendoring
   from the registry), the **GlassKit MCP server** exposing docs + registry to agents, and the
   **`glasskit-builder` / `glasskit-review` agent skills** (`npx skills add`). One default
   phosphor-green accent — no multi-palette preset system.
5. **Boilerplate cutover**: boilerplate consumes published npm + registry; delete its local copy.
6. **glasskit.app two-product landing** in `adelaide`: restructure to present GlassKit UI
   (free) + Starter Kit (paid) as one **value ladder** (not two competing CTAs); add the
   contextual "graduate" callouts + cross-links; update `lib/config.ts` + nav; apply the same
   SEO/agent-visibility + graphify treatment.
7. *(Out of scope here)* Studio consumes the same registry blocks/components.

## Top risks (from research) & mitigations

- **Web runtime may not expose sensors / Neural Band to JS** (unverified; rich-access claim
  refuted 0-3). → Phase 0 gate; degrade hooks to emulator-first if needed.
- **Meta or the community ships an official React layer**, closing the lane. → Be first +
  best + the de-facto; align as a *superset* of Meta's `.focusable`, not a fork.
- **Norigin/LRUD are "good enough" for focus.** → Win on React DX + glasses tuning +
  emulator + cohesion; consider building on Norigin rather than against it.
- **Looking replaceable on sensor hooks.** → Don't headline them; ship the complete trio
  (incl. the device-motion gap competitors miss) as quiet table-stakes.
- **Time-sensitivity:** Meta's toolkit is a moving dev preview — revalidate Phase 0
  assumptions before each major phase.

## Out of scope

GlassKit Studio (the pay-per-use no-code builder) — explicitly deferred. It is the
downstream consumer of this library, and is why the library is built first.

## Internationalization — RTL & bidi (baked in from day one)

Support RTL from the start — near-free if designed in, painful to retrofit. Rules:

- **Logical CSS only.** `margin-inline`/`padding-inline`/`inset-inline`/`text-align:
  start|end` — never physical left/right. Pairs with the no-inline-CSS + Tailwind v4 rule
  (v4 has logical utilities + `rtl:`/`ltr:` variants); most components then mirror for free.
- **`dir` on the root.** `GlassViewport`/`Screen` accept/inherit `dir="rtl"`; the whole
  600×600 tree mirrors from one switch.
- **CRITICAL — mirror reading-order UI, NEVER mirror world-anchored UI.** Reading-order
  components (Cue/Caption, List, ButtonRow, back-affordance, StepDots, Deck-advance) flip.
  **Geographic / world-anchored components must NOT flip** — `DirectionArrow`, `Compass`,
  `Pin/Waypoint`, `Reticle` track *physical reality*; mirroring a turn-by-turn arrow in RTL
  would send the user the wrong way. A real safety bug class — encode it.
- **Focus engine stays physical.** Spatial D-pad nav (`scoreRect`) navigates by physical
  position regardless of `dir`; only logical affordances flip, not spatial traversal.
- **Type scale must be RTL-capable.** Include an Arabic/Hebrew-capable font; verify Arabic
  shaping legibility at small size on the additive display.
- **Testing:** add an RTL variant to the visual-regression matrix (each component LTR + RTL)
  with explicit assertions that world-anchored components do *not* mirror.

## Automated npm release pipeline (GitHub Actions + Changesets)

Auto-publish `@glasskit/glasses-ui`: **beta on PRs**, **official on merge to main**, **only
when the package changed**. Backbone: **Changesets** (per-package detection, changelogs,
native snapshot/prerelease) — explicit changeset file per change.

- **Change detection ("based on file change"):** path filter (`dorny/paths-filter` or
  Turborepo `--filter=...[origin/main]`) gates publish jobs on `packages/glasses-ui/**` (+
  deps) changing. For official releases detection is inherent — only packages with a pending
  changeset publish (a PR without a changeset triggers no release; CI check warns if a
  package changed with no changeset).
- **PR → beta:** when the package changed, `changeset version --snapshot` →
  `npm publish --tag beta --provenance`, producing `0.x.y-beta-<shortsha>` on the **`beta`**
  dist-tag (never `latest`); post the install command back as a PR comment. **Same-repo
  branches only** — fork PRs skip auto-beta (they can't read `NPM_TOKEN`).
- **Merge to main → official:** `changeset publish` → bump version, write CHANGELOG, publish
  to **`latest`**, cut git tag + GitHub Release. Only changed packages publish.
- **Trust & safety:** `publishConfig.access: public` (scoped pkg), npm **provenance** via
  OIDC, `NPM_TOKEN` secret, `concurrency` group to serialize publishes, idempotent (skip if
  the version already exists on npm).

## Testing strategy — "don't break shit" (layered, not naive snapshots)

Honest caveat: classic serialized-DOM snapshot tests (`toMatchSnapshot` on whole
components) are a **trap** for a styled component library — they rot on every intentional
change and get blindly `--update`d, asserting nothing. Use a layered strategy:

1. **Behavior unit tests (Vitest + Testing Library) — the real regression guard.** Extend
   the **existing** `dpad.test.ts` / `sensors.test.ts`. Cover the logic-bearing components:
   focus traversal picks the right neighbor + skips disabled (scoreRect/moveFocus), AsyncView
   placeholder→loading→data→error, Deck/Wizard advances on pinch, Stepper increment/clamp,
   Confirm/OptionGroup callbacks, useNeuralBand one-shot semantics.
2. **Visual-regression tests — the *right* "snapshot" for a design system: image diffs, not
   DOM.** Drive components in the **emulator / docs preview pages** with Playwright (already in
   the ecosystem) and screenshot-diff each component (LTR + RTL). Catches "the look broke."
   (Chromatic/Storybook is the hosted alternative.)
3. **Thin structural snapshots — surgical only.** Stable contracts (ARIA roles, `.focusable`
   wiring, data attributes) via inline snapshots on small output; never whole-component HTML.
4. **API + a11y guards.** Typecheck the public `index.ts` surface (don't silently break the
   API); axe/a11y checks on focus order (critical for D-pad).

Right-size it: pure-display components (Readout, Badge) get a render smoke test + one visual
snapshot; concentrate unit effort on logic-bearing pieces. Gate all of it in CI.

## Constraints to respect during build

- AGENTS.md: this is a **modified Next.js 16** — read `node_modules/next/dist/docs/`
  before writing Next code; heed deprecation notices. Apply the same caution in the
  new monorepo's `apps/web`.
- No `Co-Authored-By: Claude` trailer on any commit (user memory).
- Follow existing fumadocs / Tailwind v4 `@theme` patterns from this repo.

## Verification

- **Package:** `pnpm build` in `packages/glasses-ui`; import in a scratch app and
  confirm the 5 hooks + `GlassViewport` work; unit tests for `scoreRect`,
  `orientationEqual`, `motionEqual` pass; `npm pack` exports map resolves
  (`@glasskit/glasses-ui` and subpaths).
- **Hooks behavior:** simulate via Chrome DevTools Sensors (orientation/motion/geo)
  and `window.dispatchEvent(new CustomEvent("neuralband",{detail:{gesture:"pinch"}}))`.
- **Docs site:** `pnpm dev` in `apps/web`; component pages render live 600×600
  previews; Orama search returns results; the accent/token styler updates tokens live.
- **Registry/CLI:** `npx glasskit add readout` into a fresh app vendors the component and it
  renders; overriding `--color-accent` restyles it; a generic-pattern block (e.g. `wizard`) scaffolds a runnable
  screen. (The registry JSON also resolves directly for interop, but `glasskit` is the path.)
- **Boilerplate cutover:** boilerplate builds against published npm with its local
  `packages/glasses-ui` deleted; demo apps still run.
- **Tests:** behavior unit tests (extended from `dpad.test.ts`/`sensors.test.ts`) +
  Playwright visual-regression diffs over the emulator/docs previews + a11y/API checks all
  pass in CI; a deliberate visual change updates baselines intentionally (not blind-`--update`).
```