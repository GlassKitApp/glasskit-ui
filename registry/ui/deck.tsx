import { Children, type ReactNode } from "react";
import { cn } from "../lib/utils";
import { Progress } from "./progress";

/**
 * <Deck> — a horizontal paged flow (wizard / onboarding). Controlled via
 * `index`; shows one page at a time with step dots beneath (reusing Progress).
 * One nav model per screen: pages advance on pinch / D-pad, never scroll.
 */
export function Deck({
  index,
  children,
  className,
}: {
  index: number;
  /** One node per page. Falsy children (`{cond && <Page/>}`) are dropped, which
   *  changes the page count — render every page and gate inside it instead. */
  children: ReactNode;
  className?: string;
}) {
  const pages = Children.toArray(children);
  const count = pages.length;
  const current = Math.max(0, Math.min(index, count - 1));

  return (
    <div className={cn("gk-deck", className)}>
      <div className="gk-deck__stage">{pages[current]}</div>
      {count > 1 ? (
        <Progress variant="step" value={current + 1} max={count} />
      ) : null}
    </div>
  );
}
