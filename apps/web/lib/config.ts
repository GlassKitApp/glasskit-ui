/** Shared site constants. */
export const GITHUB = "https://github.com/GlassKitApp/glasskit-ui";

/** Umbrella social + org links — shared by ProductNav and ProductFooter so the
 *  handles live in one place (and travel together into the future shared nav
 *  package). */
export const GITHUB_ORG = "https://github.com/GlassKitApp";
export const DISCORD_URL = "https://discord.gg/DRe5SmSjyE";
export const X_URL = "https://x.com/JarJarMadeIt";

/** The Next.js `basePath` this zone is mounted under (glasskit.app/ui).
 *  Must match `basePath` in next.config.ts. `next/link` + `_next/*` assets get
 *  this automatically; use it to manually prefix raw `public/` asset URLs
 *  (`next/image` src, plain `<img>`) which Next does NOT auto-prefix. */
export const BASE_PATH = "/ui";

/** Umbrella origin (the shared domain both zones live on). `metadataBase` is set
 *  to this ORIGIN — not `SITE` — so Next composes auto-generated metadata image
 *  routes (which already carry the `/ui` basePath) without double-prefixing.
 *  Overridable at build time so a staging deploy's QR codes point at itself
 *  (the glasses need a public HTTPS URL, so localhost is never useful here). */
export const ORIGIN =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://glasskit.app";

/** Canonical public URL of this zone, INCLUDING the `/ui` base path — used for
 *  absolute links like the QR deep link to a live preview, and for every
 *  canonical / OG URL so they resolve unambiguously under basePath. */
export const SITE = `${ORIGIN}${BASE_PATH}`;
