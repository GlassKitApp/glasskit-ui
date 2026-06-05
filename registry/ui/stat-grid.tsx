import type { ReactNode } from "react";
import { cn } from "../lib/utils";

export type Stat = {
  label: ReactNode;
  value: ReactNode;
  unit?: ReactNode;
};

/**
 * <StatGrid> — a compact grid of readouts for a multi-metric glance (a watch
 * "complication cluster"). Pure display, tabular numerals. Keep it to 2–4 cells
 * — density past that stops being glanceable.
 */
export function StatGrid({
  items,
  className,
}: {
  items: Stat[];
  className?: string;
}) {
  return (
    <div className={cn("gk-statgrid", className)}>
      {items.map((it, i) => (
        <div key={i} className="gk-statgrid__cell">
          <span className="gk-statgrid__value t-readout">
            {it.value}
            {it.unit != null ? (
              <span className="gk-statgrid__unit"> {it.unit}</span>
            ) : null}
          </span>
          <span className="gk-statgrid__label t-caption">{it.label}</span>
        </div>
      ))}
    </div>
  );
}
