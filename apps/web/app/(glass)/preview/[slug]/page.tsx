import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GlassViewport } from "@glasskit/glasses-ui";
import { COMPONENT_DOCS, getComponentDoc } from "@/lib/component-docs";
import { getGlassDemo } from "@/lib/glass-demos";
import { GlassAppShell } from "@/components/glass-app-shell";
import { DpadProvider } from "@/components/lens/dpad-provider";

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
 * Full-screen, chrome-free glass app — the deep-link target a Ray-Ban Display
 * (or any device) opens via the "on glasses" QR. A real working screen on a
 * pure 600×600 lens: useDpad drives focus, the Neural Band CustomEvent works,
 * sensor components run live. Interactive demos come from glass-demos;
 * pure-display components fall back to their static docs preview.
 */
export default async function GlassAppPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getComponentDoc(slug);
  if (!doc) notFound();

  return (
    <GlassAppShell>
      <DpadProvider>
        <GlassViewport frame={false}>
          {getGlassDemo(slug) ?? doc.preview}
        </GlassViewport>
      </DpadProvider>
    </GlassAppShell>
  );
}
