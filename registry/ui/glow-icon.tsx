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

  // Plate (squircle) and inner-glyph sizes, in px @ 600×600.
  const plateSize = { sm: "size-[46px]", md: "size-[66px]", lg: "size-[132px]" };
  const plateGlyph = { sm: "size-6", md: "size-[34px]", lg: "size-16" };
  const glyphSize = { sm: "size-4", md: "size-5", lg: "size-7" };

  if (plate) {
    return (
      <span
        className={cn(
          "gk-plate",
          `gk-grad-${tone}`,
          plateSize[size],
          className,
        )}
        {...a11y}
      >
        <span className={cn("gk-icon", plateGlyph[size])}>{children}</span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "gk-icon",
        glyphSize[size],
        active && "gk-icon--active",
        className,
      )}
      {...a11y}
    >
      {children}
    </span>
  );
}
