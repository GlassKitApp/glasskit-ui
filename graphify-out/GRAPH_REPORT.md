# Graph Report - harrisburg  (2026-06-05)

## Corpus Check
- 41 files · ~17,174 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 359 nodes · 366 edges · 33 communities (27 shown, 6 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e3a91e35`
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
- [[_COMMUNITY_Community 12|Community 12]]
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

## God Nodes (most connected - your core abstractions)
1. `GlassKit Ecosystem — Open-Source SDK + Registry (`glasskit-ui`)` - 25 edges
2. `compilerOptions` - 16 edges
3. `compilerOptions` - 16 edges
4. `scripts` - 11 edges
5. `GlassKit UI — Apple-feel design reference (additive lens)` - 11 edges
6. `START HERE — glasskit-ui build kickoff` - 10 edges
7. `@glasskit/glasses-ui` - 7 edges
8. `tasks` - 6 edges
9. `exports` - 6 edges
10. `scripts` - 6 edges

## Surprising Connections (you probably didn't know these)
- `LensApp()` --calls--> `useDpad()`  [INFERRED]
  apps/web/components/lens-app.tsx → packages/glasses-ui/src/hooks/dpad.tsx
- `Choose()` --calls--> `useNeuralBand()`  [INFERRED]
  apps/web/components/lens-app.tsx → packages/glasses-ui/src/hooks/sensors.ts
- `cn()` --calls--> `clsx`  [INFERRED]
  apps/web/lib/utils.ts → apps/web/package.json
- `GhostKey()` --calls--> `cn()`  [EXTRACTED]
  apps/web/components/emulator.tsx → apps/web/lib/utils.ts
- `CtrlButton()` --calls--> `cn()`  [EXTRACTED]
  apps/web/components/emulator.tsx → apps/web/lib/utils.ts

## Communities (33 total, 6 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (32): Accent color — one default, no preset system (revised 2026-06-01), Architecture — the `glasskit-ui` monorepo, Automated npm release pipeline (GitHub Actions + Changesets), Business reality, MVP slice & kill-criteria (stress test), code:block1 (glasskit-ui/                      # NEW public repo, pnpm + ), Competitive landscape & positioning (deep research, 2026-06, verified+cited), Component inventory — derived from first principles (the 8 jobs of a HUD), Constraints to respect during build (+24 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (27): description, devDependencies, @changesets/cli, prettier, turbo, @types/node, typescript, engines (+19 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (26): author, bugs, description, files, homepage, keywords, name, peerDependencies (+18 more)

### Community 3 - "Community 3"
Cohesion: 0.11
Nodes (21): Choose(), Dir, focusables(), KEY_TO_DIR, moveFocus(), RectLike, scoreRect(), seedFocus() (+13 more)

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
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, globals, react, react-dom, tsup (+5 more)

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

### Community 12 - "Community 12"
Cohesion: 0.20
Nodes (10): exports, ./hooks, ./primitives, ./styles.css, import, types, import, import (+2 more)

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
Cohesion: 0.08
Nodes (24): dependencies, clsx, @glasskit/glasses-ui, next, react, react-dom, tailwind-merge, description (+16 more)

### Community 25 - "Community 25"
Cohesion: 0.13
Nodes (16): CtrlButton(), Emulator(), GhostKey(), ChevronDown(), ChevronLeft(), ChevronRight(), ChevronUp(), FocusIcon() (+8 more)

### Community 26 - "Community 26"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 27 - "Community 27"
Cohesion: 0.22
Nodes (3): LensApp(), Screen, TILES

### Community 32 - "Community 32"
Cohesion: 0.17
Nodes (11): aligned, candidate, CURRENT, down, drifted, left, right, s (+3 more)

## Knowledge Gaps
- **236 isolated node(s):** `$schema`, `target`, `lib`, `module`, `moduleResolution` (+231 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 25` to `Community 17`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `clsx` connect `Community 17` to `Community 25`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **What connects `$schema`, `target`, `lib` to the rest of the system?**
  _236 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.11375661375661375 - nodes in this community are weakly interconnected._