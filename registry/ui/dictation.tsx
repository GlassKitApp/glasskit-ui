import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Dictation> — the voice-to-text surface (there is no keyboard on the lens —
 * text is voice or Neural-Band handwriting). A live waveform + the running
 * transcript; `listening` animates the bars. Pure display — you own the speech
 * recognition and feed `transcript`.
 */
export function Dictation({
  transcript,
  listening = true,
  placeholder = "Speak now…",
  className,
}: {
  transcript?: ReactNode;
  listening?: boolean;
  placeholder?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "gk-dictation",
        listening && "gk-dictation--listening",
        className,
      )}
      role="status"
    >
      <span className="gk-dictation__wave" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className="gk-dictation__text t-readout">
        {transcript != null && transcript !== "" ? (
          transcript
        ) : (
          <span className="gk-dictation__placeholder">{placeholder}</span>
        )}
      </span>
    </div>
  );
}
