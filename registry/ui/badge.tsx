import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Badge> — a small count or status pill (notification counts, live state).
 * Pure display. Subtle surface by default; emphasis='accent' gives it the accent
 * gradient for the one thing that needs to draw the eye.
 */
export function Badge({
  children,
  emphasis = "default",
  className,
}: {
  children: ReactNode;
  /** Visual weight — accent for the one badge that matters. */
  emphasis?: "default" | "accent";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "gk-badge t-caption",
        emphasis === "accent" && "gk-badge--accent",
        className,
      )}
    >
      {children}
    </span>
  );
}
