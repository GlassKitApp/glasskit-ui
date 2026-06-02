/**
 * Shared Prettier config for every workspace.
 *
 * Run from the repo root:
 *   pnpm format        # write
 *   pnpm format:check  # check (CI-friendly)
 *
 * Per-workspace overrides aren't supported here on purpose — one
 * codebase, one style. If you disagree with a default, edit it once
 * here and `pnpm format` reflows everything.
 */
export default {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  tabWidth: 2,
  printWidth: 80,
  arrowParens: "always",
};
