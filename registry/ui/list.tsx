import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <List> — a vertical stack of focusable rows (watchOS list spirit).
 * Keep it short: a glanceable HUD caps at 3–5 rows per screen
 * (apple-feel §3). Compose with <ListRow>.
 */
export function List({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("gk-list", className)}>{children}</div>;
}

/**
 * <ListRow> — a D-pad-focusable row: leading glyph, label, trailing value.
 * Renders a real <button> with the `focusable` class so `useDpad()` walks
 * it. Logical layout (leading = inline-start) for RTL safety.
 */
export function ListRow({
  children,
  leading,
  trailing,
  onClick,
  disabled,
  className,
}: {
  /** The row label. */
  children: ReactNode;
  /** Optional inline-start glyph — typically a <GlowIcon>. */
  leading?: ReactNode;
  /** Optional inline-end value/affordance. */
  trailing?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn("focusable gk-list-row t-body", className)}
    >
      {leading}
      <span className="gk-list-row__label">{children}</span>
      {trailing != null ? (
        <span className="gk-list-row__trailing t-caption">{trailing}</span>
      ) : null}
    </button>
  );
}
