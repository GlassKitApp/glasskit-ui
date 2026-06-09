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
    <div className={cn("gk-screen", className)}>
      {status ? <div className="gk-screen__status">{status}</div> : null}
      <div className="gk-screen__stage">{children}</div>
      {cue ? <div className="gk-screen__cue">{cue}</div> : null}
    </div>
  );
}
