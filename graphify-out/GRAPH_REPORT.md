# Graph Report - harrisburg  (2026-06-09)

## Corpus Check
- 200 files · ~1,189,339 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 962 nodes · 1333 edges · 128 communities (116 shown, 12 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a518ec2a`
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
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 81|Community 81]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 54 edges
2. `GlassKit Ecosystem — Open-Source SDK + Registry (`glasskit-ui`)` - 26 edges
3. `compilerOptions` - 16 edges
4. `compilerOptions` - 16 edges
5. `scripts` - 12 edges
6. `Screen()` - 11 edges
7. `GlassKit UI — Apple-feel design reference (additive lens)` - 11 edges
8. `StatusBar()` - 11 edges
9. `Cue()` - 10 edges
10. `getComponentDoc()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `DpadProvider()` --calls--> `useDpad()`  [INFERRED]
  apps/web/components/lens/dpad-provider.tsx → packages/glasses-ui/src/hooks/dpad.tsx
- `LensApp()` --calls--> `useDpad()`  [INFERRED]
  apps/web/components/lens-app.tsx → packages/glasses-ui/src/hooks/dpad.tsx
- `Choose()` --calls--> `useNeuralBand()`  [INFERRED]
  apps/web/components/lens-app.tsx → packages/glasses-ui/src/hooks/sensors.ts
- `parse()` --calls--> `resolve()`  [INFERRED]
  packages/cli/src/index.ts → apps/web/lib/registry-files.ts
- `add()` --calls--> `resolve()`  [INFERRED]
  packages/cli/src/index.ts → apps/web/lib/registry-files.ts

## Communities (128 total, 12 thin omitted)

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
Cohesion: 0.06
Nodes (35): Choose(), LensApp(), Screen, TILES, Dir, focusables(), KEY_TO_DIR, moveFocus() (+27 more)

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (17): compilerOptions, esModuleInterop, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+9 more)

### Community 5 - "Community 5"
Cohesion: 0.12
Nodes (15): dependsOn, env, outputs, cache, persistent, globalEnv, $schema, tasks (+7 more)

### Community 6 - "Community 6"
Cohesion: 0.13
Nodes (14): 10. Sources, 1. North star, 2. Two surfaces, two recipes, 3. Design principles (watchOS-derived, additive-translated), 4. Tokens & numbers (concrete starting set), 5. "Premium without blur" recipe, 6. Motion, 7. Iconography & typography (+6 more)

### Community 7 - "Community 7"
Cohesion: 0.32
Nodes (6): { container }, onClick, row, rows, List(), ListRow()

