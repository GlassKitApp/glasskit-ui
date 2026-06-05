import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Badge> — a small count or status pill (notification counts, live state).
 * Pure display. Hairline by default; tone='accent' fills it green for the one
 * thing that needs to draw the eye.
 */
export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "accent";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "gk-badge t-caption",
        tone === "accent" && "gk-badge--accent",
        className,
      )}
    >
      {children}
    </span>
  );
}
