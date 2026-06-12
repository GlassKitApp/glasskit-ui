---
"@glasskit-ui/cli": patch
---

Printed commands speak the invoking package manager's dialect: run init via
`pnpm dlx` and the instructions say `pnpm add` / `pnpm dlx`; via `npx` they
say `npm install` / `npx`; via `bunx`, `bun add` / `bunx`. Docs and READMEs
unify on the npm voice (the lowest common denominator) with install tabs
where it's a real dependency.
