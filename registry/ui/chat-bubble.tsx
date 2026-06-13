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
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col justify-end gap-2.5 overflow-y-auto",
        className,
      )}
    >
      {children}
    </div>
  );
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
    <div
      className={cn(
        "t-body max-w-[82%] rounded-[22px] px-[18px] py-3.5",
        from === "me"
          ? "self-end rounded-ee-[7px] border border-white/20 text-white [background:var(--accent-surface)] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.35),0_10px_22px_-12px_var(--accent-glow)]"
          : "surface self-start rounded-es-[7px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
