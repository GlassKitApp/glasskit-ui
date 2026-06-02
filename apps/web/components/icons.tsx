/**
 * Hand-drawn SVG icon set — one visual language (1.5px stroke, round caps,
 * currentColor) so they theme cleanly. No emoji as icons (ui-ux-pro-max).
 */
type IconProps = { className?: string };

function Stroke({
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

/** Spatial focus engine. */
export function FocusIcon({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
      <circle cx="12" cy="12" r="3" />
    </Stroke>
  );
}

/** Neural Band gesture (pinch). */
export function GestureIcon({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M8 11V6.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M11 11V5a1.5 1.5 0 0 1 3 0v6" />
      <path d="M14 11V7a1.5 1.5 0 0 1 3 0v7a6 6 0 0 1-6 6h-1.5a4 4 0 0 1-3.2-1.6L5 16.5a1.6 1.6 0 0 1 2.4-2L8 15" />
    </Stroke>
  );
}

/** Additive component layers. */
export function LayersIcon({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <path d="M3 13l9 5 9-5" />
    </Stroke>
  );
}

/** npx registry / terminal. */
export function TerminalIcon({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 9l3 3-3 3M13 15h4" />
    </Stroke>
  );
}

export function ChevronUp({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M6 15l6-6 6 6" />
    </Stroke>
  );
}
export function ChevronDown({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M6 9l6 6 6-6" />
    </Stroke>
  );
}
export function ChevronLeft({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M15 6l-6 6 6 6" />
    </Stroke>
  );
}
export function ChevronRight({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M9 6l6 6-6 6" />
    </Stroke>
  );
}

/** Select / activate (the D-pad centre). */
export function SelectDot({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="5" fill="currentColor" />
    </svg>
  );
}

export function GithubIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.92 1.23 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}
