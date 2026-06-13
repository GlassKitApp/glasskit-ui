import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <MediaThumb> — a photo / reel tile (Photos, Instagram). A rounded media tile
 * with an optional duration pill and a caption overlay. Pass an <img> as `src`,
 * or it falls back to a gradient placeholder. Compose in a grid (or a masonry
 * `gk-gallery`) for a gallery; pass `onSelect` to make the tile D-pad-focusable
 * and fire it on Enter.
 */
export function MediaThumb({
  src,
  alt = "",
  label,
  duration,
  aspect = "square",
  onSelect,
  className,
}: {
  /** Image URL. */
  src?: string;
  alt?: string;
  /** Optional caption overlay. */
  label?: ReactNode;
  /** Optional duration pill (e.g. "0:14"). */
  duration?: ReactNode;
  aspect?: "square" | "portrait";
  /** When set, the tile becomes a focusable button and fires this on Enter. */
  onSelect?: () => void;
  className?: string;
}) {
  const cls = cn(
    "gk-mediathumb",
    `gk-mediathumb--${aspect}`,
    onSelect && "focusable",
    className,
  );
  const inner = (
    <>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="gk-mediathumb__img" src={src} alt={alt} />
      ) : (
        <span className="gk-mediathumb__ph gk-grad-violet" aria-hidden="true" />
      )}
      {duration != null ? (
        <span className="gk-mediathumb__dur t-caption">{duration}</span>
      ) : null}
      {label != null ? (
        <span className="gk-mediathumb__label t-caption">{label}</span>
      ) : null}
    </>
  );

  if (onSelect) {
    return (
      <button type="button" className={cls} onClick={onSelect}>
        {inner}
      </button>
    );
  }
  return <div className={cls}>{inner}</div>;
}
