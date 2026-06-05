import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

/**
 * Unit tests for the registry spine components. jsdom so we can assert on
 * rendered DOM/behavior (not computed styles — those are verified live).
 * Aliases mirror tsconfig so tests resolve `@registry/*` and the components'
 * React from this app's copy.
 */
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    include: ["__tests__/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@registry": fileURLToPath(new URL("../../registry", import.meta.url)),
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
});
