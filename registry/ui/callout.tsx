import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Callout> — a world-object annotation: a small anchor at a screen point with a
 * vertical leader line up to an emitted label (no box — additive translates the
 * card to line + type). `x`/`y` are 0–100 (% of the lens).
 *
 * WORLD-ANCHORED — placed by an SVG `transform="translate()"` *attribute*, so it
 * never mirrors under RTL. The leader is vertical (no inline-direction), keeping
 * the annotation tied to its real-world point in any writing direction.
 */
export function Callout({
  x,
  y,
  label,
  detail,
  className,
}: {
  /** 0–100, % of the lens width. */
  x: number;
  /** 0–100, % of the lens height. */
  y: number;
  label: ReactNode;
  detail?: ReactNode;
  className?: string;
}) {
  const cx = Math.round((x / 100) * 600);
  const cy = Math.round((y / 100) * 600);
  return (
    <svg
      viewBox="0 0 600 600"
      className={cn("gk-worldlayer", className)}
      role="img"
      aria-label={typeof label === "string" ? label : "Annotation"}
    >
      <g transform={`translate(${cx} ${cy})`}>
        <circle r={6} className="gk-callout__anchor" />
        <line x1={0} y1={0} x2={0} y2={-46} className="gk-callout__leader" />
        {detail != null ? (
          <text y={-82} className="gk-callout__detail">
            {detail}
          </text>
        ) : null}
        <text y={-58} className="gk-callout__label">
          {label}
        </text>
      </g>
    </svg>
  );
}
