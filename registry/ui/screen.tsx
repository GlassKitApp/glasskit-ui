import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Screen> — the on-lens layout shell: a status region (block-start), a
 * centered stage (the one task), and a cue region (block-end). Renders
 * *inside* a <GlassViewport>; it does not own the 600×600 surface.
 *
 * Keeps ≥50–60% of the surface pure black (apple-feel §3) by reserving
 * the center for a single readout/action and pinning chrome to the edges.
 */
export function Screen({
  status,
  cue,
  children,
  className,
}: {
  /** Optional top region (e.g. a Heading). System status is OS chrome, not an
   * app component, so most app screens leave this empty. */
  status?: ReactNode;
  /** Bottom hint line — typically a <Cue>. */
  cue?: ReactNode;
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
      {cue ? (
        <div data-screen-cue className="flex flex-none justify-center">
          {cue}
        </div>
      ) : null}
    </div>
  );
}
