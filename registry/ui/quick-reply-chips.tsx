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
    <div className={cn("flex flex-wrap justify-center gap-2", className)}>
      {options.map((o, i) => (
        <button
          key={`${i}-${o}`}
          type="button"
          onClick={onSelect ? () => onSelect(o) : undefined}
          className="focusable press-scale t-body surface rounded-full py-3.5 px-[22px]"
        >
          {o}
        </button>
      ))}
    </div>
  );
}
