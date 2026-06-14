"use client";

import type { ReactNode } from "react";
import { FocusScope } from "@glasskit-ui/react";
import { cn } from "../lib/utils";

/**
 * <PermissionPrompt> — an explicit access request (sensors, location, camera,
 * mic), which MRBD apps must ask for before use. A gradient-plate icon, a clear
 * title, the reason, and allow / deny actions. Drop it into a <Screen> stage.
 * It's a dialog, so it renders inside a FocusScope: the D-pad ring is
 * contained to the prompt until it unmounts.
 */
export function PermissionPrompt({
  icon,
  title,
  children,
  actions,
  className,
}: {
  /** A gradient-plate <Icon> for the capability. */
  icon?: ReactNode;
  title: ReactNode;
  /** Why the app needs it (keep it short + honest). */
  children?: ReactNode;
  /** Allow / deny controls. */
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <FocusScope>
      <div
        className={cn(
          "flex flex-col items-center gap-[14px] text-center",
          className,
        )}
        role="dialog"
        aria-label={typeof title === "string" ? title : "Permission"}
      >
        {icon != null ? <span>{icon}</span> : null}
        <span className="t-title font-bold">{title}</span>
        {children != null ? (
          <p className="t-body max-w-[30ch] text-muted-foreground">{children}</p>
        ) : null}
        {actions != null ? (
          <div className="flex gap-3 mt-2">{actions}</div>
        ) : null}
      </div>
    </FocusScope>
  );
}
