import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Cue> — a caption / hint line: what to do next, or a transient status
 * ("Listening…"). Pure display. Caption-tier type, dim by default; set
 * `emphasis="accent"` for a live state. No glow on this body text
 * (glow on running text kills legibility).
 */
export function Cue({
  children,
  emphasis = "default",
  icon,
  className,
}: {
  children: ReactNode;
  /** Visual weight — accent marks a live/active state. */
  emphasis?: "default" | "accent";
  /** Optional leading glyph — typically a <GlowIcon>. */
  icon?: ReactNode;
  className?: string;
}) {
  return (
    // The screen's narration line — `status` announces updates politely
    // without stealing focus (one Cue per screen keeps this sane).
    <p
      role="status"
      className={cn(
        "gk-cue t-caption",
        emphasis === "accent" && "gk-cue--accent",
        className,
      )}
    >
      {icon}
      {children}
    </p>
  );
}
