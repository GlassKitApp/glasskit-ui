import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

/**
 * @glasskit/glasses-ui ESLint — TypeScript + React (hooks rules
 * apply to GlassViewport + the sensor / dpad hooks).
 *
 * Library code targets the browser (Vite consumers, on-glasses
 * runtime) so browser globals are the right baseline.
 *
 * Run: `pnpm --filter @glasskit/glasses-ui lint`
 */
export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
);
