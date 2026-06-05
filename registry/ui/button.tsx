import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Button> — a D-pad-focusable action. Renders a real <button> carrying
 * the `focusable` class, so `useDpad()` includes it in spatial navigation
 * and activates it on Enter/Space (the hook calls `.click()`, which fires
 * `onClick`). Edge + focus ring come from the additive `.focusable` recipe;
 * `primary` brightens the edge — no fills (apple-feel §9).
 */
export function Button({
  children,
  variant = "secondary",
  icon,
  disabled,
  onClick,
  type = "button",
  className,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary";
  /** Optional leading glyph — typically a <GlowIcon>. */
  icon?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "focusable gk-btn t-body",
        variant === "primary" && "gk-btn--primary",
        className,
      )}
    >
      {icon}
      {children}
    </button>
  );
}
