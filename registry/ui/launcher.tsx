import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/** Tasteful gradient tones for the app plates (see styles.css `.gk-grad-*`). */
export type LauncherTone =
  | "blue"
  | "green"
  | "peach"
  | "violet"
  | "cyan"
  | "amber";

const TONES: LauncherTone[] = [
  "blue",
  "green",
  "peach",
  "violet",
  "cyan",
  "amber",
];

export type LauncherApp = {
  id: string;
  label: ReactNode;
  tagline?: ReactNode;
  /** Optional glyph — a stroke SVG (rendered white on the gradient plate). */
  icon?: ReactNode;
  /** Gradient tone for the icon plate; defaults to a cycled palette color. */
  tone?: LauncherTone;
  onSelect?: () => void;
};

/**
 * <Launcher> — the app grid: a home screen of gradient app-icon plates + labels.
 * Cards are D-pad-focusable (useDpad walks them, Enter activates); focus lifts
 * the plate. Two columns; keep it to ~6 apps so the grid is one glance. RTL-safe.
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
      {apps.map((a, i) => (
        <button
          key={a.id}
          type="button"
          onClick={a.onSelect}
          className="focusable gk-launcher-card"
        >
          {a.icon != null ? (
            <span
              className={cn(
                "gk-launcher-card__icon gk-plate",
                `gk-grad-${a.tone ?? TONES[i % TONES.length]}`,
              )}
            >
              {a.icon}
            </span>
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
