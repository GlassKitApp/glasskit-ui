"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Clock> — the home time/date complication: a big tabular time and a quieter
 * date line. Self-ticking by default (minute-aligned — no per-second renders);
 * pass `time` to control it instead (the prop always wins, and you own the
 * formatting). In live mode an omitted `date` auto-formats too. Optional
 * `meta` for a trailing line (weather, alarm).
 */
export function Clock({
  time,
  date,
  meta,
  locale,
  hour12,
  className,
}: {
  /** Controlled, preformatted time. Omit to tick live. */
  time?: ReactNode;
  /** Date line. In live mode, omitting it shows the live date. */
  date?: ReactNode;
  meta?: ReactNode;
  /** BCP 47 locale for live formatting (default: the device locale). */
  locale?: string;
  /** Force 12/24-hour live time (default: the locale's convention). */
  hour12?: boolean;
  className?: string;
}) {
  const live = time == null;
  // null until mounted → server and first client render agree on the
  // placeholder, then the first tick swaps in the real time (hydration-safe).
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    if (!live) return;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const d = new Date();
      setNow(d);
      // Re-tick just past the next minute boundary.
      timer = setTimeout(
        tick,
        60_000 - (d.getSeconds() * 1000 + d.getMilliseconds()) + 50,
      );
    };
    tick();
    return () => clearTimeout(timer);
  }, [live]);

  const liveTime = now
    ? new Intl.DateTimeFormat(locale, {
        hour: "numeric",
        minute: "2-digit",
        hour12,
      }).format(now)
    : "--:--";
  const liveDate = now
    ? new Intl.DateTimeFormat(locale, {
        weekday: "long",
        month: "long",
        day: "numeric",
      }).format(now)
    : null;
  const shownTime = live ? liveTime : time;
  const shownDate = date ?? (live ? liveDate : null);

  return (
    <div className={cn("gk-clock", className)}>
      <span className="gk-clock__time">{shownTime}</span>
      {shownDate != null ? (
        <span className="gk-clock__date t-body">{shownDate}</span>
      ) : null}
      {meta != null ? (
        <span className="gk-clock__meta t-caption">{meta}</span>
      ) : null}
    </div>
  );
}
