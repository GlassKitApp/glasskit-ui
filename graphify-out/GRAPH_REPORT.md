# Graph Report - harrisburg  (2026-06-05)

## Corpus Check
- 84 files · ~29,101 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 539 nodes · 763 edges · 41 communities (36 shown, 5 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0df0e1c4`
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

## God Nodes (most connected - your core abstractions)
1. `GlassKit Ecosystem — Open-Source SDK + Registry (`glasskit-ui`)` - 26 edges
2. `cn()` - 24 edges
3. `compilerOptions` - 16 edges
4. `compilerOptions` - 16 edges
5. `scripts` - 11 edges
6. `GlassKit UI — Apple-feel design reference (additive lens)` - 11 edges
7. `START HERE — glasskit-ui build kickoff` - 10 edges
8. `Cue()` - 8 edges
9. `Screen()` - 8 edges
10. `StatusBar()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `DpadProvider()` --calls--> `useDpad()`  [INFERRED]
  apps/web/components/lens/dpad-provider.tsx → packages/glasses-ui/src/hooks/dpad.tsx
- `LensApp()` --calls--> `useDpad()`  [INFERRED]
  apps/web/components/lens-app.tsx → packages/glasses-ui/src/hooks/dpad.tsx
- `Choose()` --calls--> `useNeuralBand()`  [INFERRED]
  apps/web/components/lens-app.tsx → packages/glasses-ui/src/hooks/sensors.ts
- `cn()` --calls--> `clsx`  [INFERRED]
  apps/web/lib/utils.ts → apps/web/package.json
- `GhostKey()` --calls--> `cn()`  [EXTRACTED]
  apps/web/components/emulator.tsx → apps/web/lib/utils.ts

## Communities (41 total, 5 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (33): Accent color — one default, no preset system (revised 2026-06-01), Architecture — the `glasskit-ui` monorepo, Automated npm release pipeline (GitHub Actions + Changesets), Business reality, MVP slice & kill-criteria (stress test), code:block1 (glasskit-ui/                      # NEW public repo, pnpm + ), Competitive landscape & positioning (deep research, 2026-06, verified+cited), Component inventory — derived from first principles (the 8 jobs of a HUD), Constraints to respect during build (+25 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (27): description, devDependencies, @changesets/cli, prettier, turbo, @types/node, typescript, engines (+19 more)

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
Cohesion: 0.33
Nodes (5): bar, { container }, { container: over }, { container: under }, el

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
Cohesion: 0.50
Nodes (3): glasskit-ui, Governance, Status

### Community 17 - "Community 17"
Cohesion: 0.07
Nodes (29): dependencies, @glasskit/glasses-ui, next, react, react-dom, tailwind-merge, description, devDependencies (+21 more)

### Community 25 - "Community 25"
Cohesion: 0.07
Nodes (30): CtrlButton(), Emulator(), GhostKey(), CheckIcon(), ChevronDown(), ChevronLeft(), ChevronRight(), ChevronUp() (+22 more)

### Community 26 - "Community 26"
Cohesion: 0.09
Nodes (22): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+14 more)

### Community 27 - "Community 27"
Cohesion: 0.07
Nodes (47): BatteryGlyph(), CheckGlyph(), ChevronGlyph(), HeartGlyph(), MessageGlyph(), MusicGlyph(), NavGlyph(), ComponentDoc (+39 more)

### Community 29 - "Community 29"
Cohesion: 0.33
Nodes (4): bricolage, hanken, jetbrains, metadata

### Community 32 - "Community 32"
Cohesion: 0.08
Nodes (24): cn(), CodeBlock(), metadata, ACCENTS, Demo, DEMOS, PlaygroundClient(), PropsTable() (+16 more)

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
Cohesion: 0.31
Nodes (7): { container }, { container: a }, { container: b }, g, cardinal(), Compass(), DIRS

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

## Knowledge Gaps
- **299 isolated node(s):** `$schema`, `target`, `lib`, `module`, `moduleResolution` (+294 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 27` to `Community 32`, `Community 25`, `Community 36`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Why does `useDpad()` connect `Community 3` to `Community 32`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Why does `DpadProvider()` connect `Community 32` to `Community 3`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **What connects `$schema`, `target`, `lib` to the rest of the system?**
  _299 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.05551020408163265 - nodes in this community are weakly interconnected._