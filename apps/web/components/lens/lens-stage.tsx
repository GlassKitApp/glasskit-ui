import type { ReactNode } from "react";

/**
 * A compact, fitted preview of a 600×600 lens — scaled to a clean rounded
 * device tile (`.lens-tile`) so the sparse additive content reads like a
 * glasses screen, not a small component lost in a big black box. `device` adds
 * a quiet action (the "open on your glasses" QR) below; `caption` is optional.
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
    <figure className="flex flex-col items-center gap-3">
      <div className="lens-tile ring-1 ring-white/10">{children}</div>
      {caption || device ? (
        <figcaption className="flex items-center gap-3">
          {caption ? <span className="mono-label">{caption}</span> : null}
          {device}
        </figcaption>
      ) : null}
    </figure>
  );
}
