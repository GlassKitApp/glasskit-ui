# @glasskit-ui/cli

## 0.3.1

### Patch Changes

- 8f1c2f6: Agent guidance now covers navigation and is glasses-first by default. The
  scaffold's AGENTS.md / SKILL.md gain a "glasses-first golden rules" block, a
  prominent "navigation is a history router" section (Navigator, the back
  gesture, history.state restoration, useBackHandler), wayfinding
  (DirectionArrow vs MapView), and component discovery via the MCP (no more
  hardcoded component count). The MCP server gains a `glasskit_guidelines` tool
  so an agent with only the MCP still learns the rules before generating screens.

## 0.3.0

### Minor Changes

- 5ce57e2: `glasskit agents` + the agent skill in every scaffold. New apps ship with
  their AI assistant pre-briefed: `AGENTS.md` (the cross-agent platform
  contract), a Claude Code skill (`.claude/skills/glasskit-ui/SKILL.md`),
  `CLAUDE.md`, a Cursor rule, and Copilot instructions. `glasskit agents`
  writes the same files into an existing project (never overwrites).

### Patch Changes

- dd12702: Printed commands speak the invoking package manager's dialect: run init via
  `pnpm dlx` and the instructions say `pnpm add` / `pnpm dlx`; via `npx` they
  say `npm install` / `npx`; via `bunx`, `bun add` / `bunx`. Docs and READMEs
  unify on the npm voice (the lowest common denominator) with install tabs
  where it's a real dependency.

## 0.2.0

### Minor Changes

- b385107: `init --template relay` — the phone text-relay reference. Scaffolds the
  working answer to free-form text on a platform with no keyboard or mic: the
  lens shows a 6-char pairing code, the wearer's phone opens the relay page,
  enters it, and types; a `useRelayText` hook polls the value in. Includes a
  90-line dependency-free Node relay server (in-memory sessions, 10-minute
  TTL). System dictation swaps in at the same seam if Meta ships it.

## 0.1.0

### Minor Changes

- cfc814d: First release. `@glasskit-ui/cli` (bin: `glasskit`) scaffolds complete Vite +
  React glasses apps with `init` (600×600 + `mrbd-web-app-capable` meta tags,
  GlassViewport + useDpad wired) and vendors registry components with `add`
  (resolves registry dependencies, installs npm dependencies). `@glasskit-ui/mcp`
  exposes the same registry to AI agents over the Model Context Protocol.
