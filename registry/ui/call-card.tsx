import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <CallCard> — an incoming / active call: a big avatar, caller name, a status
 * line ("Incoming…", "02:14"), and an action row (accept / decline via
 * D-pad-focusable <Button>s). Drop it into a <Screen> stage.
 */
export function CallCard({
  avatar,
  name,
  status,
  actions,
  className,
}: {
  /** A large <Avatar>. */
  avatar?: ReactNode;
  name: ReactNode;
  /** "Incoming call", a running timer, etc. */
  status?: ReactNode;
  /** Accept / decline buttons. */
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3.5 text-center",
        className,
      )}
    >
      {avatar != null ? <span>{avatar}</span> : null}
      <span className="t-title font-bold">{name}</span>
      {status != null ? (
        <span className="t-body text-muted-foreground">{status}</span>
      ) : null}
      {actions != null ? (
        <div className="mt-3 flex gap-7">{actions}</div>
      ) : null}
    </div>
  );
}
