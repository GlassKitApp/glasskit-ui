import { defineConfig } from "tsup";

/** Build the CLI to a single ESM bin. The entry's shebang is preserved. */
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: false,
  sourcemap: false,
  clean: true,
  target: "node18",
});
