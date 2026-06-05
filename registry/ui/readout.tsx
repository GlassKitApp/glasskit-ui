import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Readout> — a single-value complication: label + value (+ optional
 * unit). The glanceable archetype — one number legible in a 1–2s glance.
 * Pure display (styled-only). Tabular numerals on the value.
 *
 * `emphasis="primary"` is the brightest value on the screen; reserve it
 * for the one key value (apple-feel §3 hierarchy-from-luminance).
 */
export function Readout({
  label,
  value,
  unit,
  emphasis = "primary",
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  unit?: ReactNode;
  emphasis?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "gk-readout",
        emphasis === "secondary" && "gk-readout--secondary",
        className,
      )}
    >
      <span className="gk-readout__label t-caption">{label}</span>
      <span
        className={cn(
          "gk-readout__value",
          emphasis === "primary" ? "t-title" : "t-readout",
        )}
      >
        {value}
        {unit != null ? (
          <span className="gk-readout__unit t-body">{unit}</span>
        ) : null}
      </span>
    </div>
  );
}
