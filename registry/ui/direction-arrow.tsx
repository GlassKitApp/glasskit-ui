import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <DirectionArrow> — points toward a real-world `bearing` (degrees, 0 = up/N,
 * clockwise). Feed it a bearing computed from useGeolocation + the target, or
 * useDeviceOrientation for head-relative aiming.
 *
 * WORLD-ANCHORED — never mirror under RTL (safety: a flipped arrow points the
 * wrong way). The needle rotates via the SVG `transform` *attribute* (absolute,
 * unaffected by `dir`), not an inline style and not a logical transform.
 */
export function DirectionArrow({
  bearing,
  label,
  className,
}: {
  bearing: number;
  /** Optional caption (e.g. street name). */
  label?: ReactNode;
  className?: string;
}) {
  const deg = ((bearing % 360) + 360) % 360;
  return (
    <div className={cn("gk-direction", className)}>
      <svg
        viewBox="0 0 100 100"
        className="gk-direction__dial"
        role="img"
        aria-label={`Bearing ${Math.round(deg)} degrees`}
      >
        <circle cx="50" cy="50" r="40" className="gk-direction__ring" />
        <g transform={`rotate(${deg} 50 50)`}>
          <path
            d="M50 22 L67 70 L50 60 L33 70 Z"
            className="gk-direction__needle"
          />
        </g>
      </svg>
      {label != null ? (
        <span className="gk-direction__label t-caption">{label}</span>
      ) : null}
    </div>
  );
}
