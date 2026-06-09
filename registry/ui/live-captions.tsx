import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <LiveCaptions> — real-time transcription / translation, read at a glance: an
 * optional speaker label and the running caption text on a surface, anchored low
 * (like the real Captions app). You feed the text; keep the last 1–2 lines.
 */
export function LiveCaptions({
  speaker,
  children,
  translated = false,
  className,
}: {
  /** Who is speaking. */
  speaker?: ReactNode;
  /** The caption text (latest line[s]). */
  children: ReactNode;
  /** Mark as a translation (shows a small badge). */
  translated?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("gk-captions gk-surface", className)} role="status" aria-live="polite">
      {speaker != null || translated ? (
        <div className="gk-captions__head">
          {speaker != null ? (
            <span className="gk-captions__speaker t-caption">{speaker}</span>
          ) : null}
          {translated ? (
            <span className="gk-captions__badge t-caption">Translated</span>
          ) : null}
        </div>
      ) : null}
      <p className="gk-captions__text t-readout">{children}</p>
    </div>
  );
}
