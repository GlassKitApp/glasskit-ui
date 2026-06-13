import type { ReactNode } from "react";
import { cn, stringLabel } from "../lib/utils";

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
      className={cn(
        "relative inline-flex size-[168px] items-center justify-center",
        className,
      )}
      role="meter"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={stringLabel(label)}
    >
      <svg viewBox="0 0 100 100" className="size-full">
        <circle
          cx="50"
          cy="50"
          r={R}
          className="[fill:none] [stroke-width:7] [stroke:rgba(255,255,255,0.1)]"
        />
        <circle
          cx="50"
          cy="50"
          r={R}
          className="[fill:none] [stroke-width:7] [stroke:var(--accent)] [stroke-linecap:round] [filter:drop-shadow(0_0_6px_color-mix(in_oklab,var(--accent)_45%,transparent))] [transition:stroke-dashoffset_0.4s_ease]"
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <span className="absolute flex flex-col items-center gap-0.5">
        <span className="t-readout">
          {value}
          {unit != null ? (
            <span className="text-[13px] text-foreground-faint">{unit}</span>
          ) : null}
        </span>
        {label != null ? (
          <span className="t-caption uppercase tracking-[0.14em] text-foreground-faint">
            {label}
          </span>
        ) : null}
      </span>
    </div>
  );
}
