import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Toast> — a transient notice that animates in (a brief luminance rise, not a
 * modal scrim). Controlled via `open`; render nothing when closed. The consumer
 * owns the auto-dismiss timer. `tone="accent"` for a confirmation/live notice.
 */
export function Toast({
  open,
  children,
  tone = "default",
  className,
}: {
  open: boolean;
  children: ReactNode;
  tone?: "default" | "accent";
  className?: string;
}) {
  if (!open) return null;
  return (
    <div
      role="status"
      className={cn(
        "gk-toast hairline t-body",
        tone === "accent" && "gk-toast--accent",
        className,
      )}
    >
      {children}
    </div>
  );
}
