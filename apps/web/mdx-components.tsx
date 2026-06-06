import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

/**
 * MDX component registry for content/docs/*.mdx. `defaultMdxComponents` supplies
 * the styled pre/code (Shiki + copy), Callout, Card, table and anchored
 * headings; the GlassKit component-doc primitives (ComponentPreview,
 * Installation, ComponentProps, Usage) are added here.
 */
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
  };
}
