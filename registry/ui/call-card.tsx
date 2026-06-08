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
    <div className={cn("gk-call", className)}>
      {avatar != null ? (
        <span className="gk-call__avatar">{avatar}</span>
      ) : null}
      <span className="gk-call__name t-title">{name}</span>
      {status != null ? (
        <span className="gk-call__status t-body">{status}</span>
      ) : null}
      {actions != null ? (
        <div className="gk-call__actions">{actions}</div>
      ) : null}
    </div>
  );
}
