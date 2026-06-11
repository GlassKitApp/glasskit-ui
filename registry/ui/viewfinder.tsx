import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Viewfinder> — camera-POV chrome: corner brackets framing the shot, an
 * optional zoom badge and a REC indicator. `children` overlays (e.g. a focus
 * reticle). World-anchored framing — corners use physical positioning, never
 * mirrored.
 *
 * Platform note (2026-06): web apps on the Display have NO camera access —
 * no getUserMedia, no capture API. This is presentation scaffolding for a
 * camera-style UI (the lens shows the real world through the brackets), not
 * a working viewfinder. `recording` is app state you set; nothing records.
 */
export function Viewfinder({
  zoom,
  recording = false,
  children,
  className,
}: {
  /** Zoom badge text, e.g. "1×" / "3×". */
  zoom?: ReactNode;
  recording?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("gk-viewfinder", className)}
      role="img"
      aria-label="Camera viewfinder"
    >
      <span className="gk-viewfinder__c gk-viewfinder__c--tl" />
      <span className="gk-viewfinder__c gk-viewfinder__c--tr" />
      <span className="gk-viewfinder__c gk-viewfinder__c--bl" />
      <span className="gk-viewfinder__c gk-viewfinder__c--br" />
      {zoom != null ? (
        <span className="gk-viewfinder__zoom t-caption">{zoom}</span>
      ) : null}
      {recording ? (
        <span className="gk-viewfinder__rec t-caption">
          <span className="gk-viewfinder__dot" aria-hidden="true" />
          REC
        </span>
      ) : null}
      {children}
    </div>
  );
}
