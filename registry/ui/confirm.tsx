import type { ReactNode } from "react";
import { cn } from "../lib/utils";
import { Button } from "./button";

/**
 * <Confirm> — a decision screen: a prompt + a two-button action bar (confirm /
 * cancel). Drop it into a <Screen> stage. Buttons are D-pad-focusable via the
 * underlying Button; useDpad seeds focus on the primary action.
 */
export function Confirm({
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  className,
}: {
  title?: ReactNode;
  message?: ReactNode;
  confirmLabel?: ReactNode;
  cancelLabel?: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  className?: string;
}) {
  return (
    <div className={cn("gk-confirm", className)}>
      {title != null ? (
        <p className="gk-confirm__title t-title">{title}</p>
      ) : null}
      {message != null ? (
        <p className="gk-confirm__message t-body">{message}</p>
      ) : null}
      <div className="gk-confirm__actions">
        <Button variant="primary" onClick={onConfirm}>
          {confirmLabel}
        </Button>
        <Button onClick={onCancel}>{cancelLabel}</Button>
      </div>
    </div>
  );
}
