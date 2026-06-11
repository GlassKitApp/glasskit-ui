export type ClassValue = string | number | null | undefined | false;

/**
 * Join truthy class names. Dependency-free on purpose: the lens components
 * style via bespoke semantic classes (no conflicting Tailwind utilities to
 * de-dupe), so this needs no clsx/tailwind-merge and resolves from anywhere
 * the registry is vendored.
 */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}

/**
 * Accessible name from a free-form `label` prop: the label itself when it's a
 * plain string, otherwise undefined (a ReactNode can't become an aria-label).
 */
export function stringLabel(label: unknown): string | undefined {
  return typeof label === "string" ? label : undefined;
}
