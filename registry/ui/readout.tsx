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
    <div className={cn("flex flex-col items-center gap-1.5", className)}>
      <span className="t-caption uppercase tracking-[0.16em] text-foreground-faint">
        {label}
      </span>
      <span
        className={cn(
          "flex items-baseline gap-1.5 [font-variant-numeric:tabular-nums]",
          emphasis === "primary" ? "t-title" : "t-readout text-muted-foreground",
        )}
      >
        {value}
        {unit != null ? (
          <span className="t-body text-foreground-faint">{unit}</span>
        ) : null}
      </span>
    </div>
  );
}
