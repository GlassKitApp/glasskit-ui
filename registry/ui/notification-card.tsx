import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <NotificationCard> — an incoming notification (message, mention, alert): a
 * leading avatar/glyph, sender + time, a message preview, and optional quick
 * actions. A popping surface, below the sightline like the real Display. Richer
 * than <Toast> (which is a transient one-liner). RTL-safe (logical layout).
 */
export function NotificationCard({
  avatar,
  title,
  time,
  children,
  actions,
  className,
}: {
  /** Leading <Avatar> or app <GlowIcon>. */
  avatar?: ReactNode;
  /** Sender / app name. */
  title: ReactNode;
  /** Optional timestamp. */
  time?: ReactNode;
  /** The message preview. */
  children: ReactNode;
  /** Optional action row (e.g. <QuickReplyChips> or <Button>s). */
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "surface flex w-full flex-col gap-[13px] rounded-[22px] p-5 text-start",
        className,
      )}
      role="status"
    >
      <div className="flex items-center gap-[13px]">
        {avatar != null ? (
          <span className="inline-flex flex-none">{avatar}</span>
        ) : null}
        <span className="t-body min-w-0 flex-1 font-bold">{title}</span>
        {time != null ? (
          <span className="t-caption flex-none text-foreground-faint">
            {time}
          </span>
        ) : null}
      </div>
      <div className="t-body text-muted-foreground">{children}</div>
      {actions != null ? (
        <div className="mt-[3px] flex gap-2.5">{actions}</div>
      ) : null}
    </div>
  );
}
