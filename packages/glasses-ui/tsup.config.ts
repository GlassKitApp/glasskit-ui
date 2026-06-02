import { defineConfig } from "tsup";

/**
 * Build for npm publish. The boilerplate shipped this package as raw
 * `.ts` over `workspace:*`; to publish we emit real ESM + `.d.ts`.
 *
 *  - ESM only — every consumer (Vite, Next 16) is ESM-native.
 *  - Three entries → three subpath bundles (`.`, `./hooks`,
 *    `./primitives`) matching the package.json `exports` map.
 *  - React stays external (it's a peer dep); the automatic JSX runtime
 *    (`react/jsx-runtime`) is externalised too so we never inline it.
 *  - `styles.css` is NOT built here — it ships raw from the package
 *    root so the consumer's Tailwind v4 pipeline processes its
 *    `@theme`/`@apply` directives.
 */
export default defineConfig({
  entry: ["src/index.ts", "src/hooks/index.ts", "src/primitives/index.ts"],
  format: ["esm"],
  dts: true,
  // No sourcemaps in the tarball: `files` ships only dist (not src), so maps
  // would carry broken `sources` refs and just bloat the published package.
  sourcemap: false,
  clean: true,
  treeshake: true,
  external: ["react", "react-dom", "react/jsx-runtime"],
});
