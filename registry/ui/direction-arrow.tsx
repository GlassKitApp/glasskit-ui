"use client";

import type { ReactNode } from "react";
import { useDeviceOrientation, useGeolocation } from "@glasskit-ui/react";
import { cn } from "../lib/utils";
import {
  bearingBetween,
  normalizeDeg,
  relativeBearing,
  type LatLon,
} from "../lib/geo";

/**
 * <DirectionArrow> — points toward a real-world direction. Three modes:
 *   - `bearing` — controlled: you computed the screen angle yourself
 *   - `target`  — self-connects: live GPS + head orientation aim the needle
 *                 at a {lat, lon} (bearing wins if both are given)
 *   - neither   — points up until a sensor mode is chosen
 *
 * WORLD-ANCHORED — never mirror under RTL (safety: a flipped arrow points the
 * wrong way). The needle rotates via the SVG `transform` *attribute* (absolute,
 * unaffected by `dir`), not an inline style and not a logical transform.
 */
export function DirectionArrow({
  bearing,
  target,
  label,
  className,
}: {
  /** Controlled screen angle in degrees (0 = up, clockwise). Always wins. */
  bearing?: number;
  /** Aim at a world coordinate using live geolocation + head orientation. */
  target?: LatLon;
  /** Optional caption (e.g. street name). */
  label?: ReactNode;
  className?: string;
}) {
  // Always subscribed (rules of hooks); precedence is bearing > target > 0.
  // Sensors start null on the server and first client render → deterministic
  // 0° until real data arrives, so live mode is hydration-safe.
  const { position } = useGeolocation();
  const { alpha } = useDeviceOrientation();
  const live =
    target && position
      ? relativeBearing(bearingBetween(position, target), alpha ?? 0)
      : 0;
  const deg = normalizeDeg(bearing ?? live);
  return (
    <div
      className={cn("flex flex-col items-center gap-[18px]", className)}
    >
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
        <span className="t-caption text-muted-foreground">{label}</span>
      ) : null}
    </div>
  );
}
