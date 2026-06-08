# glasskit-ui — agent guide

This is the public OSS monorepo for the GlassKit UI ecosystem. **Read
[`START-HERE.md`](./START-HERE.md) first**, then [`PLAN.md`](./PLAN.md) for the
full strategy and 7-phase plan.

## Before you build

- **`apps/web` is a modified Next.js 16.** APIs, conventions, and file structure
  may differ from your training data. Read the relevant guide in
  `node_modules/next/dist/docs/` before writing any Next code, and heed
  deprecation notices.
- The SDK to extract lives in a sibling repo:
  `/Users/jarrius/Documents/GitHub/glasskit-boilerplate/packages/glasses-ui`.
  Preserve its public API verbatim (see `START-HERE.md` §2).
- **Component aesthetic = [`docs/design/meta-hud-language.md`](./docs/design/meta-hud-language.md)** —
  the current, owner-approved visual language (2026-06): a calm dark base, **popping
  surfaces**, and **tasteful gradient icon plates**. Build styled components to that
  spec. [`docs/design/apple-feel.md`](./docs/design/apple-feel.md) is the earlier
  additive-lens reference (type ramp, motion, RTL still apply); where the two
  conflict on fills/gradients/`#000`, the Meta-HUD spec wins.

## Hard rules

- **No `Co-Authored-By: Claude`** (or any agent attribution) trailer on commits.
- **No inline CSS** (`style={{}}`) — Tailwind v4 `@theme` tokens + semantic
  classes only.
- **Do not create the public GitHub repo or publish to npm** without the owner's
  explicit go-ahead. CI + Changesets get configured but stay inert until enabled.
- **Premium-surfaces direction (supersedes the old "additive lens is sacred"
  rule).** The owner chose a premium app-UI look over literal see-through-device
  truth (2026-06): a calm dark base (`#0b0e16`→`#090b11`, faint cool top
  highlight), surfaces that *pop* (top-lit gradient fill + 1px light edge + soft
  depth), and gradient icon plates. Pure `#000`-transparency, "no fills", and "no
  shadows/gradients on the 600×600 surface" no longer apply — that was the
  additive model, now history. Still avoid `backdrop-filter`/blur on the lens
  content itself (use surface fills, not frosted glass). See
  `docs/design/meta-hud-language.md`.
- **RTL from day one:** logical CSS only; never mirror world-anchored components
  (DirectionArrow, Compass, Pin, Reticle) — see PLAN.md "Internationalization."

## Conventions

pnpm (`pnpm@10.8.0`) + turborepo. Mirror the boilerplate's `tsconfig.base.json`,
`turbo.json`, `prettier.config.mjs`, and CI shape (documented in
`START-HERE.md` §3). Run graphify (`graphify update .`) after code changes.
