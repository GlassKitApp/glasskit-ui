import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Pressable> — the focusable wrapper for custom UI. Renders a real <button>
 * carrying the `focusable` class, so `useDpad()` walks it in spatial navigation
 * and fires `onPress` on Enter / the Neural Band pinch (the hook calls
 * `.click()`). Reach for it whenever you need to make your own content
 * D-pad-interactive and no first-class component (Button, List, Launcher) fits:
 * a custom card, a tile, a tappable row. It adds no chrome of its own beyond the
 * focus ring and press animation, so style the inside however you like.
 */
export function Pressable({
  children,
  onPress,
  disabled,
  initialFocus = false,
  "aria-label": ariaLabel,
  className,
}: {
  children: ReactNode;
  /** Fires on Enter / pinch (and click). */
  onPress?: () => void;
  disabled?: boolean;
  /** Seed the D-pad ring here when the screen mounts (`data-autofocus`). */
  initialFocus?: boolean;
  "aria-label"?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onPress}
      data-autofocus={initialFocus || undefined}
      aria-label={ariaLabel}
      className={cn("focusable gk-pressable", className)}
    >
      {children}
    </button>
  );
}
