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
    <div className={cn("grid w-full grid-cols-2 gap-3", className)}>
      {items.map((it, i) => (
        <div
          key={i}
          className="surface flex flex-col items-start gap-1.5 rounded-[20px] p-[18px] text-start"
        >
          <span className="t-caption uppercase tracking-[0.12em] text-foreground-faint">
            {it.label}
          </span>
          <span className="t-readout font-bold">
            {it.value}
            {it.unit != null ? (
              <span className="text-[16px] text-foreground-faint"> {it.unit}</span>
            ) : null}
          </span>
        </div>
      ))}
    </div>
  );
}
