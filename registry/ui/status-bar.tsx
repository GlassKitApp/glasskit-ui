import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <StatusBar> — the glanceable top status row (watchOS TimeText analog):
 * time / battery / connection. Logical `start`/`end` slots so it mirrors
 * correctly under RTL without any `left`/`right`.
 *
 * Tabular numerals and tracked uppercase caption type keep changing
 * readouts from jittering (apple-feel §4).
 */
export function StatusBar({
  start,
  end,
  className,
}: {
  /** Inline-start content (e.g. time). */
  start?: ReactNode;
  /** Inline-end content (e.g. battery, signal). Multiple items space out. */
  end?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("gk-status t-caption", className)}>
      <span>{start}</span>
      {end != null ? <span className="gk-status__end">{end}</span> : null}
    </div>
  );
}
