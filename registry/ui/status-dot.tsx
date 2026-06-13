import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <StatusDot> — a glanceable sensor / permission / connection indicator. The
 * lens has one accent, so state reads from luminance + motion, not a second
 * hue: `on` = steady accent, `live` = pulsing accent, `off` = dim.
 */
export function StatusDot({
  status = "on",
  label,
  className,
}: {
  /** Semantic state — live pulses, off dims. */
  status?: "on" | "live" | "off";
  label?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2",
        `gk-statusdot--${status}`,
        className,
      )}
    >
      <span className="gk-statusdot__dot" />
      {label != null ? (
        <span className="t-caption text-muted-foreground">{label}</span>
      ) : null}
    </span>
  );
}