### Community 8 - "Community 8"
Cohesion: 0.17
Nodes (11): code:sh (npm i @glasskit/glasses-ui), code:css (@import "tailwindcss";), code:tsx (import {), code:ts (import { useDpad, scoreRect } from "@glasskit/glasses-ui/hoo), Design constraints, @glasskit/glasses-ui, Part of the GlassKit ecosystem, Subpath entries (+3 more)

### Community 9 - "Community 9"
Cohesion: 0.17
Nodes (11): 0. How this repo was set up, 1. Locked decisions (from brainstorming — do not relitigate), 2. The SDK to extract (Phase 2) — source of truth, 3. Monorepo conventions to mirror (verified from the boilerplate), 4. NEW build decisions for npm publish (this is where this repo differs), 5. Phase 0 — hardware gate (OWNER's manual step; doesn't block the build), 6. ⚠️ Boundaries — DO NOT do these without explicit owner go-ahead, 7. Recommended first steps (Phases 1 → 2) (+3 more)

### Community 10 - "Community 10"
Cohesion: 0.50
Nodes (3): scripts, run, setup

### Community 11 - "Community 11"
Cohesion: 0.20
Nodes (9): access, baseBranch, changelog, commit, fixed, ignore, linked, $schema (+1 more)

### Community 13 - "Community 13"
Cohesion: 0.33
Nodes (5): Context, Explicitly NOT doing, Sync this worktree to the actual folder (repull), The action (single, safe, fast-forward), Verification

### Community 14 - "Community 14"
Cohesion: 0.40
Nodes (4): Adding a changeset, Changesets, code:sh (pnpm changeset), How releases happen

### Community 15 - "Community 15"
Cohesion: 0.40
Nodes (4): Before you build, Conventions, glasskit-ui — agent guide, Hard rules

### Community 16 - "Community 16"
Cohesion: 0.17
Nodes (11): code:sh (pnpm add @glasskit/glasses-ui          # the SDK (react 19 p), code:css (/* your CSS entry, after Tailwind v4 */), code:tsx (import { GlassViewport, useDpad } from "@glasskit/glasses-ui), code:sh (glasskit add screen readout button     # also pulls their de), code:block5 (packages/glasses-ui/   the npm SDK (hooks + viewport + base ), GlassKit UI, Governance, Monorepo (+3 more)

### Community 17 - "Community 17"
Cohesion: 0.05
Nodes (39): dependencies, fumadocs-core, fumadocs-mdx, fumadocs-ui, @glasskit/glasses-ui, next, qrcode, react (+31 more)

### Community 25 - "Community 25"
Cohesion: 0.15
Nodes (10): ButtonCard(), ChipsCard(), CueCard(), DirectionCard(), LauncherCard(), ProgressCard(), ReadoutCard(), StatusBarCard() (+2 more)

### Community 26 - "Community 26"
Cohesion: 0.09
Nodes (22): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+14 more)

### Community 27 - "Community 27"
Cohesion: 0.09
Nodes (21): ComponentDoc, ClassValue, AssistantOrb(), Avatar(), AvatarTone, CallCard(), ChatBubble(), MessageThread() (+13 more)

### Community 29 - "Community 29"
Cohesion: 0.33
Nodes (4): bricolage, hanken, jetbrains, metadata

### Community 32 - "Community 32"
Cohesion: 0.15
Nodes (14): ComponentDoc(), InstallTabs(), PropsTable(), LensScene, LensStage(), PropRow, mrbdDeepLink(), qrSvg() (+6 more)

### Community 33 - "Community 33"
Cohesion: 0.13
Nodes (14): A. Upgrade the lens design system — `packages/glasses-ui/styles.css`, B. Stand up the registry scaffold (no serving/CLI), C. The six components (kebab-case files, PascalCase exports), Context, D. The demo + wiring, Decisions locked with the owner (2026-06-05), E. Tests (engineering-honesty level, per PLAN.md headless policy), Files (+6 more)

### Community 34 - "Community 34"
Cohesion: 0.20
Nodes (10): exports, ./hooks, ./primitives, ./styles.css, import, types, import, import (+2 more)

### Community 35 - "Community 35"
Cohesion: 0.18
Nodes (10): author, bugs, description, files, homepage, keywords, name, sideEffects (+2 more)

### Community 36 - "Community 36"
Cohesion: 0.22
Nodes (9): { container }, { container: a }, { container: b }, g, cardinal(), Compass(), DIRS, DirectionArrow() (+1 more)

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
Nodes (9): deps, items, name, PUBLIC_R, registry, ROOT, served, src (+1 more)

### Community 42 - "Community 42"
Cohesion: 0.22
Nodes (8): Adding a registry component, code:block1 (packages/glasses-ui/     # the npm SDK: hooks + GlassViewpor), code:sh (pnpm build:registry), Contributing to GlassKit UI, House rules, Repo layout, The lens design rules (non-negotiable), The registry index

### Community 43 - "Community 43"
Cohesion: 0.26
Nodes (10): AlertGlyph(), BatteryGlyph(), CheckGlyph(), ChevronGlyph(), HeartGlyph(), MessageGlyph(), MusicGlyph(), NavGlyph() (+2 more)

### Community 44 - "Community 44"
Cohesion: 0.14
Nodes (12): CodeBlock(), DevicePreview(), CheckIcon(), CopyIcon(), GlassesIcon(), InstallCommand(), Pm, PMS (+4 more)

### Community 45 - "Community 45"
Cohesion: 0.17
Nodes (11): code:block1 (npx skills add pbakaus/impeccable@frontend-design -g -y), Context, Critical files, Decisions (from the owner), Make GlassKit components look like the real Meta Ray-Ban Display, Part A — "World behind the lens" preview, Part B — Component restyle (emitted-light, bigger, tasteful), Risks / notes (+3 more)

### Community 46 - "Community 46"
Cohesion: 0.08
Nodes (24): bin, glasskit, description, devDependencies, tsup, @types/node, typescript, engines (+16 more)

### Community 47 - "Community 47"
Cohesion: 0.08
Nodes (23): bin, glasskit-mcp, dependencies, @modelcontextprotocol/sdk, zod, description, devDependencies, tsup (+15 more)

### Community 48 - "Community 48"
Cohesion: 0.22
Nodes (8): 1. Install the SDK, 2. Import the styles, 3. Build, 4. Add components, code:package-install (@glasskit/glasses-ui), code:css (@import "tailwindcss";), code:tsx (import { GlassViewport, useDpad } from "@glasskit/glasses-ui), code:bash (npx glasskit add screen readout button)

### Community 49 - "Community 49"
Cohesion: 0.14
Nodes (12): cards, chips, { container }, onSelect, Deck(), Heading(), Launcher(), LauncherApp (+4 more)

### Community 50 - "Community 50"
Cohesion: 0.09
Nodes (30): ACCENTS, Demo, DEMOS, PlaygroundClient(), DpadProvider(), ExploreDemo(), HeartRateDemo(), LauncherDemo() (+22 more)

### Community 51 - "Community 51"
Cohesion: 0.12
Nodes (12): RegistryFile, RegistryItem, body, files, hits, item, q, reg (+4 more)

### Community 52 - "Community 52"
Cohesion: 0.21
Nodes (13): resolve(), RegistryFile, RegistryItem, add(), c, exists(), help(), init() (+5 more)

### Community 53 - "Community 53"
Cohesion: 0.14
Nodes (9): CATEGORY_ORDER, DocsSidebar(), GROUPS, metadata, SiteHeader(), COMPONENT_DOCS, COMPONENT_NAV, ComponentNav (+1 more)

### Community 55 - "Community 55"
Cohesion: 0.27
Nodes (4): source, Page(), Params, getMDXComponents()

### Community 56 - "Community 56"
Cohesion: 0.14
Nodes (17): cn(), CtrlButton(), Emulator(), GhostKey(), ChevronDown(), ChevronLeft(), ChevronRight(), ChevronUp() (+9 more)

### Community 58 - "Community 58"
Cohesion: 0.29
Nodes (6): compilerOptions, module, moduleResolution, types, extends, include

### Community 59 - "Community 59"
Cohesion: 0.29
Nodes (6): compilerOptions, module, moduleResolution, types, extends, include

### Community 60 - "Community 60"
Cohesion: 0.40
Nodes (4): { chromium }, require, routes, tile

### Community 61 - "Community 61"
Cohesion: 0.33
Nodes (5): bar, { container }, { container: over }, { container: under }, el

### Community 64 - "Community 64"
Cohesion: 0.14
Nodes (13): Component visual redesign (exploration-first) → then docs/fumadocs, Context, Context — the redesign (NEW, top priority), Cross-cutting notes, Open follow-ups (post-migration, not in scope unless asked), ✅ Phase 1 — foundation (DONE, committed `26adf03`, non-breaking), Phase 2 — shell + dark fov theme (build at a TEMP baseUrl), Phase 3 — components as MDX + shared primitives (+5 more)

### Community 65 - "Community 65"
Cohesion: 0.50
Nodes (3): { chromium }, loc, require

### Community 68 - "Community 68"
Cohesion: 0.22
Nodes (8): Context, Cross-cutting notes, Docs → fumadocs migration + `/ui` zone integration, Open follow-ups (post-migration, not in scope unless asked), ✅ Phase 1 — foundation (DONE, committed `26adf03`, non-breaking), Phase 2 — shell + dark fov theme (build at a TEMP baseUrl), Phase 3 — components as MDX + shared primitives, Phase 4 — the swap + umbrella header

### Community 69 - "Community 69"
Cohesion: 0.15
Nodes (12): { container }, fill, m, off, onRetry, { rerender }, { rerender, container }, ErrorState() (+4 more)

### Community 70 - "Community 70"
Cohesion: 0.14
Nodes (13): { container }, map, onCancel, onChange, onConfirm, radios, sw, Badge() (+5 more)

### Community 71 - "Community 71"
Cohesion: 0.43
Nodes (3): btn, onClick, Button()

### Community 72 - "Community 72"
Cohesion: 0.38
Nodes (5): generateMetadata(), generateMetadata(), getComponentDoc(), DevicePreviewPage(), generateMetadata()

### Community 73 - "Community 73"
Cohesion: 0.33
Nodes (4): bricolage, hanken, jetbrains, metadata

### Community 74 - "Community 74"
Cohesion: 0.29
Nodes (6): GlassKit visual language — "premium surfaces" (owner-approved 2026-06), Motion (Emil), Per-component application, Preview tile, The decision (supersedes strict additive purity), Tokens

### Community 76 - "Community 76"
Cohesion: 0.40
Nodes (4): homepage, items, name, $schema

### Community 77 - "Community 77"
Cohesion: 0.40
Nodes (4): { chromium }, require, s, tile

### Community 78 - "Community 78"
Cohesion: 0.50
Nodes (3): { chromium }, l, require

### Community 79 - "Community 79"
Cohesion: 0.50
Nodes (3): { chromium }, fig, require

## Knowledge Gaps
- **499 isolated node(s):** `$schema`, `target`, `lib`, `module`, `moduleResolution` (+494 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 56` to `Community 32`, `Community 36`, `Community 69`, `Community 70`, `Community 7`, `Community 71`, `Community 43`, `Community 44`, `Community 49`, `Community 50`, `Community 53`, `Community 27`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Why does `DpadProvider()` connect `Community 50` to `Community 3`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `useDpad()` connect `Community 3` to `Community 50`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **What connects `$schema`, `target`, `lib` to the rest of the system?**
  _499 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.05551020408163265 - nodes in this community are weakly interconnected._