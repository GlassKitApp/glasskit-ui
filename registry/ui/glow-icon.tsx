import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <GlowIcon> — wraps a line-icon SVG and applies the 2-tier luminance
 * rule (apple-feel §7): inert = near-white, `active` = phosphor green
 * with a faint glow. Strokes render as 1.5px hairlines with round caps
 * via the stylesheet; pass a stroke-based SVG (no fills, no multicolor).
 *
 * Decorative by default; pass `label` to expose it to assistive tech.
 */
export function GlowIcon({
  children,
  active = false,
  size = "md",
  label,
  className,
}: {
  /** A stroke-based SVG element. */
  children: ReactNode;
  active?: boolean;
  /** sm 16 · md 20 · lg 28 (px @ 600×600). */
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "gk-icon",
        `gk-icon--${size}`,
        active && "gk-icon--active",
        className,
      )}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {children}
    </span>
  );
}
