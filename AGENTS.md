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

## Hard rules

- **No `Co-Authored-By: Claude`** (or any agent attribution) trailer on commits.
- **No inline CSS** (`style={{}}`) — Tailwind v4 `@theme` tokens + semantic
  classes only.
- **Do not create the public GitHub repo or publish to npm** without the owner's
  explicit go-ahead. CI + Changesets get configured but stay inert until enabled.
- **The additive lens is sacred:** `--color-bg` stays `#000`; no
  glassmorphism/backdrop-blur on the 600×600 on-device surface (that skin is for
  marketing/docs/companion only). Liquid Glass stops at the bezel.
- **RTL from day one:** logical CSS only; never mirror world-anchored components
  (DirectionArrow, Compass, Pin, Reticle) — see PLAN.md "Internationalization."

## Conventions

pnpm (`pnpm@10.8.0`) + turborepo. Mirror the boilerplate's `tsconfig.base.json`,
`turbo.json`, `prettier.config.mjs`, and CI shape (documented in
`START-HERE.md` §3). Run graphify (`graphify update .`) after code changes.
