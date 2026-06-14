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
import { getFocusables, seedFocus } from "@glasskit-ui/react";
import { cn } from "../lib/utils";
import { createBrowserHistory, type GlassHistory } from "../lib/glass-history";

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
 * screen's first focusable (or its `data-autofocus` target) on push; popping
 * back restores the ring to the element that opened the screen — the row you
 * came from, not the top of the list (focus memory).
 *
 * Overlays intercept back with `useBackHandler` (last registered wins first;
 * return true to consume — e.g. close a sheet instead of leaving the screen).
 *
 * The stack itself rides in `history.state` (when params are
 * structured-cloneable), so a mid-flow reload restores the screen the wearer
 * was on instead of kicking them to the root. Optional `paths` mirrors the
 * stack into the URL (`/detail` on push, restored on back) — give the host a
 * catch-all route and pushed screens become deep-linkable.
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
  paths,
  className,
  history: historyProp,
}: {
  /** Screen renderers by name; receive the push params. */
  screens: Record<string, (params?: unknown) => ReactNode>;
  /** Root screen name. */
  initial: string;
  initialParams?: unknown;
  /** Screen name → URL segment. Mirrors the stack into the pathname
   *  (appended to the pathname where the Navigator mounted). */
  paths?: Record<string, string>;
  className?: string;
  /**
   * Advanced/testing seam: a swappable history adapter (the React
   * Router / TanStack pattern). Defaults to {@link createBrowserHistory},
   * which drives the real `window.history` and `window` `popstate` exactly
   * as before — leave it unset in production. Inject `createMemoryHistory()`
   * in tests for a deterministic in-memory stack that never touches `window`.
   */
  history?: GlassHistory;
}) {
  // One stable adapter for the component's lifetime; the browser default is
  // created lazily so production behaviour is identical to direct globals.
  const historyRef = useRef<GlassHistory | undefined>(historyProp);
  if (!historyRef.current) historyRef.current = createBrowserHistory();
  const history = historyRef.current;
  const [stack, setStack] = useState<NavEntry[]>(() => [
    { name: initial, params: initialParams, key: 0 },
  ]);
  const keyRef = useRef(0);
  const backChain = useRef<Array<() => boolean>>([]);
  // Focus memory: entry key → index (in D-pad order) of the element that was
  // focused when that screen pushed. Restored when the screen resurfaces.
  const focusMemory = useRef(new Map<number, number>());

  // Mirror of the stack for event handlers (popstate/keydown read the latest
  // without re-subscribing per render).
  const stackRef = useRef(stack);
  stackRef.current = stack;

  // Pathname where the Navigator mounted — `paths` segments append to it.
  const basePath = useRef<string | null>(null);
  const pathsRef = useRef(paths);
  pathsRef.current = paths;

  const urlFor = (name: string): string | undefined => {
    const seg = pathsRef.current?.[name];
    if (seg == null || basePath.current == null) return undefined;
    return seg === "" ? basePath.current : `${basePath.current}/${seg}`;
  };

  /** history.state payload for a stack — drops params that can't be cloned
   *  (a reload then restores the screen without them). */
  const stateFor = (s: NavEntry[]) => {
    const entries = s.map((e) => ({ name: e.name, params: e.params }));
    try {
      structuredClone(entries);
      return { gkNavDepth: s.length - 1, gkStack: entries };
    } catch {
      return {
        gkNavDepth: s.length - 1,
        gkStack: entries.map((e) => ({ name: e.name })),
      };
    }
  };

  /** Ask overlays first; true = back was consumed. */
  const runBackChain = () => {
    for (let i = backChain.current.length - 1; i >= 0; i--) {
      if (backChain.current[i]!()) return true;
    }
    return false;
  };

  useEffect(() => {
    basePath.current = history.pathname.replace(/\/$/, "");

    const state = history.state as
      | { gkStack?: Array<{ name: string; params?: unknown }>; gkNavDepth?: number }
      | null
      | undefined;
    const saved = state?.gkStack;
    if (state?.gkNavDepth == null) {
      // Fresh entry — mark the root so popstate can tell our entries from
      // the host page's.
      history.replaceState({
        ...(state ?? {}),
        ...stateFor(stackRef.current),
      });
    } else if (saved && saved.length > 1 && stackRef.current.length === 1) {
      // Reload mid-flow: this entry carries a deeper stack — restore it so
      // the wearer lands back on the screen they were on. basePath must not
      // include the restored top's segment, so strip it when paths are on.
      const topSeg = pathsRef.current?.[saved[saved.length - 1]!.name];
      if (topSeg && basePath.current.endsWith(`/${topSeg}`)) {
        basePath.current = basePath.current.slice(0, -(topSeg.length + 1));
      }
      setStack(
        saved.map((e) => ({
          name: e.name,
          params: e.params,
          key: ++keyRef.current,
        })),
      );
    }

    const onPopstate = (e: { state: unknown }) => {
      const depth: number =
        (e.state as { gkNavDepth?: number } | null | undefined)?.gkNavDepth ??
        0;
      if (depth >= stackRef.current.length - 1) return; // not ours / no-op
      if (runBackChain()) {
        // An overlay consumed the back — restore the history entry the
        // system just popped so depth and stack stay in sync.
        history.pushState(
          stateFor([...stackRef.current]),
          urlFor(stackRef.current[stackRef.current.length - 1]!.name),
        );
        return;
      }
      setStack((s) => s.slice(0, depth + 1));
    };

    // Desktop dev parity: the official simulator mapping is BACK = Escape;
    // on-device the gesture never reaches keydown (v125.1 sends popstate).
    // Routing Escape through the adapter's back() converges both worlds.
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (runBackChain()) return;
      if (stackRef.current.length > 1) history.back();
    };

    const unsubscribe = history.subscribe(onPopstate);
    window.addEventListener("keydown", onKeydown);
    return () => {
      unsubscribe();
      window.removeEventListener("keydown", onKeydown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const push = useCallback((name: string, params?: unknown) => {
    setStack((s) => {
      // Remember where the ring was on the outgoing screen (idempotent —
      // safe under StrictMode's double-invoke, like the pushState below).
      const idx = getFocusables().indexOf(
        document.activeElement as HTMLElement,
      );
      if (idx !== -1) focusMemory.current.set(s[s.length - 1]!.key, idx);
      const next = [...s, { name, params, key: ++keyRef.current }];
      history.pushState(stateFor(next), urlFor(name));
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pop = useCallback(() => {
    if (stackRef.current.length > 1) history.back();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const popToTop = useCallback(() => {
    const depth = stackRef.current.length - 1;
    if (depth > 0) history.go(-depth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const replace = useCallback((name: string, params?: unknown) => {
    setStack((s) => {
      const next = [...s.slice(0, -1), { name, params, key: ++keyRef.current }];
      history.replaceState(stateFor(next), urlFor(name));
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api = useMemo<NavAPI>(
    () => ({ stack, push, pop, popToTop, replace }),
    [stack, push, pop, popToTop, replace],
  );

  // Stack top changed → move the D-pad ring. Returning to a remembered
  // screen restores the element that pushed (clamped if the list shrank);
  // a fresh screen seeds normally.
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
