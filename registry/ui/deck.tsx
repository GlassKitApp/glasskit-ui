"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { seedFocus, useNeuralBand } from "@glasskit-ui/react";
import { cn } from "../lib/utils";
import { Progress } from "./progress";

/**
 * <Deck> — a horizontal paged flow (wizard / onboarding). Shows one page at a
 * time with step dots beneath (reusing Progress). Self-connects to
 * useNeuralBand: a wristband `swipe` advances to the next page (clamped, no
 * wrap). Pass `index` to control paging yourself — a controlled Deck never
 * self-advances; swipes surface through `onIndexChange` instead.
 * One nav model per screen: pages advance on pinch / D-pad, never scroll.
 *
 * Platform note (2026-06): the Display delivers web apps only arrow/Enter
 * keys + history-back — it does not (yet) dispatch custom gesture events, so
 * the `neuralband` CustomEvent is a forward-compat seam you (or a future OS)
 * dispatch. For paging that works on-device today, drive `index` from a
 * focusable control (Button, Stepper) or your own ArrowLeft/ArrowRight
 * handling.
 */
export function Deck({
  index,
  defaultIndex = 0,
  onIndexChange,
  children,
  className,
}: {
  /** Controlled page. Omit for uncontrolled (Neural Band swipes advance). */
  index?: number;
  /** Starting page when uncontrolled. */
  defaultIndex?: number;
  /** Fires with the next page on every swipe (both modes). */
  onIndexChange?: (index: number) => void;
  /** One node per page. Falsy children (`{cond && <Page/>}`) are dropped, which
   *  changes the page count — render every page and gate inside it instead. */
  children: ReactNode;
  className?: string;
}) {
  const pages = Children.toArray(children);
  const count = pages.length;
  const controlled = index != null;
  const [internal, setInternal] = useState(defaultIndex);
  const current = Math.max(
    0,
    Math.min(controlled ? index : internal, count - 1),
  );

  // useNeuralBand is a one-shot (the gesture clears on the next microtask),
  // so an effect keyed on the gesture alone fires exactly once per physical
  // swipe — consecutive identical swipes both advance. Everything else is
  // read through a latest-values ref: with it in the deps, the re-render the
  // advance itself causes would re-run the effect while the gesture string is
  // still set and double-advance.
  const gesture = useNeuralBand();
  const latest = useRef({ current, count, controlled, onIndexChange });
  latest.current = { current, count, controlled, onIndexChange };
  useEffect(() => {
    if (gesture !== "swipe") return;
    const { current, count, controlled, onIndexChange } = latest.current;
    const next = Math.min(current + 1, count - 1);
    if (next === current) return;
    if (!controlled) setInternal(next);
    onIndexChange?.(next);
  }, [gesture]);

  // If the focused element lived inside the outgoing page it unmounts on
  // advance, stranding focus on <body> — reseed the D-pad ring. Only when
  // orphaned: a focus that survived (e.g. an external Next button) keeps it.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const active = document.activeElement;
    if (!active || active === document.body) seedFocus();
  }, [current]);

  return (
    <div className={cn("flex w-full flex-col items-center gap-5", className)}>
      <div
        className="flex flex-col items-center gap-3 text-center"
        role="group"
        aria-label={`Page ${current + 1} of ${count}`}
      >
        {pages[current]}
      </div>
      {count > 1 ? (
        <Progress variant="step" value={current + 1} max={count} />
      ) : null}
    </div>
  );
}
