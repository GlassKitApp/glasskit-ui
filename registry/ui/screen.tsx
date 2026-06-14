import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Screen> — the on-lens layout shell: a status region (block-start), a
 * centered stage (the one task), and the cue region (block-end). Renders
 * *inside* a <GlassViewport>; it does not own the 600×600 surface.
 *
 * The `cue` is the screen's one narration line: pass the hint text and Screen
 * renders it as a polite `role="status"` live region (announces updates to
 * screen readers + the glasses TTS without stealing focus). Set `cueLive` for a
 * live/active state (accent). One cue per screen keeps the live region sane.
 *
 * Keeps ≥50–60% of the surface pure black (apple-feel §3) by reserving the
 * center for a single readout/action and pinning chrome to the edges.
 */
export function Screen({
  status,
  cue,
  cueLive = false,
  children,
  className,
}: {
  /** Optional top region (e.g. a Heading). System status is OS chrome, not an
   * app component, so most app screens leave this empty. */
  status?: ReactNode;
  /** The bottom narration line: the hint or transient status for this view.
   *  Rendered as a polite `role="status"` live region. */
  cue?: ReactNode;
  /** Accent the cue for a live/active state ("Recording", "Connected"). */
  cueLive?: boolean;
  /** The stage: the one task for this view. */
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex h-full flex-col gap-[14px] p-[22px]", className)}>
      {status ? (
        <div data-screen-status className="flex-none">
          {status}
        </div>
      ) : null}
      <div
        data-screen-stage
        className="flex min-h-0 flex-1 flex-col items-center justify-center gap-5 text-center"
      >
        {children}
      </div>
      {cue != null ? (
        <div
          data-screen-cue
          role="status"
          className={cn(
            "t-caption flex flex-none items-center justify-center gap-2",
            cueLive ? "text-primary" : "text-foreground-faint",
          )}
        >
          {cue}
        </div>
      ) : null}
    </div>
  );
}
