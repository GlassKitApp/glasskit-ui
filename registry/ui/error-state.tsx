import type { ReactNode } from "react";
import { cn } from "../lib/utils";
import { Button } from "./button";

/**
 * <ErrorState> — a recoverable error screen: optional glyph + title + message +
 * a retry action. No red (the lens has one accent); the failure reads from the
 * words and a dimmed treatment. Drop it into a <Screen> stage, or use it as the
 * `error` slot of <AsyncView>.
 */
export function ErrorState({
  title = "Something went wrong",
  message,
  icon,
  onRetry,
  retryLabel = "Retry",
  className,
}: {
  title?: ReactNode;
  message?: ReactNode;
  /** Optional leading glyph — typically a <Icon>. */
  icon?: ReactNode;
  onRetry?: () => void;
  retryLabel?: ReactNode;
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
      <p className="t-title">{title}</p>
      {message != null ? (
        <p className="t-body max-w-[30ch] text-muted-foreground">{message}</p>
      ) : null}
      {onRetry ? (
        <Button variant="primary" onClick={onRetry}>
          {retryLabel}
        </Button>
      ) : null}
    </div>
  );
}
