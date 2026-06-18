import type { KeyboardEvent, ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Stepper> — adjust a value in discrete steps (glasses have no fine slider).
 * A single D-pad-focusable control: focus it once, then swipe ◀ / ▶ (the Neural
 * Band's horizontal swipe arrives as ArrowLeft/ArrowRight) to change the value
 * by `step`; vertical swipes still navigate away. The − and + are visual hints,
 * not separate focus stops. Controlled: pass `value` + `onChange`. Bounds clamp
 * the ends; omit `onChange` for a read-only readout that leaves the focus ring.
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
  const readOnly = onChange == null;

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (!onChange) return;
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return; // ↑/↓ navigate
    // This control owns its horizontal axis (like a slider). The focus engine
    // listens on window; stopPropagation here keeps it from moving the ring.
    e.preventDefault();
    e.stopPropagation();
    const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = clamp(value + (rtl ? -dir : dir) * step);
    if (next !== value) onChange(next);
  }

  const glyph = "text-[22px] leading-none transition-opacity";

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {label != null ? (
        <span className="t-caption uppercase tracking-[0.16em] text-foreground-faint">
          {label}
        </span>
      ) : null}
      <div
        role="spinbutton"
        tabIndex={readOnly ? undefined : 0}
        className={cn(
          "surface inline-flex items-center gap-5 rounded-full px-6 py-2.5",
          !readOnly && "focusable",
        )}
        aria-label={name}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuetext={typeof unit === "string" ? `${value} ${unit}` : undefined}
        aria-readonly={readOnly || undefined}
        onKeyDown={readOnly ? undefined : onKeyDown}
      >
        <span aria-hidden className={cn(glyph, atMin && "opacity-30")}>
          −
        </span>
        <span className="t-readout min-w-[4ch] text-center">
          {value}
          {unit != null ? (
            <span className="text-[14px] text-foreground-faint"> {unit}</span>
          ) : null}
        </span>
        <span aria-hidden className={cn(glyph, atMax && "opacity-30")}>
          +
        </span>
      </div>
    </div>
  );
}
