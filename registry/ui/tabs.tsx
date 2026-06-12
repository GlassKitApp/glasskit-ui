import type { ReactNode } from "react";
import { cn } from "../lib/utils";

export type TabItem = { id: string; label: ReactNode };

/**
 * <Tabs> — a top-level tab strip (the home's quick-controls | home | apps
 * pager). Anchor it at the top of the view — pass it as <Screen>'s `status`
 * slot — so context stays glanceable above the content it switches.
 * Selected = accent underline; focused = the system focus ring (two distinct
 * affordances). Controlled via `value` + `onChange`. RTL-safe (logical
 * layout).
 *
 * Deliberate ARIA deviation: no `aria-controls`/`tabpanel` wiring — on the
 * lens a tab switch swaps the whole 600×600 screen, so there is no co-rendered
 * panel to point at.
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
