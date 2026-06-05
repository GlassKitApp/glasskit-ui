import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <Heading> — a screen/section title with an optional eyebrow label above it.
 * Pure display. Use sparingly — one heading per view keeps the glance cheap.
 */
export function Heading({
  children,
  eyebrow,
  className,
}: {
  children: ReactNode;
  /** Small tracked label above the title. */
  eyebrow?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("gk-heading", className)}>
      {eyebrow != null ? (
        <span className="gk-heading__eyebrow t-caption">{eyebrow}</span>
      ) : null}
      <h2 className="gk-heading__title t-title">{children}</h2>
    </div>
  );
}
