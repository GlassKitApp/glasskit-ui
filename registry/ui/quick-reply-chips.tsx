import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <QuickReplyChips> — tappable canned replies (the comms job; there is no
 * keyboard on the lens — text is voice). Each chip is D-pad-focusable. Keep the
 * set short and the labels glanceable.
 */
export function QuickReplyChips({
  options,
  onSelect,
  className,
}: {
  options: string[];
  onSelect?: (reply: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("gk-chips", className)}>
      {options.map((o, i) => (
        <button
          key={`${i}-${o}`}
          type="button"
          onClick={onSelect ? () => onSelect(o) : undefined}
          className="focusable gk-chip t-body"
        >
          {o}
        </button>
      ))}
    </div>
  );
}
