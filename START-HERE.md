# START HERE — glasskit-ui build kickoff

You are the agent picking up this repo in its own Conductor workspace. This doc
captures everything already researched so you start Phase 1 with **zero context
loss**. The full strategy + 7-phase plan is in [`PLAN.md`](./PLAN.md); this file
is the operational "how to begin."

---

## 0. How this repo was set up

Created as a standalone git repo (branch `main`) so it can be opened as its own
Conductor project — **separate** from the `adelaide` marketing repo. Only git +
these docs exist; **no code scaffold yet**. Phase 1 (scaffold) and Phase 2 (SDK
extraction) are your first build steps, done natively here.

This repo is the `glasskit-ui` of the plan and lives at
`/Users/jarrius/Documents/GitHub/glasskit-ui` — a **sibling** to
`glasskit-boilerplate` (the SDK source) and `glasskit` (marketing/`adelaide`).

---

## 1. Locked decisions (from brainstorming — do not relitigate)

| Decision | Choice |
|---|---|
| Altitude | One free SDK foundation first; boilerplate repositioned on top; Studio is a downstream consumer (out of scope) |
| Component model | Headless logic only where real logic exists + a styled layer; styled components vendored via a shadcn-style registry |
| Packaging | npm package `@glasskit/glasses-ui` (hooks + primitives + base styles); styled components/presets/blocks via the registry |
| Repo | This **new public monorepo** `GlassKitApp/glasskit-ui`, pnpm + turborepo → publishes to npm |
| Site | Separate `ui.glasskit.app` = this monorepo's own Next.js + fumadocs site (`apps/web`), fully OSS |
| Docs | fumadocs (reuse the proven setup from `adelaide`) |
| Package manager | **pnpm** (required), `pnpm@10.8.0`, Node `>=20` (CI uses 22) |

---

## 2. The SDK to extract (Phase 2) — source of truth

**Source:** `/Users/jarrius/Documents/GitHub/glasskit-boilerplate/packages/glasses-ui`
(tiny + clean: 5 source files + 2 test files; tests come with it).

Files to migrate:
- `src/index.ts` — public barrel
- `src/GlassViewport.tsx` — the 600×600 primitive
- `src/dpad.tsx` — `useDpad`, `seedFocus`, `scoreRect`, `type Dir`
- `src/sensors.ts` — the 4 sensor/gesture hooks + `orientationEqual`/`motionEqual`
- `src/styles.css` — Tailwind v4 `@theme` tokens + `@apply` semantic classes
- `src/dpad.test.ts`, `src/sensors.test.ts` — **already exist; extraction inherits them**

