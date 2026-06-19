"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getFocusables, seedFocus } from "./dpad";

/**
 * Glasses navigation as a HOOK, not a component — the routing logic is a
 * primitive (like react-router's `useNavigate`), and you render your own
 * screens. The Meta Ray-Ban Display's system back gesture (middle pinch) pops
 * browser history and the page receives `popstate`, so every `push()` adds a
 * real history entry and back — the gesture, Escape in desktop dev, or `pop()`
 * — flows through one path: history → popstate → stack. At the root, back falls
 * through to the system (app switcher / menu), exactly like Android's back
 * contract.
 *
 * Call {@link useNavigator} ONCE near the app root, render the current screen
 * yourself from `screen` + `params`, and pass `push`/`pop` down (or via your own
 * context). Overlays/sheets intercept back with {@link useBackHandler}.
 *
 * The stack rides in `history.state`, so a mid-flow reload restores the screen
 * the wearer was on instead of dropping them at the root.
 *
 * @example
 * function App() {
 *   const nav = useNavigator("home");
 *   if (nav.screen === "detail") return <Detail id={nav.params} onBack={nav.pop} />;
 *   return <Home onOpen={(id) => nav.push("detail", id)} />;
 * }
 */

export type NavEntry = { name: string; params?: unknown; key: number };

export type Navigator = {
  /** The current (top) screen name — render this one. */
  screen: string;
  /** Params passed to the current screen via `push`/`replace`. */
  params: unknown;
  /** The full stack, root first. */
  stack: readonly NavEntry[];
  /** Push a screen (adds a history entry; system back returns here). */
  push: (name: string, params?: unknown) => void;
  /** Pop one screen (no-op at the root). */
  pop: () => void;
  /** Pop everything back to the root screen. */
  popToTop: () => void;
  /** Swap the top screen without growing the stack. */
  replace: (name: string, params?: unknown) => void;
};

// A single module-level back chain, shared with useBackHandler (newest-first).
// Glasses apps run one navigator, so a module singleton is simpler than a React
// context and lets an overlay mounted anywhere consume the back gesture.
const backChain: Array<() => boolean> = [];
function runBackChain(): boolean {
  for (let i = backChain.length - 1; i >= 0; i--) {
    if (backChain[i]!()) return true;
  }
  return false;
}

type NavState = {
  gkNavDepth?: number;
  gkStack?: Array<{ name: string; params?: unknown }>;
};

/** history.state payload for a stack; drops params that can't be cloned so a
 *  reload still restores the screen (without those params). */
function stateFor(stack: NavEntry[]): NavState {
  const entries = stack.map((e) => ({ name: e.name, params: e.params }));
  try {
    structuredClone(entries);
    return { gkNavDepth: stack.length - 1, gkStack: entries };
  } catch {
    return {
      gkNavDepth: stack.length - 1,
      gkStack: entries.map((e) => ({ name: e.name })),
    };
  }
}

export function useNavigator(initial: string, initialParams?: unknown): Navigator {
  const [stack, setStack] = useState<NavEntry[]>(() => [
    { name: initial, params: initialParams, key: 0 },
  ]);
  const keyRef = useRef(0);
  // Mirror for the popstate/keydown handlers (read latest without re-subscribing).
  const stackRef = useRef(stack);
  stackRef.current = stack;
  // Focus memory: entry key → D-pad index focused when that screen pushed,
  // restored when the screen resurfaces (you return to the row you came from).
  const focusMemory = useRef(new Map<number, number>());

  useEffect(() => {
    const st = (window.history.state ?? {}) as NavState;
    if (st.gkNavDepth == null) {
      // Fresh entry — stamp our root so popstate can distinguish our entries
      // from the host page's.
      window.history.replaceState({ ...st, ...stateFor(stackRef.current) }, "");
    } else if (
      st.gkStack &&
      st.gkStack.length > 1 &&
      stackRef.current.length === 1
    ) {
      // Reloaded mid-flow — this entry carries a deeper stack; restore it so the
      // wearer lands back on the screen they were on.
      setStack(
        st.gkStack.map((e) => ({
          name: e.name,
          params: e.params,
          key: ++keyRef.current,
        })),
      );
    }

    const onPop = (e: PopStateEvent) => {
      const depth = (e.state as NavState | null)?.gkNavDepth ?? 0;
      if (depth >= stackRef.current.length - 1) return; // forward / not ours
      if (runBackChain()) {
        // An overlay consumed back — restore the entry the system just popped so
        // depth and stack stay in sync.
        window.history.pushState(stateFor([...stackRef.current]), "");
        return;
      }
      setStack((s) => s.slice(0, depth + 1));
    };
    // Desktop-dev parity: the official simulator maps BACK → Escape. On-device
    // the gesture sends popstate directly (it never reaches keydown).
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (runBackChain()) {
        e.preventDefault();
        return;
      }
      if (stackRef.current.length > 1) {
        e.preventDefault();
        window.history.back();
      }
    };

    window.addEventListener("popstate", onPop);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const push = useCallback((name: string, params?: unknown) => {
    setStack((s) => {
      // Remember where the ring was on the outgoing screen (idempotent — safe
      // under StrictMode's double-invoke, like the pushState below).
      const idx = getFocusables().indexOf(document.activeElement as HTMLElement);
      if (idx !== -1) focusMemory.current.set(s[s.length - 1]!.key, idx);
      const next = [...s, { name, params, key: ++keyRef.current }];
      window.history.pushState(stateFor(next), "");
      return next;
    });
  }, []);

  const pop = useCallback(() => {
    if (stackRef.current.length > 1) window.history.back();
  }, []);

  const popToTop = useCallback(() => {
    const depth = stackRef.current.length - 1;
    if (depth > 0) window.history.go(-depth);
  }, []);

  const replace = useCallback((name: string, params?: unknown) => {
    setStack((s) => {
      const next = [...s.slice(0, -1), { name, params, key: ++keyRef.current }];
      window.history.replaceState(stateFor(next), "");
      return next;
    });
  }, []);

  // Top screen changed → move the D-pad ring. Returning to a remembered screen
  // restores the element that opened it (clamped if its list shrank); a fresh
  // screen seeds to its first focusable.
  const top = stack[stack.length - 1]!;
  useEffect(() => {
    const remembered = focusMemory.current.get(top.key);
    if (remembered != null) {
      focusMemory.current.delete(top.key);
      const els = getFocusables();
      if (els.length > 0) {
        els[Math.min(remembered, els.length - 1)]!.focus();
        return;
      }
    }
    seedFocus();
  }, [top.key]);

  return { screen: top.name, params: top.params, stack, push, pop, popToTop, replace };
}

/**
 * Intercept the back gesture while mounted (overlays, sheets, confirm guards).
 * Return `true` to consume back (e.g. close the sheet), `false` to let it pop
 * the screen. Handlers run newest-first.
 */
export function useBackHandler(handler: () => boolean): void {
  const ref = useRef(handler);
  ref.current = handler;
  useEffect(() => {
    const entry = () => ref.current();
    backChain.push(entry);
    return () => {
      const i = backChain.indexOf(entry);
      if (i !== -1) backChain.splice(i, 1);
    };
  }, []);
}
