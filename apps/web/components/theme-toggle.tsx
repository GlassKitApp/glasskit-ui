"use client";

import { useEffect, useState } from "react";

/**
 * Segmented light/dark switch — replicated from the parent glasskit app's
 * ThemeToggle so the two zones share one mechanism. Writes the SAME `theme`
 * localStorage key + toggles `.dark` on <html>; same origin means the choice
 * is shared across glasskit.app ↔ glasskit.app/ui. The no-flash script in the
 * (web) layout sets the initial class before paint; this reads it on mount.
 * Default is light.
 */
const SunIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />
  </svg>
);

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function apply(dark: boolean) {
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      /* ignore (private mode / disabled storage) */
    }
  }

  const seg = "grid size-7 place-items-center rounded-full transition-colors";
  const active = "bg-bg-2 text-ink";
  const idle = "text-ink-3 hover:text-ink";

  return (
    <div
      role="group"
      aria-label="Theme"
      className="inline-flex items-center rounded-full border border-line p-0.5"
    >
      <button
        type="button"
        aria-label="Light mode"
        aria-pressed={mounted ? !isDark : undefined}
        onClick={() => apply(false)}
        className={`${seg} ${mounted && !isDark ? active : idle}`}
      >
        <SunIcon />
      </button>
      <button
        type="button"
        aria-label="Dark mode"
        aria-pressed={mounted ? isDark : undefined}
        onClick={() => apply(true)}
        className={`${seg} ${mounted && isDark ? active : idle}`}
      >
        <MoonIcon />
      </button>
    </div>
  );
}
