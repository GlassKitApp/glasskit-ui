import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMDXComponents } from "@/mdx-components";
import { getComponentDoc } from "@/lib/component-docs";
import { getExample } from "@/lib/examples";
import { SITE } from "@/lib/config";
import { SEO, jsonLdGraph, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

type Params = Promise<{ slug?: string[] }>;

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;

  const crumbs = [
    { name: SEO.name, url: SITE },
    { name: "Docs", url: `${SITE}/docs` },
  ];
  if (page.url !== "/docs") {
    crumbs.push({ name: page.data.title, url: `${SITE}${page.url}` });
  }

  // Component / example pages render their sections (Installation, Usage, Props)
  // from the <ComponentDoc> / <ExampleDoc> React components, so those headings
  // never land in the MDX-derived `page.data.toc`. Synthesize them here (matching
  // the ids set on those <h2>s) so the right-rail "On this page" is populated.
  const pageSlug = page.url.split("/").filter(Boolean).pop() ?? "";
  const doc = getComponentDoc(pageSlug);
  const example = getExample(pageSlug);
  const sectionToc = doc
    ? [
        { title: "Installation", url: "#installation", depth: 2 },
        { title: "Usage", url: "#usage", depth: 2 },
        { title: "Props", url: "#props", depth: 2 },
      ]
    : example
      ? [
          { title: example.name, url: `#${example.slug}`, depth: 2 },
          { title: "Installation", url: "#installation", depth: 2 },
          { title: "Usage", url: "#usage", depth: 2 },
        ]
      : [];
  const toc = [...sectionToc, ...page.data.toc];

  return (
    <DocsPage toc={toc} full={page.data.full}>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) return {};
  // Only title/description/canonical here — intentionally NOT openGraph: a
  // per-page openGraph would replace the inherited group OG image (the metadata
  // image file can't live under the [[...slug]] catch-all). Docs pages share
  // the group's branded OG card; per-page <title>/description/canonical +
  // BreadcrumbList carry the page-specific SEO.
  return {
    title: page.data.title,
    description: page.data.description,
    alternates: { canonical: `${SITE}${page.url}` },
  };
}
