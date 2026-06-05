import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GlassViewport } from "@glasskit/glasses-ui";
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
  return doc ? { title: `${doc.name} · live preview` } : {};
}

/**
 * Full-screen, chrome-free live preview — the deep-link target a Ray-Ban
 * Display (or any device) opens via the "on glasses" QR. Pure 600×600 lens on
 * black, exactly what the device renders.
 */
export default async function DevicePreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getComponentDoc(slug);
  if (!doc) notFound();

  return (
    <main className="flex min-h-dvh items-center justify-center overflow-auto bg-black p-4">
      <GlassViewport frame={false}>{doc.preview}</GlassViewport>
    </main>
  );
}
