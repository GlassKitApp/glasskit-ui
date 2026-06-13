import { cn } from "../lib/utils";

const SIZE = {
  sm: "size-[46px] text-[17px]",
  md: "size-[62px] text-[23px]",
  lg: "size-[92px] text-[34px]",
} as const;

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
        "inline-grid shrink-0 place-items-center overflow-hidden rounded-full font-bold text-white [box-shadow:inset_0_1px_0_rgba(255,255,255,0.3),0_6px_14px_-8px_rgba(0,0,0,0.6)]",
        SIZE[size],
        !src && `gk-grad-${tone}`,
        className,
      )}
      role="img"
      aria-label={name}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="size-full object-cover" src={src} alt="" />
      ) : (
        <span>{initials}</span>
      )}
    </span>
  );
}
