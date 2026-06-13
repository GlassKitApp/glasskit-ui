import { useEffect, useRef, type ReactNode } from "react";

/**
 * D-pad focus navigation for the Meta Ray-Ban Display.
 *
 * The Display has no touch and no pointer. The Neural Band wristband
 * is the only input — its swipes/clicks reach the Web App as arrow
 * keys + Enter. So navigation is: move a focus ring between elements
 * with the arrows, activate with Enter.
 *
 * Convention: give any interactive element the `focusable` class.
 * `useDpad()` (call once near the app root) does the rest — spatial
 * navigation picks the nearest `focusable` in the pressed direction.
 *
 * Locally, your keyboard's arrow keys simulate the wristband.
 */

export type Dir = "up" | "down" | "left" | "right";

const SELECTOR = ".focusable:not([disabled]):not([aria-disabled='true'])";

const KEY_TO_DIR: Record<string, Dir> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
};

type RectLike = { left: number; top: number; width: number; height: number };

/**
 * Score a candidate's position relative to the current rect in a
 * direction. Returns null if the candidate is not in `dir` at all,
 * otherwise a positive number where lower wins. Pure — no DOM. The
 * extraction makes the spatial-focus algorithm directly unit-testable.
 */
export function scoreRect(
  current: RectLike,
  candidate: RectLike,
  dir: Dir,
): number | null {
  const cx = current.left + current.width / 2;
  const cy = current.top + current.height / 2;
  const dx = candidate.left + candidate.width / 2 - cx;
  const dy = candidate.top + candidate.height / 2 - cy;

  const inDir =
    (dir === "up" && dy < -1) ||
    (dir === "down" && dy > 1) ||
    (dir === "left" && dx < -1) ||
    (dir === "right" && dx > 1);
  if (!inDir) return null;

  const vertical = dir === "up" || dir === "down";
  const along = Math.abs(vertical ? dy : dx);
  const cross = Math.abs(vertical ? dx : dy);
  // Distance in the travel direction, plus a penalty for drift.
  return along + cross * 2;
}

/* Active focus scopes, innermost last. While any scope is mounted, the
 * D-pad ring is contained to the innermost one — arrows can't wander out
 * of a modal (Confirm, PermissionPrompt, a sheet) onto covered content. */
const scopes: HTMLElement[] = [];

function focusables(): HTMLElement[] {
  // Zero-size elements (display:none pages, collapsed containers) are not
  // real focus targets — without this filter the spatial scorer can route
  // focus to something invisible.
  const scope = scopes[scopes.length - 1];
  return Array.from(
    (scope ?? document).querySelectorAll<HTMLElement>(SELECTOR),
  ).filter((el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  });
}

/**
 * The current D-pad candidates, in DOM order — honors the innermost
 * <FocusScope> and skips disabled/invisible elements. Exposed so navigation
 * containers can implement focus memory (record the focused index on push,
 * restore it on pop).
 */
export function getFocusables(): HTMLElement[] {
  return focusables();
}

/**
 * A focused range input owns its horizontal axis: ArrowLeft/Right must
 * adjust the value natively (volume, brightness), not move focus away.
 * Vertical arrows still navigate — the watch/TV convention.
 */
function rangeOwnsKey(active: Element | null, dir: Dir): boolean {
  return (
    active instanceof HTMLInputElement &&
    active.type === "range" &&
    (dir === "left" || dir === "right")
  );
}

/**
 * Flash a synthetic press state on activate. Enter/Space reaches an element
 * via `.click()`, which never triggers `:active` (that's pointer/key-press
 * only) — so a Neural Band select would fire the handler but look dead. The
 * `[data-gk-press]` attribute mirrors every `:active` press rule in
 * styles.css; we set it, let the transition play, then clear it.
 */
