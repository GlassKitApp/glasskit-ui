import type { ReactNode } from "react";
import { cn } from "../lib/utils";

export type AsyncStatus = "idle" | "loading" | "success" | "error";

/**
 * <AsyncView> — the four-state async renderer every data screen needs:
 * placeholder (idle) → loading → success/error. The consumer owns the
 * async work and passes the current `status`; AsyncView picks the view.
 * This is the spine's one styled-with-logic piece — the logic is the
 * state→view selection, nothing more.
 *
 * Sensible additive defaults: an emitted pulse for loading, a dim line
 * for error. Override any state via its slot.
 */
export function AsyncView({
  status,
  children,
  loading,
  error,
  placeholder,
  errorLabel = "Couldn’t load",
  className,
}: {
  status: AsyncStatus;
  /** Success content. */
  children?: ReactNode;
  loading?: ReactNode;
  error?: ReactNode;
  placeholder?: ReactNode;
  /** Default error message when no `error` slot is given. */
  errorLabel?: ReactNode;
  className?: string;
}) {
  if (status === "success") return <>{children}</>;

  let body: ReactNode;
  if (status === "loading") {
    body = loading ?? <Spinner />;
  } else if (status === "error") {
    body = error ?? <p className="t-body gk-async-error">{errorLabel}</p>;
  } else {
    body = placeholder ?? null;
  }

  return (
    <div
      className={cn("gk-async", className)}
      role="status"
      aria-busy={status === "loading"}
    >
      {body}
    </div>
  );
}

/** The default loading indicator — three emitted dots pulsing in sequence. */
export function Spinner({ label = "Loading" }: { label?: string }) {
  return (
    <span className="gk-spinner" role="img" aria-label={label}>
      <span />
      <span />
      <span />
    </span>
  );
}
