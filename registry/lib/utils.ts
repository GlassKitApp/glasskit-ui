import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type { ClassValue };

/**
 * Merge class names the shadcn way: clsx joins conditionals, tailwind-merge
 * de-dupes conflicting Tailwind utilities so a consumer's `className` override
 * wins (e.g. passing `px-2` beats the component's `px-6`). Lens components are
 * Tailwind utilities + `--gk-*` tokens, so this de-dupe matters.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Accessible name from a free-form `label` prop: the label itself when it's a
 * plain string, otherwise undefined (a ReactNode can't become an aria-label).
 */
export function stringLabel(label: unknown): string | undefined {
  return typeof label === "string" ? label : undefined;
}
