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
  /** Condition glyph — typically a <GlowIcon>. */
  icon?: ReactNode;
  location?: ReactNode;
  /** Hi / lo, e.g. "H:78° L:61°". */
  range?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("gk-weather gk-surface", className)}>
      <div className="gk-weather__top">
        {icon != null ? <span className="gk-weather__icon">{icon}</span> : null}
        <span className="gk-weather__temp">{temp}</span>
      </div>
      {condition != null ? (
        <span className="gk-weather__cond t-body">{condition}</span>
      ) : null}
      {location != null || range != null ? (
        <span className="gk-weather__meta t-caption">
          {location}
          {location != null && range != null ? " · " : null}
          {range}
        </span>
      ) : null}
    </div>
  );
}
