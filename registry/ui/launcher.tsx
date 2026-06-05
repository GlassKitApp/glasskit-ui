import type { ReactNode } from "react";
import { cn } from "../lib/utils";

export type LauncherApp = {
  id: string;
  label: ReactNode;
  tagline?: ReactNode;
  /** Optional glyph — typically a <GlowIcon>. */
  icon?: ReactNode;
  onSelect?: () => void;
};

/**
 * <Launcher> — the app grid: the entry screen for a multi-app surface. Cards are
 * D-pad-focusable (useDpad walks them, Enter activates). Two columns; keep it to
 * ~4 apps so the whole grid is a single glance. RTL-safe (logical grid).
 */
export function Launcher({
  apps,
  className,
}: {
  apps: LauncherApp[];
  className?: string;
}) {
  return (
    <div className={cn("gk-launcher", className)}>
      {apps.map((a) => (
        <button
          key={a.id}
          type="button"
          onClick={a.onSelect}
          className="focusable gk-launcher-card"
        >
          {a.icon != null ? (
            <span className="gk-launcher-card__icon">{a.icon}</span>
          ) : null}
          <span className="gk-launcher-card__label t-body">{a.label}</span>
          {a.tagline != null ? (
            <span className="gk-launcher-card__tagline t-caption">
              {a.tagline}
            </span>
          ) : null}
        </button>
      ))}
    </div>
  );
}
