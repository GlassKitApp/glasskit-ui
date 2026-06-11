#!/usr/bin/env node
/**
 * create-glasskit — the `npm create glasskit` entry point. A thin shim that
 * delegates to `@glasskit-ui/cli init` (the real scaffolder), so the two can
 * never drift: this package owns the unscoped create-* name, the CLI owns
 * the behavior.
 */
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const cli = require.resolve("@glasskit-ui/cli/dist/index.js");

const result = spawnSync(
  process.execPath,
  [cli, "init", ...process.argv.slice(2)],
  { stdio: "inherit" },
);
process.exit(result.status ?? 1);
