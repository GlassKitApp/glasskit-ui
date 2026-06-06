import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

/**
 * ui.glasskit.app — modified Next.js 16.
 *
 * `cacheComponents` is intentionally left OFF (default) for now: the site is a
 * mostly-static marketing + docs surface, so the simpler prerender model is a
 * better fit than the `use cache` / PPR model. Request APIs (`params`,
 * `searchParams`, `cookies`, `headers`) are async in Next 16 regardless — always
 * `await` them.
 *
 * No `basePath`: glasskit-ui is served as the `/ui` zone of glasskit.app via
 * Vercel Microfrontends (which doesn't support basePath) — routes stay
 * root-relative and the umbrella maps the prefix at cutover.
 */
const nextConfig: NextConfig = {
  // The glasses SDK ships pre-built ESM; no transpilePackages needed.
};

// fumadocs-mdx — processes content/docs/*.mdx into the typed `.source` loader.
const withMDX = createMDX();

export default withMDX(nextConfig);
