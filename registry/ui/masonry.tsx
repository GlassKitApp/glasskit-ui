"use client";

import {
  Children,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "../lib/utils";

/**
 * <Masonry> — a staggered, vertically-scrolling multi-column layout (the
 * Pinterest / Photos gallery look, where columns do not line up). Drop any
 * children in (MediaThumb tiles, Pressable cards, anything); Masonry measures
 * each one and greedily fills the shortest column so the sides stay balanced
 * whatever the order. It scrolls vertically and keeps a D-pad-focused child in
 * view, so a gallery is one line.
 *
 * This is layout only: the children own their own interactivity (e.g. a
 * MediaThumb with `onSelect`, or a `<Pressable>`).
 */
export function Masonry({
  columns = 2,
  children,
  className,
}: {
  /** Number of columns. */
  columns?: number;
  children: ReactNode;
  className?: string;
}) {
  const items = useMemo(() => Children.toArray(children), [children]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  // Start round-robin (a sane SSR/first-paint split), then rebalance by height.
  const [assign, setAssign] = useState<number[]>(() =>
    items.map((_, i) => i % columns),
  );

  // Measure each item and deal it to the currently shortest column.
  useLayoutEffect(() => {
    const colH = new Array(columns).fill(0);
    const next = itemRefs.current.slice(0, items.length).map((el) => {
      let c = 0;
      for (let j = 1; j < columns; j++) if (colH[j]! < colH[c]!) c = j;
      colH[c]! += el?.offsetHeight ?? 0;
      return c;
    });
    setAssign((prev) =>
      prev.length === next.length && prev.every((v, i) => v === next[i])
        ? prev
        : next,
    );
  }, [columns, items.length]);

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

  const cols: ReactNode[][] = Array.from({ length: columns }, () => []);
  items.forEach((child, i) => {
    cols[assign[i] ?? i % columns]!.push(
      <div
        key={i}
        className="gk-masonry__item"
        ref={(el) => {
          itemRefs.current[i] = el;
        }}
      >
        {child}
      </div>,
    );
  });

  return (
    <div ref={scrollRef} className={cn("gk-masonry", className)}>
      {cols.map((col, i) => (
        <div className="gk-masonry__col" key={i}>
          {col}
        </div>
      ))}
    </div>
  );
}
