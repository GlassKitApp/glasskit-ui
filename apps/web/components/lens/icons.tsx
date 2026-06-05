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
