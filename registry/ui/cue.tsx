import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Cue> — a caption / hint line: what to do next, or a transient status
 * ("Listening…"). Pure display. Caption-tier type, dim by default; set
 * `tone="accent"` for a live state. No glow on this body text
 * (glow on running text kills legibility).
 */
export function Cue({
  children,
  tone = "default",
  icon,
  className,
}: {
  children: ReactNode;
  tone?: "default" | "accent";
  /** Optional leading glyph — typically a <GlowIcon>. */
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "gk-cue t-caption",
        tone === "accent" && "gk-cue--accent",
        className,
      )}
    >
      {icon}
      {children}
    </p>
  );
}
