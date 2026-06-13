import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Toggle> — a binary switch, D-pad-focusable (renders a real button with the
 * focusable class; useDpad activates it on Enter/Space). Controlled: pass
 * `checked` + `onChange`. The knob slides via a logical margin, so it mirrors
 * correctly under RTL (a switch is UI chrome, not world-anchored).
 */
export function Toggle({
  checked,
  onChange,
  label,
  disabled,
  className,
}: {
  checked: boolean;
  onChange?: (next: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange ? () => onChange(!checked) : undefined}
      className={cn(
        "focusable t-body flex w-full items-center justify-between gap-4",
        // gk-toggle--on drives the track gradient + the knob's margin-auto slide.
        checked && "gk-toggle--on",
        className,
      )}
    >
      {label != null ? (
        <span className="flex-1 text-start">{label}</span>
      ) : null}
      {/* Track + knob keep their gk-* classes: the track gradient/inset-shadow,
       * the knob's depth shadow, and the margin-inline-start slide transition
       * are bespoke visuals Tailwind can't express. */}
      <span className="gk-toggle__track">
        <span className="gk-toggle__knob" />
      </span>
    </button>
  );
}
