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
 * `basePath: '/ui'`: glasskit-ui is served as the `/ui` zone of glasskit.app
 * via Next.js Multi-Zones. The parent `glasskit` app rewrites `/ui` + `/ui/:path*`
 * to this deployment, and `basePath` makes every route, `next/link`, and
 * `_next/*` asset resolve under `/ui` so they don't collide with the parent.
 * (Vercel Microfrontends was considered but rejected — it forbids `basePath`
 * and locks routing to Vercel; Multi-Zones is host-portable.)
 *
 * NOTE: `basePath` is NOT applied to `next/image` src, raw `public/` paths, or
 * metadata URLs — those are prefixed manually (see `BASE_PATH`/`SITE` in
 * `lib/config.ts`). Keep this `/ui` in sync with the parent's rewrite + `SITE`.
 */
const nextConfig: NextConfig = {
  basePath: "/ui",
  // The glasses SDK ships pre-built ESM; no transpilePackages needed.
};

// fumadocs-mdx — processes content/docs/*.mdx into the typed `.source` loader.
const withMDX = createMDX();

export default withMDX(nextConfig);
