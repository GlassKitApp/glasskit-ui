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
        "gk-toast t-body inline-flex items-center gap-3 rounded-lens px-[22px] py-4 font-semibold",
        emphasis === "accent"
          ? "border-[var(--accent-muted)] text-white [background:linear-gradient(180deg,color-mix(in_oklab,var(--accent-faint)_86%,#fff),var(--accent-faint))] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_-14px_var(--accent-glow)]"
          : "surface text-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}
