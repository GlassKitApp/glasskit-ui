/**
 * Bearing math for world-anchored components (DirectionArrow, Compass).
 * Pure and dependency-free so the spatial logic is unit-testable and vendors
 * cleanly alongside the components that import it.
 */

export type LatLon = { lat: number; lon: number };

/** Normalize any angle in degrees to [0, 360). */
export function normalizeDeg(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

/**
 * Initial great-circle bearing from `from` to `to`, in degrees clockwise from
 * true north, [0, 360). The standard forward-azimuth formula — accurate for
 * the on-foot distances a heads-up display cares about.
 */
export function bearingBetween(from: LatLon, to: LatLon): number {
  const φ1 = (from.lat * Math.PI) / 180;
  const φ2 = (to.lat * Math.PI) / 180;
  const Δλ = ((to.lon - from.lon) * Math.PI) / 180;
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return normalizeDeg((Math.atan2(y, x) * 180) / Math.PI);
}

/**
 * Screen-relative bearing: where `absolute` (degrees from north) lands once
 * the wearer's `heading` is subtracted — i.e. the direction to draw on a
 * display whose "up" is wherever the wearer faces.
 */
export function relativeBearing(absolute: number, heading: number): number {
  return normalizeDeg(absolute - heading);
}
