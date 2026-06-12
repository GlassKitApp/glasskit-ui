import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GlassViewport } from "@glasskit-ui/react";
import { EXAMPLES, getExample } from "@/lib/examples";
import { GlassAppShell } from "@/components/glass-app-shell";
import { DpadProvider } from "@/components/lens/dpad-provider";

export function generateStaticParams() {
  return EXAMPLES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ex = getExample(slug);
  return ex ? { title: `${ex.name} · example app` } : {};
}

/**
 * Full-screen example app — same chrome-free glass shell as /preview/<slug>,
 * but a complete multi-screen composition instead of a single component.
 */
export default async function ExampleAppPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ex = getExample(slug);
  if (!ex) notFound();

  return (
    <GlassAppShell>
      <DpadProvider>
        <GlassViewport frame={false}>{ex.node}</GlassViewport>
      </DpadProvider>
    </GlassAppShell>
  );
}
