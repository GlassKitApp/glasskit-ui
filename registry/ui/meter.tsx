import type { ReactNode } from "react";
import { cn } from "../lib/utils";

const R = 42;
const CIRC = 2 * Math.PI * R;

/**
 * <Meter> — a bounded ring gauge for a level (battery, signal, intensity), as
 * opposed to <Progress> which tracks task completion. The fill is revealed with
 * an SVG `stroke-dashoffset` *attribute* (not inline style); `value` is clamped
 * to [0, max].
 */
export function Meter({
  value,
  max = 100,
  label,
  unit,
  className,
}: {
  value: number;
  max?: number;
  label?: ReactNode;
  unit?: ReactNode;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(value, max));
  const pct = max > 0 ? clamped / max : 0;
  const offset = CIRC * (1 - pct);

  return (
    <div
      className={cn("gk-meter", className)}
      role="meter"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={typeof label === "string" ? label : undefined}
    >
      <svg viewBox="0 0 100 100" className="gk-meter__dial">
        <circle cx="50" cy="50" r={R} className="gk-meter__track" />
        <circle
          cx="50"
          cy="50"
          r={R}
          className="gk-meter__fill"
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <span className="gk-meter__center">
        <span className="gk-meter__value t-readout">
          {value}
          {unit != null ? <span className="gk-meter__unit">{unit}</span> : null}
        </span>
        {label != null ? (
          <span className="gk-meter__label t-caption">{label}</span>
        ) : null}
      </span>
    </div>
  );
}
