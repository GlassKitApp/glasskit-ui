import type { ReactNode } from "react";
import { cn } from "../lib/utils";

export type SegmentedOption<T extends string | number> = {
  value: T;
  label: ReactNode;
};

/**
 * <Segmented> — pick one of a few options (a watchOS-style segmented control).
 * Each segment is a D-pad-focusable radio; the selected one lifts with the
 * accent. Controlled: pass `value` + `onChange`. Keep it to 2–4 options on
 * the lens.
 */
export function Segmented<T extends string | number>({
  options,
  value,
  onChange,
  label,
  className,
}: {
  options: SegmentedOption<T>[];
  value: T;
  onChange?: (next: T) => void;
  /** Accessible name for the group (e.g. "View mode"). */
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn("inline-flex gap-2", className)}
    >
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={String(o.value)}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={onChange ? () => onChange(o.value) : undefined}
            className={cn(
              "focusable press-scale t-body rounded-lens px-6 py-4",
              // Off = popping surface; on = filled accent (gradient + glow).
              on ? "btn-primary" : "surface",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
