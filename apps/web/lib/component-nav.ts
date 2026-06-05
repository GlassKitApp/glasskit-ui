/**
 * Slim, data-only nav index (no JSX) — imported by the client docs sidebar so it
 * doesn't pull the 28 preview components into the docs client bundle. Kept in
 * sync with COMPONENT_DOCS by a test (component-nav.test.ts); same order.
 */
export type ComponentNav = { slug: string; name: string; category: string };

export const COMPONENT_NAV: ComponentNav[] = [
  { slug: "screen", name: "Screen", category: "Shell" },
  { slug: "status-bar", name: "StatusBar", category: "Status" },
  { slug: "readout", name: "Readout", category: "Display" },
  { slug: "cue", name: "Cue", category: "Display" },
  { slug: "button", name: "Button", category: "Action" },
  { slug: "glow-icon", name: "GlowIcon", category: "Display" },
  { slug: "list", name: "List", category: "Action" },
  { slug: "progress", name: "Progress", category: "Display" },
  { slug: "async-view", name: "AsyncView", category: "Status" },
  { slug: "direction-arrow", name: "DirectionArrow", category: "Spatial" },
  { slug: "compass", name: "Compass", category: "Spatial" },
  { slug: "reticle", name: "Reticle", category: "Spatial" },
  { slug: "toggle", name: "Toggle", category: "Action" },
  { slug: "stepper", name: "Stepper", category: "Action" },
  { slug: "segmented", name: "Segmented", category: "Action" },
  { slug: "confirm", name: "Confirm", category: "Action" },
  { slug: "badge", name: "Badge", category: "Display" },
  { slug: "status-dot", name: "StatusDot", category: "Status" },
  { slug: "meter", name: "Meter", category: "Display" },
  { slug: "stat-grid", name: "StatGrid", category: "Display" },
  { slug: "toast", name: "Toast", category: "Status" },
  { slug: "error-state", name: "ErrorState", category: "Status" },
  { slug: "heading", name: "Heading", category: "Display" },
  { slug: "launcher", name: "Launcher", category: "Navigation" },
  { slug: "deck", name: "Deck", category: "Navigation" },
  { slug: "quick-reply-chips", name: "QuickReplyChips", category: "Action" },
  { slug: "pin", name: "Pin", category: "Spatial" },
  { slug: "callout", name: "Callout", category: "Spatial" },
];
