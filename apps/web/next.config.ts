import type { NextConfig } from "next";

/**
 * ui.glasskit.app — modified Next.js 16.
 *
 * `cacheComponents` is intentionally left OFF (default) for now: the site is a
 * mostly-static marketing + docs surface, so the simpler prerender model is a
 * better fit than the `use cache` / PPR model. Request APIs (`params`,
 * `searchParams`, `cookies`, `headers`) are async in Next 16 regardless — always
 * `await` them.
 */
const nextConfig: NextConfig = {
  // The glasses SDK ships pre-built ESM; no transpilePackages needed.
};

export default nextConfig;
