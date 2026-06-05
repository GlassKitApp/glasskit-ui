import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GlassViewport } from "@glasskit/glasses-ui";
import { SiteHeader } from "@/components/site-header";
import { LensStage } from "@/components/lens/lens-stage";
import { PropsTable } from "@/components/props-table";
import { CodeBlock } from "@/components/code-block";
import { COMPONENT_DOCS, getComponentDoc } from "@/lib/component-docs";

export function generateStaticParams() {
  return COMPONENT_DOCS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getComponentDoc(slug);
  if (!doc) return {};
  return { title: doc.name, description: doc.summary };
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getComponentDoc(slug);
  if (!doc) notFound();

  return (
    <>
      <SiteHeader />
      <main className="blueprint min-h-dvh border-t border-line-2">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
          <a
            href="/docs/components"
            className="mono-label text-ink-3 hover:text-ink"
          >
            ← Components
          </a>
          <div className="mt-4 flex items-center gap-3">
            <h1 className="font-display text-[clamp(2.25rem,5vw,3.25rem)] leading-[0.95]">
              {doc.name}
            </h1>
            <span className="mono-label mt-1">{doc.category}</span>
          </div>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
            {doc.summary}
          </p>

          <div className="mt-10">
            <LensStage caption="Live preview">
              <GlassViewport>{doc.preview}</GlassViewport>
            </LensStage>
          </div>

          <h2 className="font-display mt-16 text-2xl">Usage</h2>
          <CodeBlock>{doc.usage}</CodeBlock>

          <h2 className="font-display mt-14 text-2xl">Props</h2>
          <div className="mt-4">
            <PropsTable rows={doc.props} />
          </div>

          <div className="mt-14 flex gap-3">
            <a href="/playground" className="btn btn-solid">
              Open the playground <span aria-hidden>→</span>
            </a>
            <a href="/docs/components" className="btn btn-outline">
              All components
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
