import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <PermissionPrompt> — an explicit access request (sensors, location, camera,
 * mic), which MRBD apps must ask for before use. A gradient-plate icon, a clear
 * title, the reason, and allow / deny actions. Drop it into a <Screen> stage.
 */
export function PermissionPrompt({
  icon,
  title,
  children,
  actions,
  className,
}: {
  /** A gradient-plate <GlowIcon> for the capability. */
  icon?: ReactNode;
  title: ReactNode;
  /** Why the app needs it (keep it short + honest). */
  children?: ReactNode;
  /** Allow / deny controls. */
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("gk-permission", className)}
      role="dialog"
      aria-label={typeof title === "string" ? title : "Permission"}
    >
      {icon != null ? (
        <span className="gk-permission__icon">{icon}</span>
      ) : null}
      <span className="gk-permission__title t-title">{title}</span>
      {children != null ? (
        <p className="gk-permission__body t-body">{children}</p>
      ) : null}
      {actions != null ? (
        <div className="gk-permission__actions">{actions}</div>
      ) : null}
    </div>
  );
}
