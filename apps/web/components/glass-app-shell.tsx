"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Centers a 600×600 GlassViewport on pure black and scale-fits it to the
 * window: scale = min(1, w/600, h/600), written as a CSS variable from a
 * resize effect (imperative setProperty — not a style prop). On the glasses'
 * own 600×600 webview the scale is exactly 1 → full-bleed, and the
 * desktop-only input hint is hidden by the small-viewport media query.
 */
export function GlassAppShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fit = () => {
      const s = Math.min(1, innerWidth / 600, innerHeight / 600);
      ref.current?.style.setProperty("--glass-scale", String(s));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <main className="grid min-h-dvh place-items-center bg-black">
      <div ref={ref} className="glass-fit">
        {children}
      </div>
      <p className="glass-fit__hint mono-label">
        Arrow keys move focus · Enter activates — that&rsquo;s the Neural Band
      </p>
    </main>
  );
}
