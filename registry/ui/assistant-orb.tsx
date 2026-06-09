import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <AssistantOrb> — the Meta-AI presence: a glowing gradient orb that animates
 * per `state` (idle = gentle breathe, listening = pulse, thinking = swirl,
 * speaking = quick pulse). Pair it with a `label` / transcript line. Motion
 * collapses under reduce-motion.
 */
export function AssistantOrb({
  state = "idle",
  label,
  className,
}: {
  state?: "idle" | "listening" | "thinking" | "speaking";
  /** Optional caption (e.g. "Listening…" or the transcript). */
  label?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("gk-orb", `gk-orb--${state}`, className)}
      role="status"
      aria-label={typeof label === "string" ? label : `Assistant ${state}`}
    >
      <span className="gk-orb__core" aria-hidden="true" />
      {label != null ? (
        <span className="gk-orb__label t-body">{label}</span>
      ) : null}
    </div>
  );
}
