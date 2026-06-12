import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Toast> — a transient notice that animates in (a brief luminance rise, not a
 * modal scrim). Controlled via `open`; render nothing when closed. The consumer
 * owns the auto-dismiss timer. `emphasis="accent"` for a confirmation/live notice.
 */
export function Toast({
  open,
  children,
  emphasis = "default",
  className,
}: {
  open: boolean;
  children: ReactNode;
  /** Visual weight — accent marks a confirmation/live notice. */
  emphasis?: "default" | "accent";
  className?: string;
}) {
  if (!open) return null;
  return (
    <div
      role="status"
      className={cn(
        "gk-toast gk-surface t-body",
        emphasis === "accent" && "gk-toast--accent",
        className,
      )}
    >
      {children}
    </div>
  );
}
