import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/** Tasteful gradient tones for icon plates (see styles.css `.gk-grad-*`). */
export type GlowTone = "blue" | "green" | "peach" | "violet" | "cyan" | "amber";

/**
 * <GlowIcon> — wraps a line-icon SVG. Two modes:
 *  - default: a 2-tier luminance glyph (inert near-white, `active` = accent).
 *  - `plate`: an iOS/Meta-style gradient app-icon squircle holding a white glyph
 *    (pass `tone` for the gradient).
 *
 * Decorative by default; pass `label` to expose it to assistive tech.
 */
export function GlowIcon({
  children,
  active = false,
  size = "md",
  plate = false,
  tone = "blue",
  label,
  className,
}: {
  /** A stroke-based SVG element. */
  children: ReactNode;
  active?: boolean;
  /** sm 16 · md 20 · lg 28 (px @ 600×600). */
  size?: "sm" | "md" | "lg";
  /** Render as a gradient app-icon plate. */
  plate?: boolean;
  /** Plate gradient tone. */
  tone?: GlowTone;
  label?: string;
  className?: string;
}) {
  const a11y = {
    role: label ? ("img" as const) : undefined,
    "aria-label": label,
    "aria-hidden": label ? undefined : true,
  };

  if (plate) {
    return (
      <span
        className={cn(
          "gk-iconplate",
          `gk-iconplate--${size}`,
          "gk-plate",
          `gk-grad-${tone}`,
          className,
        )}
        {...a11y}
      >
        <span className={cn("gk-icon", `gk-icon--${size}`)}>{children}</span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "gk-icon",
        `gk-icon--${size}`,
        active && "gk-icon--active",
        className,
      )}
      {...a11y}
    >
      {children}
    </span>
  );
}
