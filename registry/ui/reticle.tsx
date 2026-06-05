import { cn } from "../lib/utils";

/**
 * <Reticle> — an aim-to-select target: four corner brackets framing the gaze
 * center. `active` brightens it while dwelling on a hittable target.
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
