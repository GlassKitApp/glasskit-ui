/**
 * A tiny swappable history abstraction for <Navigator> — the React
 * Router / TanStack pattern. Navigator drives navigation through this seam
 * instead of touching globals directly, so production runs on the real
 * `window.history` (the Display's middle-pinch BACK gesture arrives as a real
 * `popstate` on `window`, OS v125.1+) while tests inject an in-memory stack
 * and stop racing on jsdom's shared `window.history`.
 *
 * `createBrowserHistory()` is the production default and behaves exactly like
 * the prior direct calls: same `window.history` methods, same real `window`
 * `popstate` listener. `createMemoryHistory()` mirrors those semantics over an
 * internal entry stack — a state object and URL carried per entry — and
 * notifies subscribers (via a microtask, matching how the tests `await`) when
 * `back()`/`go()` traverse, so Navigator behaves identically off-window.
 */

/** A single history entry: the structured-clone-able state and its URL. */
export type GlassHistoryEntry = {
  state: unknown;
  url: string;
};

/**
 * The slice of the history API <Navigator> needs. Mirrors `window.history`
 * (plus `location.pathname` via `pathname`) so the browser adapter is a thin
 * pass-through and the memory adapter is a faithful stand-in.
 */
export type GlassHistory = {
  /** Current `history.state`. */
  readonly state: unknown;
  /** Current `location.pathname`. */
  readonly pathname: string;
  /** Push a new entry (adds a traversable entry — back returns here). */
  pushState(state: unknown, url?: string | null): void;
  /** Replace the current entry in place (no new entry). */
  replaceState(state: unknown, url?: string | null): void;
  /** Traverse back one entry (fires the popstate notification). */
  back(): void;
  /** Traverse by `delta` entries (negative = back). */
  go(delta: number): void;
  /**
   * Subscribe to popstate-style traversals; the callback receives a
   * PopStateEvent-shaped object carrying the entry's `state`. Returns an
   * unsubscribe.
   */
  subscribe(onPopstate: (e: { state: unknown }) => void): () => void;
};

/**
 * Production default: a thin wrapper over the real `window.history` /
 * `window` `popstate` / `location`. Every method is a direct pass-through, so
 * on-device semantics are byte-for-byte identical to calling the globals.
 */
export function createBrowserHistory(): GlassHistory {
  return {
    get state() {
      return window.history.state;
    },
    get pathname() {
      return window.location.pathname;
    },
    pushState(state, url) {
      window.history.pushState(state, "", url ?? undefined);
    },
    replaceState(state, url) {
      window.history.replaceState(state, "", url ?? undefined);
    },
    back() {
      window.history.back();
    },
    go(delta) {
      window.history.go(delta);
    },
    subscribe(onPopstate) {
      const handler = (e: PopStateEvent) => onPopstate(e);
      window.addEventListener("popstate", handler);
      return () => window.removeEventListener("popstate", handler);
    },
  };
}

/**
 * In-memory history for deterministic tests: an entry stack with its own
 * index, never touching `window`. `back()`/`go()` move the index and notify
 * subscribers on a microtask with the now-current entry's state — mirroring
 * how jsdom's real traversal resolves across queued tasks (the tests `await` a
 * settle before asserting). State objects are carried per entry exactly as the
 * browser does.
 */
export function createMemoryHistory(
  initial?: { state?: unknown; url?: string },
): GlassHistory {
  const entries: GlassHistoryEntry[] = [
    { state: initial?.state ?? null, url: initial?.url ?? "/" },
  ];
  let index = 0;
  const listeners = new Set<(e: { state: unknown }) => void>();

  const notify = () => {
    const state = entries[index]!.state;
    // Microtask, matching jsdom's async traversal (the tests await a settle).
    queueMicrotask(() => {
      for (const l of [...listeners]) l({ state });
    });
  };

  return {
    get state() {
      return entries[index]!.state;
    },
    get pathname() {
      return entries[index]!.url;
    },
    pushState(state, url) {
      // Drop any forward entries, exactly like a real navigation.
      entries.splice(index + 1);
      entries.push({ state, url: url ?? entries[index]!.url });
      index = entries.length - 1;
    },
    replaceState(state, url) {
      entries[index] = { state, url: url ?? entries[index]!.url };
    },
    back() {
      this.go(-1);
    },
    go(delta) {
      const next = index + delta;
      if (next < 0 || next >= entries.length || delta === 0) return;
      index = next;
      notify();
    },
    subscribe(onPopstate) {
      listeners.add(onPopstate);
      return () => {
        listeners.delete(onPopstate);
      };
    },
  };
}
