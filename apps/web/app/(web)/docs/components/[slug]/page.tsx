import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GlassViewport } from "@glasskit/glasses-ui";
import { LensStage } from "@/components/lens/lens-stage";
import { PropsTable } from "@/components/props-table";
import { CodeBlock } from "@/components/code-block";
import { InstallCommand } from "@/components/install-command";
import { InstallTabs } from "@/components/install-tabs";
import { DevicePreview } from "@/components/device-preview";
import { COMPONENT_DOCS, getComponentDoc } from "@/lib/component-docs";
import { getComponentFiles } from "@/lib/registry-files";
import { qrSvg } from "@/lib/qr";
import { SITE } from "@/lib/config";

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
  const files = getComponentFiles(slug);
  const previewUrl = `${SITE}/preview/${slug}`;
  const qr = await qrSvg(previewUrl);

  return (
    <div className="mx-auto max-w-3xl">
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
        <LensStage
          caption="Live preview"
          device={<DevicePreview qr={qr} url={previewUrl} />}
        >
          <GlassViewport>{doc.preview}</GlassViewport>
        </LensStage>
      </div>

      <h2 className="font-display mt-16 text-2xl">Installation</h2>
      <InstallTabs
        cli={<InstallCommand mode="exec" command={`glasskit add ${slug}`} />}
        manual={
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-ink-2">
                1. Install the SDK &mdash; it provides{" "}
                <code className="font-mono text-sm">GlassViewport</code>,{" "}
                <code className="font-mono text-sm">useDpad</code> and the
                stylesheet:
              </p>
              <InstallCommand className="mt-3" />
            </div>
            <div>
              <p className="text-ink-2">
                2. Copy these files into your project (update the import paths
                to match your setup):
              </p>
              <div className="mt-3 flex flex-col gap-4">
                {files.map((f) => (
                  <div key={f.target}>
                    <p className="mono-label mb-1.5">{f.target}</p>
                    <CodeBlock className="max-h-80 overflow-y-auto">
                      {f.content}
                    </CodeBlock>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      />

      <h2 className="font-display mt-14 text-2xl">Usage</h2>
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
  );
}
