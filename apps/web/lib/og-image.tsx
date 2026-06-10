import { ImageResponse } from "next/og";

/**
 * Shared Open Graph / Twitter card image for the zone. Re-exported by a thin
 * `opengraph-image.tsx` in each route group ((web) and (docs)) — a metadata
 * image file must live in a segment that has a layout, and this app has a
 * separate root layout per route group (no shared app/layout.tsx), so the file
 * can't sit at the bare app/ root.
 *
 * NOTE: ImageResponse renders via satori, not the DOM — it does not consume the
 * app's Tailwind `@theme` tokens, so styling uses satori's `tw` prop with
 * literal brand hexes (and `style` only for the grid gradient `tw` can't
 * express). This is the OG generator, exempt from the app's no-inline-CSS rule.
 */
export const alt =
  "GlassKit UI — the open-source React component library for Meta Ray-Ban Display";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function OgImage() {
  return new ImageResponse(
    (
      <div
        tw="flex h-full w-full flex-col justify-between bg-[#08090b] p-20"
        style={{
          backgroundImage:
            "linear-gradient(#1f2125 1px, transparent 1px), linear-gradient(90deg, #1f2125 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      >
        <div tw="flex items-center">
          <div tw="h-14 w-14 rounded-2xl bg-[#36e27f]" />
          <div tw="ml-4 text-4xl font-bold text-white">GlassKit</div>
        </div>

        <div tw="flex flex-col">
          <div
            tw="text-8xl font-bold text-white"
            style={{ letterSpacing: "-0.03em", lineHeight: 1 }}
          >
            The component library
          </div>
          <div
            tw="text-8xl font-bold"
            style={{
              color: "#36e27f",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            for the glasses.
          </div>
        </div>

        <div tw="text-3xl text-[#80858e]">
          Open source · Meta Ray-Ban Display · glasskit.app/ui
        </div>
      </div>
    ),
    { ...size },
  );
}
