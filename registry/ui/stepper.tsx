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

  return (
    <div className={cn("gk-stepper", className)}>
      {label != null ? (
        <span className="gk-stepper__label t-caption">{label}</span>
      ) : null}
      <div className="gk-stepper__row">
        <button
          type="button"
          className="focusable gk-stepper__btn"
          onClick={onChange ? () => onChange(clamp(value - step)) : undefined}
          disabled={atMin}
          aria-label={`Decrease ${name}`}
        >
          −
        </button>
        <span className="gk-stepper__value t-readout">
          {value}
          {unit != null ? (
            <span className="gk-stepper__unit"> {unit}</span>
          ) : null}
        </span>
        <button
          type="button"
          className="focusable gk-stepper__btn"
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
