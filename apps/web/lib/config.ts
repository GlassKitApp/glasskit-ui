/** Shared site constants. */
export const GITHUB = "https://github.com/GlassKitApp/glasskit-ui";

/** The Next.js `basePath` this zone is mounted under (glasskit.app/ui).
 *  Must match `basePath` in next.config.ts. `next/link` + `_next/*` assets get
 *  this automatically; use it to manually prefix raw `public/` asset URLs
 *  (`next/image` src, plain `<img>`) which Next does NOT auto-prefix. */
export const BASE_PATH = "/ui";

/** Canonical public URL of this zone, INCLUDING the `/ui` base path — used for
 *  absolute links like the QR deep link to a live preview. */
export const SITE = `https://glasskit.app${BASE_PATH}`;
