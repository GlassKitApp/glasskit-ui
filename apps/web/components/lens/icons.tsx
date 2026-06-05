/**
 * Stroke-only line icons for the lens previews. No stroke/fill attributes —
 * the `.gk-icon svg` rule paints them as 1.5px hairlines in currentColor
 * (apple-feel §7). viewBox 24 for consistent optical weight.
 */
export function HeartGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M12 20s-7-4.35-9.33-8.5C1.1 8.4 2.6 5 6 5c2 0 3.2 1.2 4 2.3C10.8 6.2 12 5 14 5c3.4 0 4.9 3.4 3.33 6.5C19 15.65 12 20 12 20Z" />
    </svg>
  );
}

export function CheckGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M5 12.5 10 17.5 19 7" />
    </svg>
  );
}

export function BatteryGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="8" width="15" height="8" rx="2" />
      <path d="M21 11v2" />
      <path d="M6 11v2" />
      <path d="M9 11v2" />
    </svg>
  );
}

export function ChevronGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function NavGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2 4.5 20.5 12 17l7.5 3.5L12 2Z" />
    </svg>
  );
}

export function MessageGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M20 15a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9Z" />
    </svg>
  );
}

export function MusicGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}
