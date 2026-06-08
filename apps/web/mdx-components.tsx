import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { ComponentDoc } from "@/components/component-doc";

/**
 * MDX component registry for content/docs/*.mdx. `defaultMdxComponents` supplies
 * the styled pre/code (Shiki + copy), Callout, Card, table and anchored
 * headings; `ComponentDoc` renders a full component page (live preview + install
 * + usage + props) from a slug.
 */
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ComponentDoc,
    ...components,
  };
}
