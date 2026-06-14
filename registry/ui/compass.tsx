"use client";

import type { ReactNode } from "react";
import { useDeviceOrientation } from "@glasskit-ui/react";
import { cn } from "../lib/utils";
import { normalizeDeg } from "../lib/geo";

const DIRS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

/** Nearest cardinal/intercardinal label for a heading in degrees. */
export function cardinal(deg: number): string {
  return DIRS[Math.round(normalizeDeg(deg) / 45) % 8]!;
}

/**
 * <Compass> — a heading rose that keeps North pointing at real north while a
 * fixed top marker shows where you face. Self-connects to
 * useDeviceOrientation; pass `heading` to control it instead (the prop always
 * wins, e.g. for demos or your own sensor fusion).
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
  /** Controlled heading in degrees. Omit to read the live head orientation. */
  heading?: number;
  label?: ReactNode;
  className?: string;
}) {
  // Always subscribed (rules of hooks); the controlled prop wins afterwards.
  // Server render and first client render both see alpha === null → 0, so
  // the live mode is hydration-safe.
  const live = useDeviceOrientation();
  const deg = normalizeDeg(heading ?? live.alpha ?? 0);
  return (
    <div
      className={cn("flex flex-col items-center gap-[18px]", className)}
    >
      <svg
        viewBox="0 0 100 100"
        className="gk-compass__dial"
        role="img"
        aria-label={`Heading ${Math.round(deg)} degrees ${cardinal(deg)}`}
      >
        <circle cx="50" cy="50" r="45" className="gk-compass__ring" />
        <circle cx="50" cy="50" r="36" className="gk-compass__inner" />
        {/* fixed bearing marker on the outer rim = the direction you face */}
        <path d="M50 3 L46 12 L54 12 Z" className="gk-compass__marker" />
        {/* the rose counter-rotates so cardinals stay world-aligned; they sit on
            an inner ring, clear of the rim marker so nothing overlaps */}
        <g transform={`rotate(${-deg} 50 50)`}>
          <text x="50" y="22" className="gk-compass__n">
            N
          </text>
          <text x="78" y="51" className="gk-compass__tick">
            E
          </text>
          <text x="50" y="80" className="gk-compass__tick">
            S
          </text>
          <text x="22" y="51" className="gk-compass__tick">
            W
          </text>
        </g>
        {/* fixed center readout (does not rotate) */}
        <text x="50" y="47" className="gk-compass__deg">
          {Math.round(deg)}°
        </text>
        <text x="50" y="61" className="gk-compass__card">
          {cardinal(deg)}
        </text>
      </svg>
      {label != null ? (
        <span className="t-caption tabular-nums text-muted-foreground">
          {label}
        </span>
      ) : null}
    </div>
  );
}
