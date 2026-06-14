import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Badge> — a small count or status pill (notification counts, live state).
 * Pure display. Variants:
 * - `default` — subtle surface, the everyday pill.
 * - `accent` — the accent gradient for the one thing that needs to draw the eye.
 * - `outline` — transparent, just a hairline border.
 */
export function Badge({
  children,
  variant,
  emphasis,
  className,
}: {
  children: ReactNode;
  /** Visual style — accent for the one badge that matters, outline for a quiet chip. */
  variant?: "default" | "accent" | "outline";
  /** @deprecated Use `variant` instead. */
  emphasis?: "default" | "accent";
  className?: string;
}) {
  const v = variant ?? (emphasis === "accent" ? "accent" : "default");
  return (
    <span
      className={cn(
        "t-caption inline-flex min-w-[26px] items-center justify-center rounded-full px-[11px] py-[5px] font-bold leading-none [font-variant-numeric:tabular-nums]",
        v === "accent"
          ? "btn-primary"
          : v === "outline"
            ? "border border-border text-foreground"
            : "surface text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
