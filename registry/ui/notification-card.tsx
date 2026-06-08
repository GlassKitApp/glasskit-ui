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
    <div className={cn("gk-notif gk-surface", className)} role="status">
      <div className="gk-notif__head">
        {avatar != null ? (
          <span className="gk-notif__avatar">{avatar}</span>
        ) : null}
        <span className="gk-notif__title t-body">{title}</span>
        {time != null ? (
          <span className="gk-notif__time t-caption">{time}</span>
        ) : null}
      </div>
      <div className="gk-notif__body t-body">{children}</div>
      {actions != null ? (
        <div className="gk-notif__actions">{actions}</div>
      ) : null}
    </div>
  );
}
