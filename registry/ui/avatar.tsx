import type { ReactNode } from "react";
import { cn } from "../lib/utils";

export type AvatarTone =
  | "blue"
  | "green"
  | "peach"
  | "violet"
  | "cyan"
  | "amber";

/**
 * <Avatar> — a contact / sender avatar: a photo when you have one, else initials
 * on a gradient plate. Used by NotificationCard, ChatBubble, CallCard. RTL-safe.
 */
export function Avatar({
  name,
  src,
  tone = "blue",
  size = "md",
  className,
}: {
  /** Display name — used for initials + the a11y label. */
  name: string;
  /** Optional image URL. */
  src?: string;
  /** Gradient tone when showing initials. */
  tone?: AvatarTone;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <span
      className={cn(
        "gk-avatar",
        `gk-avatar--${size}`,
        !src && `gk-grad-${tone}`,
        className,
      )}
      role="img"
      aria-label={name}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="gk-avatar__img" src={src} alt="" />
      ) : (
        <span className="gk-avatar__initials">{initials}</span>
      )}
    </span>
  );
}
