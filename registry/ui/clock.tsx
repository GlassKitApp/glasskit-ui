import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Clock> — the home time/date complication: a big tabular time and a quieter
 * date line. Pure display — pass preformatted strings (you own the locale /
 * 12-vs-24h). Optional `meta` for a trailing line (weather, alarm).
 */
export function Clock({
  time,
  date,
  meta,
  className,
}: {
  time: ReactNode;
  date?: ReactNode;
  meta?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("gk-clock", className)}>
      <span className="gk-clock__time">{time}</span>
      {date != null ? <span className="gk-clock__date t-body">{date}</span> : null}
      {meta != null ? <span className="gk-clock__meta t-caption">{meta}</span> : null}
    </div>
  );
}
