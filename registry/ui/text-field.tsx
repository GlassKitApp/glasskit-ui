import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <TextField> — a text entry surface. There is no keyboard on the lens, so this
 * is a D-pad-focusable field that shows the current value (or a placeholder)
 * and a trailing affordance (a mic glyph). Pure display + `onActivate` — you
 * own the capture flow it opens.
 *
 * Platform note (2026-06): web apps get no microphone (no getUserMedia) and
 * no system text-input API, so on-device capture means your own picker UI
 * (e.g. a <List> of choices, or a ComposeFlow). The mic glyph is a familiar
 * affordance, not a promise of dictation.
 */
export function TextField({
  label,
  value,
  placeholder = "Pinch to enter text",
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
      className={cn(
        "focusable gk-textfield surface flex w-full items-center gap-[14px] rounded-lens px-5 py-4 text-start",
        className,
      )}
    >
      <span className="flex min-w-0 flex-1 flex-col gap-[3px] text-start">
        {label != null ? (
          <span className="t-caption uppercase tracking-[0.1em] text-foreground-faint">
            {label}
          </span>
        ) : null}
        <span
          className={cn(
            "t-body",
            filled ? "text-foreground" : "text-foreground-faint",
          )}
        >
          {filled ? value : placeholder}
        </span>
      </span>
      {icon != null ? (
        <span className="[&_.gk-icon]:size-[26px] [&_.gk-icon]:text-accent-active">
          {icon}
        </span>
      ) : null}
    </button>
  );
}
