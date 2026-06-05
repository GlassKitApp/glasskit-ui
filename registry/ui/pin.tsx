import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Pin> — a world-anchored waypoint marker: a ring + dot at a screen point with
 * the name and distance stacked above. `x`/`y` are 0–100 (% of the lens),
 * projected by the consumer from the world position.
 *
 * WORLD-ANCHORED — placed by an SVG `transform="translate()"` *attribute* (not
 * inline style), absolute, so it is never mirrored under RTL: a flipped pin sits
 * over the wrong thing. The overlay is non-interactive (pointer-events: none).
 */
export function Pin({
  x,
  y,
  label,
  distance,
  className,
}: {
  /** 0–100, % of the lens width. */
  x: number;
  /** 0–100, % of the lens height. */
  y: number;
  label?: ReactNode;
  distance?: ReactNode;
  className?: string;
}) {
  const cx = Math.round((x / 100) * 600);
  const cy = Math.round((y / 100) * 600);
  return (
    <svg
      viewBox="0 0 600 600"
      className={cn("gk-worldlayer", className)}
      role="img"
      aria-label={typeof label === "string" ? label : "Waypoint"}
    >
      <g transform={`translate(${cx} ${cy})`}>
        {distance != null ? (
          <text y={-46} className="gk-pin__dist">
            {distance}
          </text>
        ) : null}
        {label != null ? (
          <text y={-26} className="gk-pin__label">
            {label}
          </text>
        ) : null}
        <circle r={14} className="gk-pin__ring" />
        <circle r={5} className="gk-pin__dot" />
      </g>
    </svg>
  );
}
