import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <WeatherTile> — a glanceable weather complication: a condition glyph + big
 * temperature, the condition text, and an optional location / hi-lo line. A
 * popping surface; pure display.
 */
export function WeatherTile({
  temp,
  condition,
  icon,
  location,
  range,
  className,
}: {
  temp: ReactNode;
  condition?: ReactNode;
  /** Condition glyph — typically a <Icon>. */
  icon?: ReactNode;
  location?: ReactNode;
  /** Hi / lo, e.g. "H:78° L:61°". */
  range?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "surface flex w-full flex-col items-start gap-1.5 rounded-[22px] px-[22px] py-5",
        className,
      )}
    >
      <div className="flex items-center gap-3.5">
        {icon != null ? (
          <span className="[&_.gk-icon]:size-11 [&_.gk-icon]:text-[#ffd66b] [&_.gk-icon]:[filter:drop-shadow(0_0_8px_rgba(255,214,107,0.4))]">
            {icon}
          </span>
        ) : null}
        <span className="text-[56px] font-bold leading-none [font-variant-numeric:tabular-nums]">
          {temp}
        </span>
      </div>
      {condition != null ? (
        <span className="t-body text-muted-foreground">{condition}</span>
      ) : null}
      {location != null || range != null ? (
        <span className="t-caption text-foreground-faint">
          {location}
          {location != null && range != null ? " · " : null}
          {range}
        </span>
      ) : null}
    </div>
  );
}
