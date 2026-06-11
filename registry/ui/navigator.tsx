"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { seedFocus } from "@glasskit-ui/react";
import { cn } from "../lib/utils";

/**
 * <Navigator> — a screen stack for glasses apps (react-navigation semantics,
 * glasses-native mechanics). The Display's system back gesture (middle pinch)
 * pops browser history and the page receives `popstate` (glasses OS v125.1+),
 * so every push adds a real history entry and back — gesture, Escape in
 * desktop dev, or `pop()` — flows through one path: history → popstate →
 * stack. At the root the gesture falls through to the system (app
 * switcher/menu), exactly like Android's back contract.
 *
 * One screen renders at a time (one task per view); pushing unmounts nothing
 * until the entry is popped, but only the top screen is in the DOM so the
 * D-pad focus engine never sees covered screens. Focus seeds to the new
 * screen's first focusable on every stack change.
 *
 * Overlays intercept back with `useBackHandler` (last registered wins first;
 * return true to consume — e.g. close a sheet instead of leaving the screen).
 */

type NavEntry = { name: string; params?: unknown; key: number };

type NavAPI = {
  /** Current stack, root first. */
  stack: readonly NavEntry[];
  /** Push a screen (adds a history entry — system back returns here). */
  push: (name: string, params?: unknown) => void;
  /** Pop one screen (no-op at the root). */
  pop: () => void;
  /** Pop everything back to the root screen. */
  popToTop: () => void;
  /** Swap the top screen without growing the stack. */
  replace: (name: string, params?: unknown) => void;
};

const NavContext = createContext<NavAPI | null>(null);
const BackChainContext = createContext<{
  current: Array<() => boolean>;
} | null>(null);

/** Navigation API of the nearest <Navigator>. */
export function useNavigator(): NavAPI {
  const api = useContext(NavContext);
  if (!api) throw new Error("useNavigator must be used inside <Navigator>");
  return api;
}

/**
 * Intercept the back gesture while mounted (overlays, confirm sheets,
 * mid-flow guards). `handler` returns true to consume the back, false to let
 * it pop the screen. Handlers run newest-first.
 */
export function useBackHandler(handler: () => boolean): void {
  const chain = useContext(BackChainContext);
  if (!chain) throw new Error("useBackHandler must be used inside <Navigator>");
  const ref = useRef(handler);
  ref.current = handler;
  useEffect(() => {
    const entry = () => ref.current();
    chain.current.push(entry);
    return () => {
      chain.current.splice(chain.current.indexOf(entry), 1);
    };
  }, [chain]);
}

export function Navigator({
  screens,
  initial,
  initialParams,
  className,
}: {
  /** Screen renderers by name; receive the push params. */
  screens: Record<string, (params?: unknown) => ReactNode>;
  /** Root screen name. */
  initial: string;
  initialParams?: unknown;
  className?: string;
}) {
  const [stack, setStack] = useState<NavEntry[]>(() => [
    { name: initial, params: initialParams, key: 0 },
  ]);
  const keyRef = useRef(0);
  const backChain = useRef<Array<() => boolean>>([]);

  // Mirror of the stack for event handlers (popstate/keydown read the latest
  // without re-subscribing per render).
  const stackRef = useRef(stack);
  stackRef.current = stack;

  /** Ask overlays first; true = back was consumed. */
  const runBackChain = () => {
    for (let i = backChain.current.length - 1; i >= 0; i--) {
      if (backChain.current[i]!()) return true;
    }
    return false;
  };

  useEffect(() => {
    // Mark the root so popstate can tell our entries from the host page's.
    if (history.state?.gkNavDepth == null) {
      history.replaceState({ ...history.state, gkNavDepth: 0 }, "");
    }

    const onPopstate = (e: PopStateEvent) => {
      const depth: number = e.state?.gkNavDepth ?? 0;
      if (depth >= stackRef.current.length - 1) return; // not ours / no-op
      if (runBackChain()) {
        // An overlay consumed the back — restore the history entry the
        // system just popped so depth and stack stay in sync.
        history.pushState({ gkNavDepth: stackRef.current.length - 1 }, "");
        return;
      }
      setStack((s) => s.slice(0, depth + 1));
    };

    // Desktop dev parity: the official simulator mapping is BACK = Escape;
    // on-device the gesture never reaches keydown (v125.1 sends popstate).
    // Routing Escape through history.back() converges both worlds.
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (runBackChain()) return;
      if (stackRef.current.length > 1) history.back();
    };

    window.addEventListener("popstate", onPopstate);
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("popstate", onPopstate);
      window.removeEventListener("keydown", onKeydown);
    };
  }, []);

  const push = useCallback((name: string, params?: unknown) => {
    setStack((s) => {
      history.pushState({ gkNavDepth: s.length }, "");
      return [...s, { name, params, key: ++keyRef.current }];
    });
  }, []);

  const pop = useCallback(() => {
    if (stackRef.current.length > 1) history.back();
  }, []);

  const popToTop = useCallback(() => {
    const depth = stackRef.current.length - 1;
    if (depth > 0) history.go(-depth);
  }, []);

  const replace = useCallback((name: string, params?: unknown) => {
    setStack((s) => [
      ...s.slice(0, -1),
      { name, params, key: ++keyRef.current },
    ]);
  }, []);

  const api = useMemo<NavAPI>(
    () => ({ stack, push, pop, popToTop, replace }),
    [stack, push, pop, popToTop, replace],
  );

  // New screen on top → move the D-pad focus to it.
  const top = stack[stack.length - 1]!;
  useEffect(() => {
    seedFocus();
  }, [top.key]);

  return (
    <NavContext.Provider value={api}>
      <BackChainContext.Provider value={backChain}>
        <div key={top.key} className={cn("gk-nav", className)}>
          {screens[top.name]?.(top.params) ?? null}
        </div>
      </BackChainContext.Provider>
    </NavContext.Provider>
  );
}
