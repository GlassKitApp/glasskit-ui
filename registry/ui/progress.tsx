import type { ReactNode } from "react";
import { cn, stringLabel } from "../lib/utils";

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
    // Steps must be a sane integer count — a fractional or negative max
    // would make Array.from misrender the dots.
    const steps = Math.max(0, Math.floor(max));
    return (
      <div
        className={cn("flex items-center gap-2", className)}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={steps}
        aria-label={stringLabel(label)}
      >
        {Array.from({ length: steps }, (_, i) => (
          <span
            key={i}
            className={cn(
              "size-3 rounded-full transition-[background,box-shadow] duration-[250ms] ease-in-out",
              i < clamped
                ? "bg-primary [box-shadow:0_0_7px_color-mix(in_oklab,var(--accent)_45%,transparent)]"
                : "bg-[rgba(255,255,255,0.16)]",
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <progress
        className="gk-progress__el"
        value={clamped}
        max={max}
        aria-label={stringLabel(label)}
      />
      {label != null ? (
        <div className="t-caption flex items-center justify-between text-foreground-faint [font-variant-numeric:tabular-nums]">
          {label}
        </div>
      ) : null}
    </div>
  );
}
