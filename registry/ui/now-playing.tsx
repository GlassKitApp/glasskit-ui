import type { ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * <NowPlaying> — a media "now playing" card: album art, title + artist, a
 * scrub bar, and elapsed / remaining times. The art is a node you pass (an
 * <img>, or a gradient tile for podcasts/radio). `progress` is 0–100. Pure
 * display; wire transport controls with <Button>s in `controls`. RTL-safe.
 *
 * Platform note (2026-06): Meta has not documented `<audio>` / Web Audio
 * support for Display web apps, and the glasses' own media player owns the
 * speakers. Treat this as a status display for playback your app tracks
 * (e.g. a server-side or phone session) — verify on-device before shipping
 * an app that plays audio in the webview.
 */
export function NowPlaying({
  art,
  title,
  artist,
  progress = 0,
  elapsed,
  remaining,
  controls,
  className,
}: {
  /** Album art — an <img> or a gradient tile. */
  art?: ReactNode;
  title: ReactNode;
  artist?: ReactNode;
  /** 0–100. */
  progress?: number;
  elapsed?: ReactNode;
  remaining?: ReactNode;
  /** Optional transport row. */
  controls?: ReactNode;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(progress, 100));
  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      <div className="flex items-center gap-4">
        {art != null ? (
          <span className="block size-[92px] shrink-0 overflow-hidden rounded-lens [box-shadow:inset_0_1px_0_rgba(255,255,255,0.25),0_10px_24px_-10px_rgba(0,0,0,0.7)] [&>span]:block [&>span]:size-full [&>span]:object-cover [&_img]:block [&_img]:size-full [&_img]:object-cover">
            {art}
          </span>
        ) : null}
        <div className="flex min-w-0 flex-col gap-1 text-start">
          <span className="t-readout font-bold text-foreground">{title}</span>
          {artist != null ? (
            <span className="t-body text-muted-foreground">{artist}</span>
          ) : null}
        </div>
      </div>
      <progress
        className="gk-progress__el"
        value={pct}
        max={100}
        aria-label="Playback position"
      />
      {elapsed != null || remaining != null ? (
        <div className="t-caption flex justify-between text-foreground-faint [font-variant-numeric:tabular-nums]">
          <span>{elapsed}</span>
          <span>{remaining}</span>
        </div>
      ) : null}
      {controls != null ? (
        <div className="flex justify-center gap-3.5">{controls}</div>
      ) : null}
    </div>
  );
}
