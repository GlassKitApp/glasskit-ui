# glasskit-ui

The public, open-source monorepo for the **GlassKit UI** ecosystem — the
ergonomic React layer for **Meta Ray-Ban Display** apps that Meta does not ship.

What this repo will hold (see [`PLAN.md`](./PLAN.md) for the full strategy):

- **`@glasskit/glasses-ui`** — the published npm SDK: the 5 sensor/gesture hooks,
  the `GlassViewport` primitive, the glasses-tuned spatial focus engine
  (`useDpad`/`scoreRect`), and the additive-display base stylesheet.
- **A shadcn-style registry** — styled components, optics-tuned presets, and
  generic blocks, vendored via `npx glasskit add …`.
- **`ui.glasskit.app`** (`apps/web`) — the Next.js + fumadocs docs/marketing site
  with a live in-browser glasses emulator powering component previews.

The paid **Starter Kit** (the `glasskit-boilerplate` repo) repositions as the
production app you build *on top of* this free SDK; **Studio** (pay-per-use
no-code builder) is the downstream consumer — both out of scope here.

## Status

🌱 **Bootstrapped.** This folder currently contains only:

- `PLAN.md` — the complete, verbatim ecosystem plan (strategy → 7 phases).
- `START-HERE.md` — the build kickoff: locked decisions, the exact SDK to
  extract, verified monorepo conventions, npm-publish build decisions, and the
  deferred outward actions. **Read this first.**
- `AGENTS.md` / `CLAUDE.md` — agent constraints for this repo.

No code scaffold yet — **Phase 1 (scaffold) and Phase 2 (SDK extraction) are the
first build steps**, to be done natively in this repo. See `START-HERE.md`.

## Governance

Public for contribution (fork + PR), but **owner-only merge to `main`** (branch
protection + `CODEOWNERS`). Automated npm releases via Changesets: betas on PRs,
official on merge — wired up in Phase 1, but **not live until explicitly enabled**.
