import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <MessageThread> — a vertical stack of <ChatBubble>s (a conversation view).
 * Newest at the bottom; scrolls like <List>. RTL-safe (logical alignment).
 */
export function MessageThread({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("gk-thread", className)}>{children}</div>;
}

/**
 * <ChatBubble> — one message. `from="me"` is the accent-gradient bubble aligned
 * to the inline-end; `from="them"` is a surface bubble at the inline-start.
 */
export function ChatBubble({
  from = "them",
  children,
  className,
}: {
  from?: "me" | "them";
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("gk-bubble", `gk-bubble--${from}`, "t-body", className)}>
      {children}
    </div>
  );
}
