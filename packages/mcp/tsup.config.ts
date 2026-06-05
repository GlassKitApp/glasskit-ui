import { defineConfig } from "tsup";

/** Build the MCP server to an ESM bin. SDK + zod stay external (from node_modules). */
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: false,
  sourcemap: false,
  clean: true,
  target: "node18",
});
