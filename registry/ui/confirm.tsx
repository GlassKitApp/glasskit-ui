"use client";

import type { ReactNode } from "react";
import { FocusScope } from "@glasskit-ui/react";
import { cn } from "../lib/utils";
import { Button } from "./button";

/**
 * <Confirm> — a decision screen: a prompt + a two-button action bar (confirm /
 * cancel). Drop it into a <Screen> stage. Focus seeds on the primary action;
 * set `destructive` for irreversible decisions and the ring seeds on cancel
 * instead — a blind pinch must never destroy anything. Rendered inside a
 * FocusScope so the ring can't wander off the decision.
 */
export function Confirm({
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
  onCancel,
  className,
}: {
  title?: ReactNode;
  message?: ReactNode;
  confirmLabel?: ReactNode;
  cancelLabel?: ReactNode;
  /** Irreversible action — seed the D-pad ring on cancel, not confirm. */
  destructive?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  className?: string;
}) {
  return (
    <FocusScope>
      <div
        className={cn(
          "flex flex-col items-center gap-4 text-center",
          className,
        )}
      >
        {title != null ? <p className="t-title">{title}</p> : null}
        {message != null ? (
          <p className="t-body max-w-[28ch] text-muted-foreground">{message}</p>
        ) : null}
        <div className="mt-1.5 flex gap-3">
          <Button
            variant="primary"
            initialFocus={!destructive}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
          <Button initialFocus={destructive} onClick={onCancel}>
            {cancelLabel}
          </Button>
        </div>
      </div>
    </FocusScope>
  );
}
