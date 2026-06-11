# Graph Report - glasskit-ui  (2026-06-11)

## Corpus Check
- 208 files · ~57,512 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1206 nodes · 2165 edges · 179 communities (166 shown, 13 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3369ee7c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
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
- [[_COMMUNITY_Community 50|Community 50]]
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
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 82|Community 82]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 94 edges
2. `GlassKit Ecosystem — Open-Source SDK + Registry (`glasskit-ui`)` - 27 edges
3. `Screen()` - 23 edges
4. `Cue()` - 21 edges
5. `compilerOptions` - 17 edges
6. `compilerOptions` - 17 edges
7. `DirectionArrow()` - 15 edges
8. `GlassViewport()` - 14 edges
9. `Button()` - 13 edges
10. `GlowIcon()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `DpadProvider()` --calls--> `useDpad()`  [INFERRED]
  apps/web/components/lens/dpad-provider.tsx → packages/glasses-ui/src/hooks/dpad.tsx
- `Compass()` --calls--> `useDeviceOrientation()`  [INFERRED]
  registry/ui/compass.tsx → packages/glasses-ui/src/hooks/sensors.ts
- `DirectionArrow()` --calls--> `useDeviceOrientation()`  [INFERRED]
  registry/ui/direction-arrow.tsx → packages/glasses-ui/src/hooks/sensors.ts
- `DirectionArrow()` --calls--> `useGeolocation()`  [INFERRED]
  registry/ui/direction-arrow.tsx → packages/glasses-ui/src/hooks/sensors.ts
- `Deck()` --calls--> `useNeuralBand()`  [INFERRED]
  registry/ui/deck.tsx → packages/glasses-ui/src/hooks/sensors.ts

## Import Cycles
- None detected.

## Communities (179 total, 13 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (33): Accent color — one default, no preset system (revised 2026-06-01), Architecture — the `glasskit-ui` monorepo, Automated npm release pipeline (GitHub Actions + Changesets), Business reality, MVP slice & kill-criteria (stress test), code:block1 (glasskit-ui/                      # NEW public repo, pnpm + ), Competitive landscape & positioning (deep research, 2026-06, verified+cited), Component inventory — derived from first principles (the 8 jobs of a HUD), Constraints to respect during build (+25 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (30): dependencies, sonner, description, devDependencies, @changesets/cli, prettier, turbo, @types/node (+22 more)

### Community 2 - "Community 2"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, globals, react, react-dom, tsup (+5 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (30): Dir, focusables(), KEY_TO_DIR, moveFocus(), RectLike, scoreRect(), seedFocus(), aligned (+22 more)

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
Cohesion: 0.31
Nodes (6): { container }, onClick, row, rows, List(), ListRow()

### Community 8 - "Community 8"
Cohesion: 0.13
Nodes (13): code:sh (npm i @glasskit/glasses-ui), code:css (@import "tailwindcss";), code:tsx (import {), code:ts (import { useDpad, scoreRect } from "@glasskit/glasses-ui/hoo), Design constraints, Documentation, @glasskit/glasses-ui, License (+5 more)

### Community 9 - "Community 9"
Cohesion: 0.15
Nodes (11): 0. How this repo was set up, 1. Locked decisions (from brainstorming — do not relitigate), 2. The SDK to extract (Phase 2) — source of truth, 3. Monorepo conventions to mirror (verified from the boilerplate), 4. NEW build decisions for npm publish (this is where this repo differs), 5. Phase 0 — hardware gate (OWNER's manual step; doesn't block the build), 6. ⚠️ Boundaries — DO NOT do these without explicit owner go-ahead, 7. Recommended first steps (Phases 1 → 2) (+3 more)

### Community 10 - "Community 10"
Cohesion: 0.06
Nodes (32): dependencies, react, react-dom, sonner, description, devDependencies, @changesets/cli, prettier (+24 more)

### Community 11 - "Community 11"
Cohesion: 0.33
Nodes (9): access, baseBranch, changelog, commit, fixed, ignore, linked, $schema (+1 more)

### Community 13 - "Community 13"
Cohesion: 0.33
Nodes (5): Context, Explicitly NOT doing, Sync this worktree to the actual folder (repull), The action (single, safe, fast-forward), Verification

### Community 14 - "Community 14"
Cohesion: 0.33
Nodes (4): Adding a changeset, Changesets, code:sh (pnpm changeset), How releases happen

### Community 15 - "Community 15"
Cohesion: 0.33
Nodes (4): Before you build, Conventions, glasskit-ui — agent guide, Hard rules

### Community 16 - "Community 16"
Cohesion: 0.17
Nodes (11): code:sh (pnpm add @glasskit/glasses-ui          # the SDK (react 19 p), code:css (/* your CSS entry, after Tailwind v4 */), code:tsx (import { GlassViewport, useDpad } from "@glasskit/glasses-ui), code:sh (glasskit add screen readout button     # also pulls their de), code:block5 (packages/glasses-ui/   the npm SDK (hooks + viewport + base ), GlassKit UI, Governance, Monorepo (+3 more)

### Community 17 - "Community 17"
Cohesion: 0.06
Nodes (40): dependencies, clsx, fumadocs-core, fumadocs-mdx, fumadocs-ui, @glasskit/glasses-ui, next, qrcode (+32 more)

### Community 25 - "Community 25"
Cohesion: 0.47
Nodes (6): JsonLd(), jsonLdGraph(), organizationSchema(), softwareSchema(), webSiteSchema(), Home()

### Community 26 - "Community 26"
Cohesion: 0.09
Nodes (23): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+15 more)

### Community 27 - "Community 27"
Cohesion: 0.07
Nodes (22): PropsTable(), ComponentDoc, PropRow, ClassValue, cn(), cn(), AssistantOrb(), Avatar() (+14 more)

### Community 28 - "Community 28"
Cohesion: 0.14
Nodes (9): BrandLockup(), PlaygroundClient(), COLS, FooterLink, ProductFooter(), ProductNav(), ThemeToggle(), metadata (+1 more)

### Community 29 - "Community 29"
Cohesion: 0.48
Nodes (5): bricolage, hanken, jetbrains, metadata, WebLayout()

### Community 32 - "Community 32"
Cohesion: 0.16
Nodes (12): generateMetadata(), ComponentDoc(), GlassAppShell(), DpadProvider(), LensScene, LensStage(), getComponentDoc(), getGlassDemo() (+4 more)

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
Cohesion: 0.17
Nodes (12): deps, description(), items, LIB_DIR, name, pascal(), PUBLIC_R, registry (+4 more)

### Community 42 - "Community 42"
Cohesion: 0.22
Nodes (8): Adding a registry component, code:block1 (packages/glasses-ui/     # the npm SDK: hooks + GlassViewpor), code:sh (pnpm build:registry), Contributing to GlassKit UI, House rules, Repo layout, The lens design rules (non-negotiable), The registry index

### Community 43 - "Community 43"
Cohesion: 0.23
Nodes (12): AlertGlyph(), BatteryGlyph(), CheckGlyph(), ChevronGlyph(), HeartGlyph(), MessageGlyph(), MusicGlyph(), NavGlyph() (+4 more)

### Community 44 - "Community 44"
Cohesion: 0.22
Nodes (3): cn(), CodeBlock(), InstallTabs()

### Community 45 - "Community 45"
Cohesion: 0.17
Nodes (11): code:block1 (npx skills add pbakaus/impeccable@frontend-design -g -y), Context, Critical files, Decisions (from the owner), Make GlassKit components look like the real Meta Ray-Ban Display, Part A — "World behind the lens" preview, Part B — Component restyle (emitted-light, bigger, tasteful), Risks / notes (+3 more)

### Community 46 - "Community 46"
Cohesion: 0.11
Nodes (24): bin, glasskit, description, devDependencies, tsup, @types/node, typescript, engines (+16 more)

### Community 47 - "Community 47"
Cohesion: 0.12
Nodes (23): bin, glasskit-mcp, dependencies, @modelcontextprotocol/sdk, zod, description, devDependencies, tsup (+15 more)

### Community 48 - "Community 48"
Cohesion: 0.27
Nodes (8): 1. Install the SDK, 2. Import the styles, 3. Build, 4. Add components, code:package-install (@glasskit/glasses-ui), code:css (@import "tailwindcss";), code:tsx (import { GlassViewport, useDpad } from "@glasskit/glasses-ui), code:bash (npx glasskit add screen readout button)

### Community 49 - "Community 49"
Cohesion: 0.06
Nodes (44): AsyncViewDemo(), ButtonDemo(), CallCardDemo(), CompassDemo(), ConfirmDemo(), DeckDemo(), DictationDemo(), DirectionArrowDemo() (+36 more)

### Community 50 - "Community 50"
Cohesion: 0.17
Nodes (18): ACCENTS, CodePanel(), CopyButton(), Demo, DEMOS, HeartRateDemo(), LauncherDemo(), MenuDemo() (+10 more)

### Community 51 - "Community 51"
Cohesion: 0.17
Nodes (15): fetchJson(), RegistryFile, RegistryItem, body, files, hits, item, itemLines() (+7 more)

### Community 52 - "Community 52"
Cohesion: 0.14
Nodes (25): ComponentFile, ITEMS, RegItem, REPO_ROOT, resolve(), fetchJson(), RegistryFile, RegistryItem (+17 more)

### Community 53 - "Community 53"
Cohesion: 0.21
Nodes (7): ExploreDemo(), { container }, g, Callout(), Pin(), Reticle(), StatusDot()

### Community 55 - "Community 55"
Cohesion: 0.21
Nodes (8): generateMetadata(), generateStaticParams(), DocsAppLayout(), breadcrumbSchema(), source, Page(), Params, getMDXComponents()

### Community 56 - "Community 56"
Cohesion: 0.08
Nodes (21): DevicePreview(), CheckIcon(), CopyIcon(), FocusIcon(), GestureIcon(), GithubIcon(), GlassesIcon(), IconProps (+13 more)

### Community 58 - "Community 58"
Cohesion: 0.32
Nodes (6): compilerOptions, module, moduleResolution, types, extends, include

### Community 59 - "Community 59"
Cohesion: 0.32
Nodes (6): compilerOptions, module, moduleResolution, types, extends, include

### Community 60 - "Community 60"
Cohesion: 0.53
Nodes (3): AsyncStatus, AsyncView(), Spinner()

### Community 61 - "Community 61"
Cohesion: 0.25
Nodes (7): Adding a registry component, Contributing to GlassKit UI, House rules, Repo layout, The auto-wire convention (components that touch sensors), The lens design rules (non-negotiable), The registry index

### Community 64 - "Community 64"
Cohesion: 0.14
Nodes (13): Component visual redesign (exploration-first) → then docs/fumadocs, Context, Context — the redesign (NEW, top priority), Cross-cutting notes, Open follow-ups (post-migration, not in scope unless asked), ✅ Phase 1 — foundation (DONE, committed `26adf03`, non-breaking), Phase 2 — shell + dark fov theme (build at a TEMP baseUrl), Phase 3 — components as MDX + shared primitives (+5 more)

### Community 65 - "Community 65"
Cohesion: 0.29
Nodes (6): Activation (owner-only, one time), Day-to-day: shipping a change to the package, First publish, Local verification (what package-checks runs in CI), Releasing `@glasskit/glasses-ui`, The pipeline

### Community 68 - "Community 68"
Cohesion: 0.22
Nodes (8): Context, Cross-cutting notes, Docs → fumadocs migration + `/ui` zone integration, Open follow-ups (post-migration, not in scope unless asked), ✅ Phase 1 — foundation (DONE, committed `26adf03`, non-breaking), Phase 2 — shell + dark fov theme (build at a TEMP baseUrl), Phase 3 — components as MDX + shared primitives, Phase 4 — the swap + umbrella header

### Community 69 - "Community 69"
Cohesion: 0.13
Nodes (13): stringLabel(), { container }, fill, m, off, onRetry, { rerender }, { rerender, container } (+5 more)

### Community 70 - "Community 70"
Cohesion: 0.14
Nodes (12): { container }, map, onCancel, onChange, onConfirm, radios, sw, Badge() (+4 more)

### Community 71 - "Community 71"
Cohesion: 0.26
Nodes (5): btn, onClick, Button(), Confirm(), ErrorState()

### Community 73 - "Community 73"
Cohesion: 0.39
Nodes (6): bricolage, DocsRootLayout(), hanken, jetbrains, metadata, SEO

### Community 74 - "Community 74"
Cohesion: 0.25
Nodes (6): GlassKit visual language — "premium surfaces" (owner-approved 2026-06), Motion (Emil), Per-component application, Preview tile, The decision (supersedes strict additive purity), Tokens

### Community 75 - "Community 75"
Cohesion: 0.33
Nodes (5): GlassKit UI, Monorepo, Quick start, Status, What's here

## Knowledge Gaps
- **406 isolated node(s):** `SF`, `LA`, `pages`, `metadata`, `viewport` (+401 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 27` to `Community 32`, `Community 36`, `Community 69`, `Community 70`, `Community 71`, `Community 7`, `Community 43`, `Community 44`, `Community 49`, `Community 50`, `Community 53`, `Community 60`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `useDpad()` connect `Community 3` to `Community 32`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `DirectionArrow()` connect `Community 36` to `Community 3`, `Community 43`, `Community 49`, `Community 50`, `Community 27`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `SF`, `LA`, `pages` to the rest of the system?**
  _406 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._