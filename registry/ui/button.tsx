import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Button> — a D-pad-focusable action. Renders a real <button> carrying
 * the `focusable` class, so `useDpad()` includes it in spatial navigation
 * and activates it on Enter/Space (the hook calls `.click()`, which fires
 * `onClick`). Edge + focus ring come from the additive `.focusable` recipe;
 * `primary` brightens the edge — no fills (apple-feel §9). `ghost` is
 * chrome-less (no surface or border, just text + focus ring + press) for
 * toolbars and icon rows.
 */
export function Button({
  children,
  variant = "secondary",
  icon,
  disabled,
  onClick,
  type = "button",
  initialFocus = false,
  "aria-label": ariaLabel,
  className,
}: {
  /** The label. Omit for an icon-only button, but then set `aria-label`. */
  children?: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  /** Optional leading glyph — typically a <Icon>. */
  icon?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  /** Seed the D-pad ring here when the screen mounts (`data-autofocus`). */
  initialFocus?: boolean;
  /** Accessible name — required for an icon-only button. */
  "aria-label"?: string;
  className?: string;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      data-autofocus={initialFocus || undefined}
      className={cn(
        "focusable press-scale t-body inline-flex items-center justify-center gap-2 rounded-2xl",
        variant === "primary"
          ? "btn-primary"
          : variant === "ghost"
            ? "bg-transparent border-0 text-foreground"
            : "surface",
        !children ? "p-[13px] [&_svg]:size-[22px]" : "px-6 py-4",
        className,
      )}
    >
      {icon}
      {children}
    </button>
  );
}
