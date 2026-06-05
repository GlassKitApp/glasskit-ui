import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { LensStage } from "@/components/lens/lens-stage";
import { DpadProvider } from "@/components/lens/dpad-provider";
import { HeartRateDemo } from "@/components/lens/heart-rate-demo";

export const metadata: Metadata = { title: "Playground" };

export default function Playground() {
  return (
    <>
      <SiteHeader />
      <main className="blueprint min-h-[calc(100dvh-3.5rem)] border-t border-line-2">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="mono-label">Playground</p>
          <h1 className="font-display mt-4 text-[clamp(2.25rem,6vw,4rem)] leading-[0.96]">
            The spine, live.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-ink-2">
            The first styled components on a real 600&times;600 additive
            surface. Use the{" "}
            <kbd className="font-mono text-sm text-ink">arrow keys</kbd> to move
            the focus ring and <kbd className="font-mono text-sm text-ink">Enter</kbd>{" "}
            to activate &mdash; that&rsquo;s the Neural Band on the glasses.
          </p>

          <div className="mt-12 flex justify-center">
            <DpadProvider>
              <LensStage caption="Heart-rate complication · Screen · StatusBar · Readout · Cue · Button · GlowIcon">
                <HeartRateDemo />
              </LensStage>
            </DpadProvider>
          </div>

          <p className="mono-label mt-12">
            ◇ Realtime token &amp; prop controls coming next
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <a href="/docs" className="btn btn-solid">
              Get started <span aria-hidden>→</span>
            </a>
            <a href="/" className="btn btn-outline">
              Back home
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
