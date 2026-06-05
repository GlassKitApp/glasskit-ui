import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Progress> — emitted progress, two shapes:
 *   - "linear"  a continuous bar (also covers countdown: feed a decreasing
 *               value and a time label). Uses a native <progress>, so the
 *               dynamic fill needs no inline style.
 *   - "step"    discrete step-of-N dots (wizard / pinch-advance).
 *
 * `value` is clamped to [0, max]. For "step", value = completed steps.
 */
export function Progress({
  value,
  max = 100,
  variant = "linear",
  label,
  className,
}: {
  value: number;
  max?: number;
  variant?: "linear" | "step";
  /** Optional caption shown with the bar (e.g. "3 of 5", "0:42 left"). */
  label?: ReactNode;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(value, max));

  if (variant === "step") {
    return (
      <div
        className={cn("gk-steps", className)}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        {Array.from({ length: max }, (_, i) => (
          <span
            key={i}
            className={cn("gk-step", i < clamped && "gk-step--on")}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("gk-progress", className)}>
      <progress className="gk-progress__el" value={clamped} max={max} />
      {label != null ? (
        <div className="gk-progress__meta t-caption">{label}</div>
      ) : null}
    </div>
  );
}
