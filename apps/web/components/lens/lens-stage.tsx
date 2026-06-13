import type { ReactNode } from "react";

/**
 * The framed preview stage: the 600×600 lens as a calm dark device tile, set
 * in the site's blueprint chrome — a hard 1px frame, the tile floating on a
 * faint dot grid, and a slim instrument bar beneath. The bar carries the
 * caption (start) and the "run on glasses" control (end), so nothing ever
 * floats over the lens surface itself.
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
    <figure className="mx-auto w-fit max-w-full border border-line-2 bg-bg">
      <div className="flex justify-center bg-[radial-gradient(var(--line-2)_1px,transparent_1px)] bg-[size:22px_22px] p-7">
        <div className="lens-tile ring-1 ring-white/10">{children}</div>
      </div>
      <figcaption className="border-t border-line-2">
        {device ? (
          // The "run on glasses" CTA owns the whole bar.
          device
        ) : (
          <span className="mono-label flex px-3.5 py-2.5">
            {caption ?? "600 × 600 · live"}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
