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
    <div className={cn("flex flex-col items-center gap-1 text-center", className)}>
      {eyebrow != null ? (
        <span className="t-caption uppercase tracking-[0.16em] text-primary">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="t-title">{children}</h2>
    </div>
  );
}
