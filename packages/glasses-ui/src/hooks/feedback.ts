/**
 * Haptic feedback seam for the Meta Ray-Ban Display.
 *
 * The Neural Band can buzz — the OS does it for system gestures — but no
 * haptics API reaches web apps yet (see the platform wishlist). This is the
 * forward-compat seam, shaped like `useNeuralBand`'s event channel:
 *
 *   - dispatches a `glasskitfeedback` CustomEvent so a future OS bridge (or
 *     your test harness / phone-relay layer) can deliver the buzz, and
 *   - calls `navigator.vibrate` where the UA supports it (desktop/Android
 *     dev — the Display webview currently ignores it),
 *   - no-ops gracefully everywhere else, SSR included.
 *
 * Call it at interaction points (`buzz("tap")` on activate, `"success"` on a
 * completed flow) and the day haptics ship, every call site lights up.
 */

export type FeedbackPattern = "tap" | "success" | "warning";

const PATTERNS: Record<FeedbackPattern, number[]> = {
  tap: [10],
  success: [15, 60, 15],
  warning: [40, 80, 40],
};

/** Fire a haptic cue. Safe to call anywhere — no-ops without a platform. */
export function buzz(pattern: FeedbackPattern = "tap"): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("glasskitfeedback", { detail: { pattern } }),
  );
  navigator.vibrate?.(PATTERNS[pattern]);
}

/**
 * Hook form of `buzz` — returns a stable `{ buzz }` for component code.
 * (A plain function today; a hook so future platform wiring — capability
 * detection, user settings — needs no call-site changes.)
 */
export function useFeedback(): { buzz: typeof buzz } {
  return { buzz };
}
