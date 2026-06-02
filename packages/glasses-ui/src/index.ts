/**
 * @glasskit/glasses-ui — the typed 600×600 + D-pad library for
 * Meta Ray-Ban Display Web Apps. Public API is everything re-exported
 * below. Consumers also import `@glasskit/glasses-ui/styles.css` once
 * at the app entry to get the platform-correct design tokens
 * (additive-display dark, focus ring, focusable + screen layout).
 *
 * Subpath entries mirror this barrel for consumers who want only part
 * of the surface: `@glasskit/glasses-ui/hooks` and
 * `@glasskit/glasses-ui/primitives`.
 */

export * from "./primitives";
export * from "./hooks";
