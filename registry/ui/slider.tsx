import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Slider> — a continuous level control (volume, brightness — the quick
 * controls). A native range so the fill + thumb need no inline style
 * (`accent-color` tints them); arrow keys / Neural-Band pinch-twist adjust it.
 * Controlled via `value` + `onChange`; omit `onChange` for a read-only display.
 */
export function Slider({
  value,
  min = 0,
  max = 100,
  label,
  icon,
  onChange,
  className,
}: {
  value: number;
  min?: number;
  max?: number;
  /** a11y / caption label. */
  label?: ReactNode;
  /** Leading glyph — typically a <GlowIcon> (volume / brightness). */
  icon?: ReactNode;
  onChange?: (next: number) => void;
  className?: string;
}) {
  return (
    <div className={cn("gk-slider", className)}>
      {icon != null ? <span className="gk-slider__icon">{icon}</span> : null}
      <input
        type="range"
        className="gk-slider__input focusable"
        min={min}
        max={max}
        value={value}
        readOnly={onChange == null}
        aria-label={typeof label === "string" ? label : undefined}
        onChange={
          onChange ? (e) => onChange(Number(e.currentTarget.value)) : undefined
        }
      />
      {label != null ? (
        <span className="gk-slider__label t-caption">{label}</span>
      ) : null}
    </div>
  );
}
