# Graph Report - glasskit-ui  (2026-06-13)

## Corpus Check
- 254 files · ~386,778 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1504 nodes · 2635 edges · 215 communities (194 shown, 21 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dd127029`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 82|Community 82]]
- [[_COMMUNITY_Community 136|Community 136]]
- [[_COMMUNITY_Community 138|Community 138]]
- [[_COMMUNITY_Community 148|Community 148]]
- [[_COMMUNITY_Community 176|Community 176]]
- [[_COMMUNITY_Community 182|Community 182]]
- [[_COMMUNITY_Community 183|Community 183]]
- [[_COMMUNITY_Community 184|Community 184]]
- [[_COMMUNITY_Community 185|Community 185]]
- [[_COMMUNITY_Community 187|Community 187]]
- [[_COMMUNITY_Community 188|Community 188]]
- [[_COMMUNITY_Community 189|Community 189]]
- [[_COMMUNITY_Community 190|Community 190]]
- [[_COMMUNITY_Community 191|Community 191]]
- [[_COMMUNITY_Community 192|Community 192]]
- [[_COMMUNITY_Community 193|Community 193]]
- [[_COMMUNITY_Community 194|Community 194]]
- [[_COMMUNITY_Community 201|Community 201]]
- [[_COMMUNITY_Community 202|Community 202]]
- [[_COMMUNITY_Community 209|Community 209]]
- [[_COMMUNITY_Community 211|Community 211]]
- [[_COMMUNITY_Community 214|Community 214]]
- [[_COMMUNITY_Community 215|Community 215]]
- [[_COMMUNITY_Community 216|Community 216]]
- [[_COMMUNITY_Community 218|Community 218]]
- [[_COMMUNITY_Community 220|Community 220]]
- [[_COMMUNITY_Community 221|Community 221]]
- [[_COMMUNITY_Community 222|Community 222]]
- [[_COMMUNITY_Community 223|Community 223]]
- [[_COMMUNITY_Community 224|Community 224]]
- [[_COMMUNITY_Community 225|Community 225]]
- [[_COMMUNITY_Community 226|Community 226]]
- [[_COMMUNITY_Community 227|Community 227]]
- [[_COMMUNITY_Community 228|Community 228]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 91 edges
2. `Screen()` - 26 edges
3. `GlassKit Ecosystem — Open-Source SDK + Registry (`glasskit-ui`)` - 26 edges
4. `Cue()` - 24 edges
5. `useNavigator()` - 21 edges
6. `compilerOptions` - 17 edges
7. `GlassViewport()` - 17 edges
8. `compilerOptions` - 17 edges
9. `Button()` - 16 edges
10. `DirectionArrow()` - 15 edges

## Surprising Connections (you probably didn't know these)
- `NowPlayingDemo()` --calls--> `fmt()`  [INFERRED]
  apps/web/components/glass-demos/demos.tsx → scripts/check-bundle-budget.mjs
- `DpadProvider()` --calls--> `useDpad()`  [INFERRED]
  apps/web/components/lens/dpad-provider.tsx → packages/glasses-ui/src/hooks/dpad.tsx
- `add()` --calls--> `resolve()`  [INFERRED]
  packages/cli/src/index.ts → apps/web/lib/registry-files.ts
- `init()` --calls--> `resolve()`  [INFERRED]
  packages/cli/src/index.ts → apps/web/lib/registry-files.ts
- `parse()` --calls--> `resolve()`  [INFERRED]
  packages/cli/src/index.ts → apps/web/lib/registry-files.ts

## Import Cycles
- None detected.

## Communities (215 total, 21 thin omitted)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (30): dependencies, sonner, description, devDependencies, @changesets/cli, prettier, turbo, @types/node (+22 more)

### Community 2 - "Community 2"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, globals, react, react-dom, tsup (+5 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (41): Dir, focusables(), FocusScope(), getFocusables(), KEY_TO_DIR, moveFocus(), RectLike, scopes (+33 more)

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (17): compilerOptions, esModuleInterop, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+9 more)

### Community 5 - "Community 5"
Cohesion: 0.14
Nodes (15): dependsOn, env, outputs, cache, persistent, globalEnv, $schema, tasks (+7 more)

### Community 6 - "Community 6"
Cohesion: 0.12
Nodes (14): 10. Sources, 1. North star, 2. Two surfaces, two recipes, 3. Design principles (watchOS-derived, additive-translated), 4. Tokens & numbers (concrete starting set), 5. "Premium without blur" recipe, 6. Motion, 7. Iconography & typography (+6 more)

### Community 7 - "Community 7"
Cohesion: 0.50
Nodes (3): The reference (knowledge), The skill (procedural knowledge), The tools (hands)

### Community 8 - "Community 8"
Cohesion: 0.15
Nodes (12): code:css (@import "tailwindcss";), code:tsx (import {), code:ts (import { useDpad, scoreRect } from "@glasskit/glasses-ui/hoo), Design constraints, Documentation, @glasskit-ui/react, License, Part of the GlassKit ecosystem (+4 more)

### Community 10 - "Community 10"
Cohesion: 0.06
Nodes (34): dependencies, react, react-dom, sonner, description, devDependencies, @changesets/cli, leaflet (+26 more)

### Community 11 - "Community 11"
Cohesion: 0.33
Nodes (9): access, baseBranch, changelog, commit, fixed, ignore, linked, $schema (+1 more)

### Community 13 - "Community 13"
Cohesion: 0.33
Nodes (5): Context, Explicitly NOT doing, Sync this worktree to the actual folder (repull), The action (single, safe, fast-forward), Verification

### Community 14 - "Community 14"
Cohesion: 0.40
Nodes (3): Adding a changeset, Changesets, How releases happen

### Community 16 - "Community 16"
Cohesion: 0.17
Nodes (11): code:sh (pnpm add @glasskit/glasses-ui          # the SDK (react 19 p), code:css (/* your CSS entry, after Tailwind v4 */), code:tsx (import { GlassViewport, useDpad } from "@glasskit/glasses-ui), code:sh (glasskit add screen readout button     # also pulls their de), code:block5 (packages/glasses-ui/   the npm SDK (hooks + viewport + base ), GlassKit UI, Governance, Monorepo (+3 more)

### Community 17 - "Community 17"
Cohesion: 0.05
Nodes (44): dependencies, clsx, fumadocs-core, fumadocs-mdx, fumadocs-ui, @glasskit-ui/react, leaflet, next (+36 more)

### Community 25 - "Community 25"
Cohesion: 0.06
Nodes (32): Accent color — one default, no preset system (revised 2026-06-01), Architecture — the `glasskit-ui` monorepo, Automated npm release pipeline (GitHub Actions + Changesets), Business reality, MVP slice & kill-criteria (stress test), Competitive landscape & positioning (deep research, 2026-06, verified+cited), Component inventory — derived from first principles (the 8 jobs of a HUD), Constraints to respect during build, Context (+24 more)

### Community 26 - "Community 26"
Cohesion: 0.09
Nodes (23): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+15 more)

### Community 27 - "Community 27"
Cohesion: 0.08
Nodes (13): cn(), AssistantOrb(), CallCard(), Clock(), Heading(), MediaThumb(), NotificationCard(), NowPlaying() (+5 more)

### Community 28 - "Community 28"
Cohesion: 0.07
Nodes (32): generateMetadata(), generateStaticParams(), BrandLockup(), JsonLd(), DemoDevice, COLS, FooterLink, ProductFooter() (+24 more)

### Community 29 - "Community 29"
Cohesion: 0.14
Nodes (23): ACCENTS, CodePanel(), CopyButton(), RAMP_TOKENS, HeartRateDemo(), LauncherDemo(), MapDemo(), PLACES (+15 more)

### Community 32 - "Community 32"
Cohesion: 0.08
Nodes (23): author, bin, create-glasskit, bugs, dependencies, @glasskit-ui/cli, description, engines (+15 more)

### Community 33 - "Community 33"
Cohesion: 0.13
Nodes (14): A. Upgrade the lens design system — `packages/glasses-ui/styles.css`, B. Stand up the registry scaffold (no serving/CLI), C. The six components (kebab-case files, PascalCase exports), Context, D. The demo + wiring, Decisions locked with the owner (2026-06-05), E. Tests (engineering-honesty level, per PLAN.md headless policy), Files (+6 more)

### Community 34 - "Community 34"
Cohesion: 0.20
Nodes (10): exports, ./hooks, ./primitives, ./styles.css, import, types, import, import (+2 more)

### Community 35 - "Community 35"
Cohesion: 0.27
Nodes (11): author, bugs, description, files, homepage, keywords, license, name (+3 more)

### Community 36 - "Community 36"
Cohesion: 0.20
Nodes (14): bearingBetween(), LatLon, normalizeDeg(), relativeBearing(), LA, SF, { container }, { container: a } (+6 more)

### Community 37 - "Community 37"
Cohesion: 0.33
Nodes (6): scripts, build, dev, lint, test, typecheck

### Community 38 - "Community 38"
Cohesion: 0.50
Nodes (4): repository, directory, type, url

### Community 39 - "Community 39"
Cohesion: 0.67
Nodes (3): peerDependencies, react, react-dom

### Community 40 - "Community 40"
Cohesion: 0.67
Nodes (3): publishConfig, access, provenance

### Community 41 - "Community 41"
Cohesion: 0.13
Nodes (16): componentLines, deps, description(), items, LIB_DIR, llms, name, oversized (+8 more)

### Community 42 - "Community 42"
Cohesion: 0.22
Nodes (8): Adding a registry component, code:block1 (packages/glasses-ui/     # the npm SDK: hooks + GlassViewpor), code:sh (pnpm build:registry), Contributing to GlassKit UI, House rules, Repo layout, The lens design rules (non-negotiable), The registry index

### Community 43 - "Community 43"
Cohesion: 0.33
Nodes (5): Confirmed correct — no changes needed, Fixed in this PR, Known deviations — deliberate, owner-approved design, Platform audit — Meta Ray-Ban Display Web Apps vs GlassKit UI (2026-06-11), Watchlist (platform gaps that could move under us)

### Community 44 - "Community 44"
Cohesion: 0.40
Nodes (4): Before you build, Conventions, glasskit-ui — agent guide, Hard rules

### Community 45 - "Community 45"
Cohesion: 0.17
Nodes (11): code:block1 (npx skills add pbakaus/impeccable@frontend-design -g -y), Context, Critical files, Decisions (from the owner), Make GlassKit components look like the real Meta Ray-Ban Display, Part A — "World behind the lens" preview, Part B — Component restyle (emitted-light, bigger, tasteful), Risks / notes (+3 more)

### Community 46 - "Community 46"
Cohesion: 0.09
Nodes (29): author, bin, glasskit, bugs, description, devDependencies, tsup, @types/node (+21 more)

### Community 47 - "Community 47"
Cohesion: 0.08
Nodes (32): author, bin, glasskit-mcp, bugs, dependencies, @modelcontextprotocol/sdk, zod, description (+24 more)

### Community 48 - "Community 48"
Cohesion: 0.39
Nodes (7): 1. Install the SDK, 2. Import the styles, 3. Build, 4. Add components, Fastest path: scaffold an app, On-device behaviors worth knowing, Or add GlassKit to an existing app

### Community 49 - "Community 49"
Cohesion: 0.14
Nodes (27): AsyncViewDemo(), ButtonDemo(), CallCardDemo(), CompassDemo(), ComposeFlowDemo(), ConfirmDemo(), DeckDemo(), DirectionArrowDemo() (+19 more)

### Community 51 - "Community 51"
Cohesion: 0.17
Nodes (15): fetchJson(), RegistryFile, RegistryItem, body, files, hits, item, itemLines() (+7 more)

### Community 52 - "Community 52"
Cohesion: 0.19
Nodes (22): fetchJson(), RegistryFile, RegistryItem, agentFiles(), add(), agents(), c, depName() (+14 more)

### Community 53 - "Community 53"
Cohesion: 0.07
Nodes (37): generateMetadata(), generateMetadata(), ComponentDoc(), DevicePreview(), ExampleDoc(), GlassAppShell(), PlaygroundClient(), generateMetadata() (+29 more)

### Community 55 - "Community 55"
Cohesion: 0.25
Nodes (5): fetchMarkdown(), findings, firecrawl(), PAGES, repoStatePath

### Community 56 - "Community 56"
Cohesion: 0.08
Nodes (20): CheckIcon(), CopyIcon(), FocusIcon(), GestureIcon(), GithubIcon(), GlassesIcon(), IconProps, LayersIcon() (+12 more)

### Community 58 - "Community 58"
Cohesion: 0.32
Nodes (6): compilerOptions, module, moduleResolution, types, extends, include

### Community 59 - "Community 59"
Cohesion: 0.32
Nodes (6): compilerOptions, module, moduleResolution, types, extends, include

### Community 60 - "Community 60"
Cohesion: 0.22
Nodes (8): Components ({{COUNT}}), Conventions, GlassKit UI, Install, Links, Platform facts (verified 2026-06 against Meta's docs/toolkit), SDK (`@glasskit-ui/react`), Toasts & notifications

### Community 61 - "Community 61"
Cohesion: 0.25
Nodes (7): Adding a registry component, Contributing to GlassKit UI, House rules, Repo layout, The auto-wire convention (components that touch sensors), The lens design rules (non-negotiable), The registry index

### Community 64 - "Community 64"
Cohesion: 0.14
Nodes (13): Component visual redesign (exploration-first) → then docs/fumadocs, Context, Context — the redesign (NEW, top priority), Cross-cutting notes, Open follow-ups (post-migration, not in scope unless asked), ✅ Phase 1 — foundation (DONE, committed `26adf03`, non-breaking), Phase 2 — shell + dark fov theme (build at a TEMP baseUrl), Phase 3 — components as MDX + shared primitives (+5 more)

### Community 65 - "Community 65"
Cohesion: 0.29
Nodes (6): Activation (owner-only, one time) — DONE 2026-06-11, Day-to-day: shipping a change to a package, First publish, Local verification (what package-checks runs in CI), Releasing the GlassKit packages, The pipeline

### Community 68 - "Community 68"
Cohesion: 0.22
Nodes (8): Context, Cross-cutting notes, Docs → fumadocs migration + `/ui` zone integration, Open follow-ups (post-migration, not in scope unless asked), ✅ Phase 1 — foundation (DONE, committed `26adf03`, non-breaking), Phase 2 — shell + dark fov theme (build at a TEMP baseUrl), Phase 3 — components as MDX + shared primitives, Phase 4 — the swap + umbrella header

### Community 69 - "Community 69"
Cohesion: 0.18
Nodes (10): 0. How this repo was set up, 1. Locked decisions (from brainstorming — do not relitigate), 2. The SDK to extract (Phase 2) — source of truth, 3. Monorepo conventions to mirror (verified from the boilerplate), 4. NEW build decisions for npm publish (this is where this repo differs), 5. Phase 0 — hardware gate (OWNER's manual step; doesn't block the build), 6. ⚠️ Boundaries — DO NOT do these without explicit owner go-ahead, 7. Recommended first steps (Phases 1 → 2) (+2 more)

### Community 70 - "Community 70"
Cohesion: 0.12
Nodes (13): { container }, map, onCancel, onChange, onConfirm, radios, sw, Badge() (+5 more)

### Community 71 - "Community 71"
Cohesion: 0.24
Nodes (6): PREVIEWS, Avatar(), AvatarTone, ChatBubble(), MessageThread(), ComposeFlow()

### Community 72 - "Community 72"
Cohesion: 0.20
Nodes (9): API conventions (every component follows these), Free-form text, Loading, empty, and error, Navigation, Notifications: Toast vs Toaster vs NotificationCard, Performance, Quantities: Progress vs Meter vs Timer, Screen readers (+1 more)

### Community 73 - "Community 73"
Cohesion: 0.40
Nodes (3): FROZEN_TIME, registry, slugs

### Community 74 - "Community 74"
Cohesion: 0.25
Nodes (6): GlassKit visual language — "premium surfaces" (owner-approved 2026-06), Motion (Emil), Per-component application, Preview tile, The decision (supersedes strict additive purity), Tokens

### Community 75 - "Community 75"
Cohesion: 0.33
Nodes (5): GlassKit UI, Monorepo, Quick start, Status, What's here

### Community 78 - "Community 78"
Cohesion: 0.27
Nodes (12): AlertGlyph(), BatteryGlyph(), CheckGlyph(), ChevronGlyph(), HeartGlyph(), MessageGlyph(), MusicGlyph(), NavGlyph() (+4 more)

### Community 81 - "Community 81"
Cohesion: 0.40
Nodes (4): Reporting a vulnerability, Scope notes, Security Policy, Supported versions

### Community 136 - "Community 136"
Cohesion: 0.11
Nodes (17): ExploreDemo(), { container }, fill, m, off, onRetry, { rerender }, { rerender, container } (+9 more)

### Community 138 - "Community 138"
Cohesion: 0.16
Nodes (11): pages, cards, chips, { container }, onSelect, Deck(), Launcher(), LauncherApp (+3 more)

### Community 148 - "Community 148"
Cohesion: 0.10
Nodes (25): Threads(), End(), Home(), Run(), NavHistory(), NavHome(), NavSession(), NavSummary() (+17 more)

### Community 176 - "Community 176"
Cohesion: 0.40
Nodes (4): { container }, onClick, row, rows

### Community 185 - "Community 185"
Cohesion: 0.40
Nodes (5): 0.1.0, 0.2.0, @glasskit-ui/cli, Minor Changes, Minor Changes

### Community 187 - "Community 187"
Cohesion: 0.50
Nodes (3): cli, require, result

### Community 188 - "Community 188"
Cohesion: 0.33
Nodes (5): 0.1.0, 0.1.1, create-glasskit, Minor Changes, Patch Changes

### Community 189 - "Community 189"
Cohesion: 0.23
Nodes (11): 0.1.1, 0.2.0, 0.3.0, 0.4.0, @glasskit-ui/react, Minor Changes, Minor Changes, Minor Changes (+3 more)

### Community 190 - "Community 190"
Cohesion: 0.50
Nodes (3): 0.1.0, @glasskit-ui/mcp, Minor Changes

### Community 191 - "Community 191"
Cohesion: 0.27
Nodes (9): 0.0.1, 0.0.2, 0.0.3, 0.0.4, @glasskit-ui/web, Patch Changes, Patch Changes, Patch Changes (+1 more)

### Community 201 - "Community 201"
Cohesion: 0.22
Nodes (3): cn(), CodeBlock(), InstallTabs()

### Community 202 - "Community 202"
Cohesion: 0.40
Nodes (3): LatLng, Leaflet, Place

### Community 209 - "Community 209"
Cohesion: 0.53
Nodes (3): AsyncStatus, AsyncView(), Spinner()

### Community 211 - "Community 211"
Cohesion: 0.29
Nodes (6): fmt(), kb(), NEXT, PREVIEW_DIR, ROOT, SDK_DIST

### Community 214 - "Community 214"
Cohesion: 0.31
Nodes (5): deriveRamp(), hexToOklch(), Oklch, oklchToHex(), Ramp

### Community 215 - "Community 215"
Cohesion: 0.33
Nodes (5): bar, { container }, { container: over }, { container: under }, el

### Community 216 - "Community 216"
Cohesion: 0.27
Nodes (6): ClassValue, stringLabel(), cn(), Progress(), formatSeconds(), Timer()

### Community 218 - "Community 218"
Cohesion: 0.46
Nodes (7): Deep links with `paths`, Focus memory, How to use it, Move around with useNavigator, Overlays consume back with useBackHandler, Params and reload survival, Set up the stack

### Community 220 - "Community 220"
Cohesion: 0.40
Nodes (4): Do not page just because content overflows, Nesting, Pick one model per screen, The back gesture is a history router

### Community 221 - "Community 221"
Cohesion: 0.17
Nodes (8): PropsTable(), BAKED_ROUTES, ComponentDoc, PropRow, Button(), Confirm(), EmptyState(), ErrorState()

### Community 222 - "Community 222"
Cohesion: 0.70
Nodes (4): Controlled: you own the index, Deck and the back gesture, How to use it, Uncontrolled: swipe to advance

### Community 223 - "Community 223"
Cohesion: 0.33
Nodes (5): API stability — the road to 1.0, Versioning, What 0.x still allows, What gates 1.0.0, What is already treated as frozen

### Community 224 - "Community 224"
Cohesion: 0.70
Nodes (4): Controlled by value and onChange, How to use it, Tabs and the back gesture, When Tabs is the right model

### Community 227 - "Community 227"
Cohesion: 0.83
Nodes (3): A grid of entries, How to use it, Launcher and the back gesture

## Knowledge Gaps
- **531 isolated node(s):** `allow`, `SF`, `LA`, `pages`, `SCREENS` (+526 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 27` to `Community 36`, `Community 70`, `Community 71`, `Community 136`, `Community 201`, `Community 138`, `Community 202`, `Community 78`, `Community 209`, `Community 148`, `Community 53`, `Community 221`, `Community 29`, `Community 216`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Why does `resolve()` connect `Community 53` to `Community 52`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `useDpad()` connect `Community 3` to `Community 53`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **What connects `allow`, `SF`, `LA` to the rest of the system?**
  _531 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.06144393241167435 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._