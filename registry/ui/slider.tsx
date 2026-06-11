import type { ReactNode } from "react";
import { cn, stringLabel } from "../lib/utils";

/**
 * <Slider> — a continuous level control (volume, brightness — the quick
 * controls). A native range so the fill + thumb need no inline style
 * (`accent-color` tints them); arrow keys / Neural-Band pinch-twist adjust it.
 * Controlled via `value` + `onChange`. Omit `onChange` for a read-only
 * display — the slider then leaves the D-pad focus order (`readOnly` is
 * meaningless on a range input; an adjustable-looking dead control is worse
 * than a plain level display).
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
        className={cn("gk-slider__input", onChange != null && "focusable")}
        min={min}
        max={max}
        value={value}
        // readOnly only suppresses React's controlled-input warning (the
        // attribute itself is meaningless on type="range") — the real
        // read-only mechanism is leaving the focus order above.
        readOnly={onChange == null}
        tabIndex={onChange == null ? -1 : undefined}
        aria-readonly={onChange == null ? true : undefined}
        aria-label={stringLabel(label)}
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
