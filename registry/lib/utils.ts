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
