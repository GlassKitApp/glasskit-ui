"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <List> — a vertical stack of focusable rows (watchOS list spirit) that fills
 * the stage and scrolls (D-pad scrollIntoView). A position indicator on the
 * inline-end edge tracks scroll — sized to the content and hidden when the list
 * fits. Compose with <ListRow>.
 */
export function List({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sc = scrollRef.current;
    const rail = railRef.current;
    const thumb = thumbRef.current;
    if (!sc || !rail || !thumb) return;

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = sc;
      const overflow = scrollHeight - clientHeight;
      if (overflow <= 1) {
        rail.dataset.show = "false";
        return;
      }
      rail.dataset.show = "true";
      const trackH = rail.clientHeight;
      const thumbH = Math.max(trackH * (clientHeight / scrollHeight), 26);
      const pos = (scrollTop / overflow) * (trackH - thumbH);
      thumb.style.height = `${thumbH}px`;
      thumb.style.transform = `translateY(${pos}px)`;
    };

    // Smooth scroll on focus: the D-pad engine moves the ring with
    // preventScroll, so the List owns the scroll. `block: "nearest"` keeps the
    // list still while the focused row is fully on screen and only glides once
    // the ring passes the visible page (then it slides just enough to reveal
    // the next row) — smooth, not the instant per-row jump native focus does.
    // Honors reduced-motion.
    const reduce =
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onFocusIn = (e: FocusEvent) => {
      const row = (e.target as HTMLElement | null)?.closest(".gk-list-row");
      if (row && sc.contains(row) && typeof row.scrollIntoView === "function") {
        row.scrollIntoView({
          block: "nearest",
          behavior: reduce ? "auto" : "smooth",
        });
      }
    };

    update();
    sc.addEventListener("scroll", update, { passive: true });
    sc.addEventListener("focusin", onFocusIn);
    const ro =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    ro?.observe(sc);
    return () => {
      sc.removeEventListener("scroll", update);
      sc.removeEventListener("focusin", onFocusIn);
      ro?.disconnect();
    };
  }, []);

  return (
    <div className={cn("gk-list", className)}>
      <div className="gk-list__scroll" ref={scrollRef}>
        {children}
      </div>
      <span
        className="gk-list__rail"
        ref={railRef}
        data-show="false"
        aria-hidden="true"
      >
        <span className="gk-list__bar" ref={thumbRef} />
      </span>
    </div>
  );
}

/**
 * <ListRow> — a D-pad-focusable row: leading glyph, label, trailing value.
 * Renders a real <button> with the `focusable` class so `useDpad()` walks
 * it. Logical layout (leading = inline-start) for RTL safety.
 */
export function ListRow({
  children,
  leading,
  trailing,
  onClick,
  disabled,
  className,
}: {
  /** The row label. */
  children: ReactNode;
  /** Optional inline-start glyph — typically a <GlowIcon>. */
  leading?: ReactNode;
  /** Optional inline-end value/affordance. */
  trailing?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn("focusable gk-list-row t-body", className)}
    >
      {leading}
      <span className="gk-list-row__label">{children}</span>
      {trailing != null ? (
        <span className="gk-list-row__trailing t-caption">{trailing}</span>
      ) : null}
    </button>
  );
}
