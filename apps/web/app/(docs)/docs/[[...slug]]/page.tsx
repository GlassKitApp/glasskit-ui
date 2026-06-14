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
import { CopyPageActions } from "@/components/copy-page-actions";
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

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />
      <div className="mb-2 flex justify-end">
        <CopyPageActions
          pageUrl={`${SITE}${page.url}`}
          title={page.data.title}
        />
      </div>
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
