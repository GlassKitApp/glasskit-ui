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
    <div className={cn("gk-nowplaying", className)}>
      <div className="gk-nowplaying__top">
        {art != null ? <span className="gk-nowplaying__art">{art}</span> : null}
        <div className="gk-nowplaying__meta">
          <span className="gk-nowplaying__title t-readout">{title}</span>
          {artist != null ? (
            <span className="gk-nowplaying__artist t-body">{artist}</span>
          ) : null}
        </div>
      </div>
      <progress
        className="gk-nowplaying__bar gk-progress__el"
        value={pct}
        max={100}
        aria-label="Playback position"
      />
      {elapsed != null || remaining != null ? (
        <div className="gk-nowplaying__times t-caption">
          <span>{elapsed}</span>
          <span>{remaining}</span>
        </div>
      ) : null}
      {controls != null ? (
        <div className="gk-nowplaying__controls">{controls}</div>
      ) : null}
    </div>
  );
}
