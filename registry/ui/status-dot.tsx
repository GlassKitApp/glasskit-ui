import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <StatusDot> — a glanceable sensor / permission / connection indicator. The
 * additive lens has one accent, so state reads from luminance + motion, not a
 * second hue: `on` = steady green, `live` = pulsing green, `off` = dim.
 */
export function StatusDot({
  tone = "on",
  label,
  className,
}: {
  tone?: "on" | "live" | "off";
  label?: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("gk-statusdot", `gk-statusdot--${tone}`, className)}>
      <span className="gk-statusdot__dot" />
      {label != null ? (
        <span className="gk-statusdot__label t-caption">{label}</span>
      ) : null}
    </span>
  );
}
