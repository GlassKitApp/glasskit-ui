import { BASE_PATH } from "@/lib/config";

/**
 * GlassKit brand mark — avatar tile + wordmark. Shared by ProductNav and
 * ProductFooter so the lockup stays identical in both. Returns the inner
 * img+wordmark; the caller supplies the wrapper (an `<a>` in the nav, a `<div>`
 * in the footer) and its layout/gap classes.
 */
export function BrandLockup() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${BASE_PATH}/avatar.png`}
        alt=""
        className="size-6 rounded-[5px]"
      />
      {/* Weight pinned to 700 to match the parent glasskit app's wordmark:
          the `.font-display` class forces font-weight:800 (unlayered, so it
          beats a `font-bold` utility), which rendered heavier than the parent.
          Inline style wins over the class without touching global headings. */}
      <span
        className="font-display text-[15px] tracking-[-0.02em] text-ink"
        style={{ fontWeight: 700 }}
      >
        GlassKit
      </span>
    </>
  );
}
