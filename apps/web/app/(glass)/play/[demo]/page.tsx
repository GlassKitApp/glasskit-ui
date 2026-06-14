import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PLAYGROUND_DEMOS, getPlaygroundDemo } from "@/lib/playground-demos";
import { GlassAppShell } from "@/components/glass-app-shell";
import { DpadProvider } from "@/components/lens/dpad-provider";

export function generateStaticParams() {
  return PLAYGROUND_DEMOS.map((d) => ({ demo: d.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ demo: string }>;
}): Promise<Metadata> {
  const { demo } = await params;
  const d = getPlaygroundDemo(demo);
  return d ? { title: `${d.label} · playground` } : {};
}

/**
 * Full-screen, chrome-free playground demo — the "run on glasses" QR target
 * for the playground. The demo node provides its own <GlassViewport>, so we
 * render it straight into the glass shell (GlassAppShell scale-fits it).
 */
export default async function PlayDemoPage({
  params,
}: {
  params: Promise<{ demo: string }>;
}) {
  const { demo } = await params;
  const d = getPlaygroundDemo(demo);
  if (!d) notFound();

  return (
    <GlassAppShell>
      <DpadProvider>{d.node}</DpadProvider>
    </GlassAppShell>
  );
}
