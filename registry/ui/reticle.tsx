import { cn } from "../lib/utils";

/**
 * <Reticle> — an aim-to-select target: four corner brackets framing the
 * center of the lens. `active` brightens it over a hittable target.
 *
 * Platform note (2026-06): there is no gaze/eye-tracking API for web apps —
 * the Display can't tell you what the wearer looks at. `active` is app-driven
 * state: derive it from your own logic (e.g. a projected world point entering
 * the center region), not from a sensor this component could read.
 *
 * WORLD-ANCHORED but symmetric. The corners use PHYSICAL CSS positioning (not
 * logical), so `dir` can never flip them. No inline style — static class rules.
 */
export function Reticle({
  active = false,
  label,
  className,
}: {
  active?: boolean;
  /** a11y label for the aim target. */
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("gk-reticle", active && "gk-reticle--active", className)}
      role="img"
      aria-label={label ?? "Aim target"}
    >
      <span className="gk-reticle__corner gk-reticle__corner--tl" />
      <span className="gk-reticle__corner gk-reticle__corner--tr" />
      <span className="gk-reticle__corner gk-reticle__corner--bl" />
      <span className="gk-reticle__corner gk-reticle__corner--br" />
    </div>
  );
}