**Public API to preserve VERBATIM** (the moat — don't change signatures):
- Primitive: `<GlassViewport frame?>` (600×600 root)
- Hooks: `useDpad()`, `useNeuralBand()`, `useDeviceOrientation()`,
  `useDeviceMotion()`, `useGeolocation()`
- Helpers: `scoreRect(cur, cand, dir)`, `seedFocus()`, `orientationEqual()`,
  `motionEqual()`, `type Dir`
- Stylesheet classes: `.glass-viewport(.--frame)`, `.screen`, `.focusable`,
  `.app-head`, `.app-meta`, `.row`, `.readout`, `.label`, `.dim`,
  `.launcher(.-title/.-tagline/.-grid)`, `.launcher-card(.__label/.__tagline)`
- Theme tokens: `--color-bg:#000` (MUST stay black), `--color-ink`,
  `--color-ink-dim`, `--color-accent` (phosphor green `#36e27f`, swappable),
  `--color-surface`, `--color-rule`, `--color-room`, `--font-sans`

**What the source reveals (already read):**
- Sensor hooks are thin wrappers over **standard W3C Web APIs**
  (`deviceorientation`/`devicemotion` window events;
  `navigator.geolocation.watchPosition`) — no proprietary SDK. *Asserted in
  source, not hardware-verified* → Phase 0.
- D-pad = arrow keys + Enter on `.focusable` — **exactly Meta's documented web
  convention**. GlassKit is already a *superset* of `.focusable`, not a fork.
- `useNeuralBand` listens for a GlassKit-defined `neuralband` `CustomEvent` —
  on-device, *something must dispatch it*. The one genuinely unconfirmed seam →
  Phase 0.
- `scoreRect` is a v0 (center-to-center + 2× perpendicular-drift penalty, 1px
  threshold). Benchmark vs Norigin/LRUD before hardening (later phase).

---

## 3. Monorepo conventions to mirror (verified from the boilerplate)

The boilerplate is a working pnpm + turborepo — reuse its proven shape:

- **Root `package.json`:** `"packageManager": "pnpm@10.8.0"`, `"engines": { node
  ">=20.0.0", pnpm ">=9.0.0" }`; scripts delegate to turbo (`dev`/`build`/`lint`/
  `typecheck`/`test`), plus `format`/`format:check` (prettier); devDeps include
  `turbo ^2.5`, `typescript ^5.7`, `prettier ^3.3`, `@types/node ^22`.
- **`pnpm-workspace.yaml`:** glob `apps/*` and `packages/*`.
- **`turbo.json`:** `ui: "tui"`; tasks `dev` (cache:false, persistent), `build`
  (`dependsOn: ["^build"]`, outputs `dist/**` + `.next/**`), `typecheck`
  (`dependsOn: ["^build"]`), `lint`, `test`.
- **`tsconfig.base.json`:** `target ES2022`, `lib [ES2023, DOM, DOM.Iterable]`,
  `module ESNext`, `moduleResolution Bundler`, `jsx react-jsx`, `strict`,
  `noUncheckedIndexedAccess`, `noUnusedLocals/Parameters`, `esModuleInterop`,
  `resolveJsonModule`, `isolatedModules`, `verbatimModuleSyntax`, `skipLibCheck`,
  `noEmit`.
- **`prettier.config.mjs`:** semi, double-quotes, trailing-comma all, tabWidth 2,
  printWidth 80, arrowParens always.
- **CI pattern (`.github/workflows/ci.yml`):** `pnpm/action-setup@v4` (reads
  `packageManager`, no version pin), `actions/setup-node@v4` node 22 cache pnpm,
  `pnpm install --frozen-lockfile`, then `lint` / `typecheck` / `test` / `build`
  via turbo. (The boilerplate gates typecheck/build on Convex codegen — **not
  relevant here**, this repo has no Convex.)
- `.gitignore`: node_modules, dist, .next, out, build, .turbo, .env*, .DS_Store,
  *.tsbuildinfo, *.log, .vercel.

---

## 4. NEW build decisions for npm publish (this is where this repo differs)

The boilerplate ships the package as **raw `.ts` via `workspace:*`** — no build
step. To publish to npm you must add a real build:

- **Bundler: tsup** (esbuild + dts). Emit **ESM** + `.d.ts` (consumers are Vite +
  Next 16, both ESM-native). `external: ['react','react-dom']`. tsconfig `jsx:
  react-jsx` means no React import needed in components.
- **`styles.css` ships RAW — do NOT bundle it.** It contains Tailwind v4
  `@theme`/`@apply` that the *consumer's* Tailwind pipeline must process. Keep it
  at the package root, reference it directly in `exports` + `files` (no transform).
- **Subpath exports** (plan wants "pull just hooks"):
  ```jsonc
  "exports": {
    ".":            { "types": "./dist/index.d.ts",            "import": "./dist/index.js" },
    "./hooks":      { "types": "./dist/hooks/index.d.ts",      "import": "./dist/hooks/index.js" },
    "./primitives": { "types": "./dist/primitives/index.d.ts", "import": "./dist/primitives/index.js" },
    "./styles.css": "./styles.css"
  }
  ```
- **`package.json` for publish:** drop `"private": true`; set `"type": "module"`,
  `"sideEffects": ["*.css"]`, `"files": ["dist", "styles.css", "README.md"]`,
  `"publishConfig": { "access": "public", "provenance": true }`, peer
  `react`/`react-dom` `^19`, `"version": "0.1.0"`.
- **Suggested `src/` reorg** (keeps the public API identical, sets up Phase 4):
  `src/primitives/GlassViewport.tsx`, `src/hooks/{dpad.tsx,sensors.ts}` (+ the two
  tests), barrels `src/primitives/index.ts` / `src/hooks/index.ts`, root
  `src/index.ts` re-exporting both. Update the test relative imports accordingly.
  `components/` + `ai/` come in Phase 4.

---

## 5. Phase 0 — hardware gate (OWNER's manual step; doesn't block the build)

Needs a real **Meta Ray-Ban Display**. Confirm in the web runtime:
(a) `deviceorientation`/`devicemotion` fire and `navigator.geolocation` resolves;
(b) **what the platform emits for Neural Band pinch/swipe** — i.e. what should
dispatch the `neuralband` `CustomEvent`. D-pad already matches Meta's convention.
If sensors/gestures aren't exposed, hooks degrade to **emulator-first** and the
headline shifts to focus engine + components + emulator + build/deploy loop. Build
the SDK in parallel regardless.

---

## 6. ⚠️ Boundaries — DO NOT do these without explicit owner go-ahead

- **Do NOT create the public GitHub repo** (`GlassKitApp/glasskit-ui`) yet.
- **Do NOT publish to npm** yet.
- Configure CI + the Changesets release pipeline (so it's ready), but keep it
  **inert** — no live `NPM_TOKEN`, no firing publishes.
- **Pick the OSS license before going public** — not yet chosen. shadcn/ui and
  Radix are MIT; that's the conventional choice for a component library, but it's
  the owner's call. No `LICENSE` file added yet on purpose.
- No `Co-Authored-By: Claude` (or any agent) trailer on commits (owner memory).

---

## 7. Recommended first steps (Phases 1 → 2)

1. **Scaffold the monorepo (Phase 1):** root `package.json`, `pnpm-workspace.yaml`
   (`apps/*`, `packages/*`), `turbo.json`, `tsconfig.base.json`,
   `prettier.config.mjs`, `.gitignore`, `.changeset/config.json`,
   `.github/workflows/{ci,release,beta}.yml`, `.github/CODEOWNERS` (owner on `*`),
   graphify `CLAUDE.md` rules. Mirror §3.
2. **Extract the SDK (Phase 2):** copy the 5 src files + 2 tests from §2 into
   `packages/glasses-ui` (reorg per §4, **API unchanged**), add `tsup.config.ts`,
   the `package.json` exports map (§4), `tsconfig.json` (extends base),
   `vitest.config.ts`, `eslint.config.mjs`, `README.md`.
3. **Verify:** `pnpm install` → `pnpm --filter @glasskit/glasses-ui build` →
   `pnpm test` (the inherited unit tests must pass) → `npm pack` and confirm the
   `.` and subpath exports resolve. Import into a scratch app and confirm the 5
   hooks + `GlassViewport` work; simulate sensors via Chrome DevTools + a
   `neuralband` `CustomEvent`.
4. **graphify:** generate `graphify-out/` and add the graphify `CLAUDE.md` rules
   (mirror `adelaide`); `graphify update .` after code changes (AST-only, no cost).

Then **stop and check in** before Phase 3 (site/emulator) and before any
public-repo / npm action.

---

## 8. Standing constraints during the build

- **Modified Next.js 16** (`AGENTS.md`): read `node_modules/next/dist/docs/`
  before writing any Next code in `apps/web`; heed deprecation notices.
- **No inline CSS** — Tailwind v4 `@theme` tokens + semantic classes only.
- **RTL baked in from day one** — logical CSS (`*-inline`, `text-align:
  start|end`), `dir` on the root; **never mirror world-anchored components**
  (DirectionArrow, Compass, Pin, Reticle) — see PLAN.md "Internationalization."
- Reuse `adelaide`'s fumadocs + Tailwind v4 `@theme` patterns for `apps/web`.
