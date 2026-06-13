import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Stepper> — adjust a value in discrete steps (glasses have no fine slider).
 * The − and + are D-pad-focusable buttons; useDpad walks them and activates on
 * Enter/Space. Controlled: pass `value` + `onChange`. Bounds disable the ends.
 */
export function Stepper({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  unit,
  className,
}: {
  value: number;
  onChange?: (next: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: ReactNode;
  unit?: ReactNode;
  className?: string;
}) {
  const clamp = (n: number) =>
    Math.min(max ?? Infinity, Math.max(min ?? -Infinity, n));
  const atMin = min != null && value <= min;
  const atMax = max != null && value >= max;
  const name = typeof label === "string" ? label : "value";

  const btn =
    "focusable surface press-scale inline-flex size-[46px] items-center justify-center rounded-full p-0 text-[22px] leading-none";

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {label != null ? (
        <span className="t-caption uppercase tracking-[0.16em] text-foreground-faint">
          {label}
        </span>
      ) : null}
      <div className="flex items-center gap-4">
        <button
          type="button"
          className={btn}
          onClick={onChange ? () => onChange(clamp(value - step)) : undefined}
          disabled={atMin}
          aria-label={`Decrease ${name}`}
        >
          −
        </button>
        <span className="t-readout min-w-[4ch] text-center">
          {value}
          {unit != null ? (
            <span className="text-[14px] text-foreground-faint"> {unit}</span>
          ) : null}
        </span>
        <button
          type="button"
          className={btn}
          onClick={onChange ? () => onChange(clamp(value + step)) : undefined}
          disabled={atMax}
          aria-label={`Increase ${name}`}
        >
          +
        </button>
      </div>
    </div>
  );
}