let pressEl: HTMLElement | null = null;
let pressTimer = 0;
function flashPress(el: HTMLElement) {
  if (pressEl && pressEl !== el) pressEl.removeAttribute("data-gk-press");
  clearTimeout(pressTimer);
  pressEl = el;
  el.setAttribute("data-gk-press", "");
  pressTimer = window.setTimeout(() => {
    el.removeAttribute("data-gk-press");
    pressEl = null;
  }, 150);
}

function moveFocus(dir: Dir) {
  const els = focusables();
  if (els.length === 0) return;

  const active = document.activeElement as HTMLElement | null;
  const current = active && els.includes(active) ? active : els[0];
  if (!current) return;

  if (current !== active) {
    current.focus({ preventScroll: true });
    return;
  }

  const cr = current.getBoundingClientRect();
  let best: HTMLElement | null = null;
  let bestScore = Infinity;

  for (const el of els) {
    if (el === current) continue;
    const score = scoreRect(cr, el.getBoundingClientRect(), dir);
    if (score !== null && score < bestScore) {
      bestScore = score;
      best = el;
    }
  }

  // preventScroll: the engine only moves the ring — scrolling a focused row
  // into view is the scroll container's job (e.g. <List> does it smoothly and
  // centered). Native focus-scroll is instant + edge-aligned, which reads as a
  // hard per-row jump.
  best?.focus({ preventScroll: true });
}

/**
 * Move focus to the screen's preferred element: the first focusable carrying
 * `data-autofocus`, else the first focusable in DOM order. Exposed so a
 * screen that swaps its content under a single `useDpad()` (no remount) can
 * re-seed focus when its focusable set changes — `useDpad` itself only seeds
 * once on mount. Uses the same `SELECTOR`, so it skips disabled elements.
 */
export function seedFocus(): void {
  const els = focusables();
  (els.find((el) => el.hasAttribute("data-autofocus")) ?? els[0])?.focus({
    preventScroll: true,
  });
}

/**
 * <FocusScope> — contain the D-pad ring to a subtree while mounted (modal
 * surfaces: Confirm, PermissionPrompt, sheets). On mount it seeds focus
 * inside; arrows and Enter only see focusables within the innermost mounted
 * scope; on unmount focus returns to the element that had it before the
 * scope opened (or reseeds if that element is gone). Renders a
 * `display: contents` wrapper, so it never affects layout.
 */
export function FocusScope({
  children,
  restoreFocus = true,
}: {
  children: ReactNode;
  /** Return focus to the previously focused element on unmount. */
  restoreFocus?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prev = document.activeElement as HTMLElement | null;
    scopes.push(el);
    seedFocus();
    return () => {
      const i = scopes.indexOf(el);
      if (i !== -1) scopes.splice(i, 1);
      if (restoreFocus && prev?.isConnected && prev !== document.body) {
        prev.focus();
      } else if (
        !document.activeElement ||
        document.activeElement === document.body
      ) {
        seedFocus();
      }
    };
    // restoreFocus is read at cleanup time by closure on purpose — remounting
    // the scope to change it would lose the saved focus target.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div ref={ref} className="gk-focus-scope">
      {children}
    </div>
  );
}

/**
 * Wire the D-pad to focus navigation. Call once, near the app root.
 * Returns `{ seedFocus }` for screens that need to re-seed focus after
 * swapping content within the same mount.
 */
export function useDpad(): { seedFocus: () => void } {
  useEffect(() => {
    seedFocus();

    function onKey(e: KeyboardEvent) {
      const pressed = KEY_TO_DIR[e.key];
      if (pressed) {
        // A focused slider consumes its own axis (native value adjust);
        // preventDefault here would make ranges impossible to operate.
        if (rangeOwnsKey(document.activeElement, pressed)) return;
        e.preventDefault();
        moveFocus(pressed);
        return;
      }

      if (e.key === "Enter" || e.key === " ") {
        const active = document.activeElement as HTMLElement | null;
        if (active?.classList.contains("focusable")) {
          e.preventDefault();
          flashPress(active);
          active.click();
        }
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return { seedFocus };
}
