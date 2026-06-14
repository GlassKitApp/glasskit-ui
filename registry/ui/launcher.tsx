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
    <div className={cn("grid w-full grid-cols-2 gap-4", className)}>
      {apps.map((a, i) => (
        <button
          key={a.id}
          type="button"
          onClick={a.onSelect}
          className="focusable gk-launcher-card press-scale flex flex-col items-center gap-[9px] rounded-[22px] border-transparent px-[10px] py-[14px] text-center"
        >
          {a.icon != null ? (
            <span
              className={cn(
                "gk-launcher-card__icon gk-plate mb-0.5 size-[94px] [&_.gk-icon]:size-[46px]",
                `gk-grad-${a.tone ?? TONES[i % TONES.length]}`,
              )}
            >
              {a.icon}
            </span>
          ) : null}
          <span className="gk-launcher-card__label t-body font-semibold">
            {a.label}
          </span>
          {a.tagline != null ? (
            <span className="t-caption text-foreground-faint">{a.tagline}</span>
          ) : null}
        </button>
      ))}
    </div>
  );
}
