"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn, stringLabel } from "../lib/utils";
import { Progress } from "./progress";

/**
 * <Timer> — a countdown readout: big tabular m:ss (h:mm:ss past an hour), an
 * optional label, and a bar draining toward zero. Self-ticking by default:
 * give it `duration` and flip `running` to pause/resume — ticks are end-time
 * anchored (no setTimeout drift) and aligned to the second boundary.
 * `onComplete` fires once at zero. Pass `remaining` to control it instead:
 * the prop always wins, the component never ticks, and `onComplete` is yours
 * to call — you own the clock.
 */
export function Timer({
  duration,
  remaining,
  running = true,
  label,
  showBar = true,
  onComplete,
  className,
}: {
  /** Total seconds. Drives self-ticking and the drain bar's scale. */
  duration?: number;
  /** Controlled seconds left. Omit to self-tick from `duration`. */
  remaining?: number;
  /** Pause/resume the self-ticking countdown. */
  running?: boolean;
  label?: ReactNode;
  /** Hide the drain bar (it needs `duration` for its scale). */
  showBar?: boolean;
  /** Fires once when a self-ticking countdown reaches zero. */
  onComplete?: () => void;
  className?: string;
}) {
  const controlled = remaining != null;
  const [internal, setInternal] = useState(duration ?? 0);

  // Latest-values refs: the anchor effect reads these at (re)start time so
  // pausing/resuming re-anchors from the frozen value, and onComplete stays
  // current without being an effect dependency.
  const internalRef = useRef(internal);
  internalRef.current = internal;
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // A new duration is a new countdown — reset. Runs before the anchor effect
  // below (declaration order), so the ref is fresh when it re-anchors.
  useEffect(() => {
    setInternal(duration ?? 0);
    internalRef.current = duration ?? 0;
  }, [duration]);

  useEffect(() => {
    if (controlled || !running || internalRef.current <= 0) return;
    // Anchor to a wall-clock end time: each tick recomputes from it, so
    // timeout jitter never accumulates into a slow timer.
    const endAt = Date.now() + internalRef.current * 1000;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(tick, ((endAt - Date.now() - 20) % 1000) + 20);
    };
    const tick = () => {
      const left = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      setInternal(left);
      if (left <= 0) {
        onCompleteRef.current?.();
        return;
      }
      schedule();
    };
    schedule();
    return () => clearTimeout(timer);
  }, [controlled, running, duration]);

  const shown = controlled ? Math.max(0, remaining) : internal;
  return (
    <div
      className={cn("gk-timer", className)}
      role="timer"
      aria-label={stringLabel(label) ?? "Timer"}
    >
      <span className="gk-timer__time">{formatSeconds(shown)}</span>
      {label != null ? (
        <span className="gk-timer__label t-caption">{label}</span>
      ) : null}
      {showBar && duration != null && duration > 0 ? (
        <Progress
          value={shown}
          max={duration}
          className="gk-timer__bar"
          label={stringLabel(label) ?? "Time left"}
        />
      ) : null}
    </div>
  );
}

function formatSeconds(total: number): string {
  const s = Math.max(0, Math.floor(total));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const mm = h > 0 ? String(m).padStart(2, "0") : String(m);
  return `${h > 0 ? `${h}:` : ""}${mm}:${String(s % 60).padStart(2, "0")}`;
}
