import type { ReactNode } from "react";
import { cn } from "../lib/utils";
import { Button } from "./button";

/**
 * <EmptyState> — the nothing-here screen: optional glyph + title + hint + one
 * action. The quiet sibling of <ErrorState> — nothing failed, there is just no
 * content yet, so it reads dimmer and the action invites rather than recovers.
 * Drop it into a <Screen> stage, or use it as the `placeholder` slot of
 * <AsyncView>.
 */
export function EmptyState({
  title = "Nothing here yet",
  hint,
  icon,
  onAction,
  actionLabel = "Refresh",
  className,
}: {
  title?: ReactNode;
  /** A quieter second line — what will fill this screen, or how. */
  hint?: ReactNode;
  /** Optional leading glyph — typically a <GlowIcon>. */
  icon?: ReactNode;
  onAction?: () => void;
  actionLabel?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3.5 text-center",
        className,
      )}
    >
      {icon}
      <p className="t-title text-muted-foreground">{title}</p>
      {hint != null ? (
        <p className="t-body max-w-[30ch] text-foreground-faint">{hint}</p>
      ) : null}
      {onAction ? <Button onClick={onAction}>{actionLabel}</Button> : null}
    </div>
  );
}
