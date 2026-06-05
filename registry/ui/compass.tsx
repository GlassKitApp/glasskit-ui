import type { ReactNode } from "react";
import { cn } from "../lib/utils";

const DIRS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

/** Nearest cardinal/intercardinal label for a heading in degrees. */
export function cardinal(deg: number): string {
  const d = ((deg % 360) + 360) % 360;
  return DIRS[Math.round(d / 45) % 8]!;
}

/**
 * <Compass> — a heading rose that keeps North pointing at real north while a
 * fixed top marker shows where you face. Feed `heading` from
 * useDeviceOrientation (alpha).
 *
 * WORLD-ANCHORED — never mirror under RTL. The rose counter-rotates via the SVG
 * `transform` attribute (absolute), so the spatial mapping is preserved in any
 * writing direction.
 */
export function Compass({
  heading,
  label,
  className,
}: {
  heading: number;
  label?: ReactNode;
  className?: string;
}) {
  const deg = ((heading % 360) + 360) % 360;
  return (
    <div className={cn("gk-compass", className)}>
      <svg
        viewBox="0 0 100 100"
        className="gk-compass__dial"
        role="img"
        aria-label={`Heading ${Math.round(deg)} degrees ${cardinal(deg)}`}
      >
        <circle cx="50" cy="50" r="46" className="gk-compass__ring" />
        {/* fixed marker at the top = the direction you face */}
        <path d="M50 4 L46 13 L54 13 Z" className="gk-compass__marker" />
        {/* the rose counter-rotates so cardinals stay world-aligned */}
        <g transform={`rotate(${-deg} 50 50)`}>
          <text x="50" y="22" className="gk-compass__n">
            N
          </text>
          <text x="80" y="53" className="gk-compass__tick">
            E
          </text>
          <text x="50" y="84" className="gk-compass__tick">
            S
          </text>
          <text x="20" y="53" className="gk-compass__tick">
            W
          </text>
        </g>
      </svg>
      <span className="gk-compass__label t-caption">
        {Math.round(deg)}° {cardinal(deg)}
        {label != null ? <> · {label}</> : null}
      </span>
    </div>
  );
}
