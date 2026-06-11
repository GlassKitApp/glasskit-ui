import type { ReactNode } from "react";

/**
 * A fitted preview of a 600×600 lens, shown as a calm dark device tile so the
 * component reads like a real glasses screen. `device` adds the quiet "open on
 * your glasses" QR below; `caption` is optional.
 */
export function LensStage({
  children,
  caption,
  device,
}: {
  children: ReactNode;
  caption?: ReactNode;
  device?: ReactNode;
}) {
  return (
    <figure className="relative mx-auto flex w-fit flex-col items-center gap-3">
      <div className="lens-tile ring-1 ring-white/10">{children}</div>
      {/* The Meta-logo "add to your glasses" badge sits on the tile corner; its
       * popover escapes the tile's overflow (the figure isn't clipped). */}
      {device ? (
        <div className="absolute end-3 top-3 z-30">{device}</div>
      ) : null}
      {caption ? (
        <figcaption className="flex items-center gap-3">
          <span className="mono-label">{caption}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
