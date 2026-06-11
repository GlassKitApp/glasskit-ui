import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <TextField> — a text entry surface. There is no keyboard on the lens, so this
 * is a D-pad-focusable field that shows the current value (or a placeholder) and
 * a trailing affordance (a mic glyph); activating it opens dictation / Neural-
 * Band handwriting. Pure display + onActivate — you own the capture.
 */
export function TextField({
  label,
  value,
  placeholder = "Tap to speak",
  icon,
  onActivate,
  className,
}: {
  label?: ReactNode;
  value?: ReactNode;
  placeholder?: ReactNode;
  /** Trailing glyph — typically a mic <GlowIcon>. */
  icon?: ReactNode;
  onActivate?: () => void;
  className?: string;
}) {
  const filled = value != null && value !== "";
  return (
    <button
      type="button"
      onClick={onActivate}
      className={cn("focusable gk-textfield", className)}
    >
      <span className="gk-textfield__main">
        {label != null ? (
          <span className="gk-textfield__label t-caption">{label}</span>
        ) : null}
        <span
          className={cn(
            "gk-textfield__value t-body",
            !filled && "gk-textfield__value--empty",
          )}
        >
          {filled ? value : placeholder}
        </span>
      </span>
      {icon != null ? <span className="gk-textfield__icon">{icon}</span> : null}
    </button>
  );
}
