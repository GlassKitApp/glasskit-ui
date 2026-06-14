"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Grid> — an aligned, vertically-scrolling multi-column layout: every cell
 * shares the same track, so rows and columns line up. Drop any children in
 * (MediaThumb tiles, Pressable cards); the Grid scrolls vertically and keeps a
 * D-pad-focused child in view. Layout only: the children own their own
 * interactivity.
 */
export function Grid({
  columns = 2,
  children,
  className,
}: {
  /** Number of columns (2, 3, or 4). */
  columns?: 2 | 3 | 4;
  children: ReactNode;
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep a D-pad-focused child scrolled into view (focusin bubbles up).
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onFocusIn = (e: FocusEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && el.contains(t) && typeof t.scrollIntoView === "function") {
        t.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    };
    el.addEventListener("focusin", onFocusIn);
    return () => el.removeEventListener("focusin", onFocusIn);
  }, []);

  return (
    <div ref={scrollRef} data-cols={columns} className={cn("gk-grid", className)}>
      {children}
    </div>
  );
}
