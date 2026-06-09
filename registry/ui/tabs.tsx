import type { ReactNode } from "react";
import { cn } from "../lib/utils";

export type TabItem = { id: string; label: ReactNode };

/**
 * <Tabs> — a top-level tab strip (the home's quick-controls | home | apps
 * pager). Each tab is D-pad-focusable; the active one gets an accent underline.
 * Controlled via `value` + `onChange`. RTL-safe (logical layout).
 */
export function Tabs({
  items,
  value,
  onChange,
  className,
}: {
  items: TabItem[];
  value: string;
  onChange?: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("gk-tabs", className)} role="tablist">
      {items.map((t) => {
        const on = t.id === value;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={onChange ? () => onChange(t.id) : undefined}
            className={cn("focusable gk-tab t-body", on && "gk-tab--on")}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
