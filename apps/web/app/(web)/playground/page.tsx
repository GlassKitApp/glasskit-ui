import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { PlaygroundClient } from "@/components/playground-client";

export const metadata: Metadata = { title: "Playground" };

export default function Playground() {
  return (
    <>
      <SiteHeader />
      <main className="blueprint min-h-[calc(100dvh-3.5rem)] border-t border-line-2">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="text-center">
            <p className="mono-label">Playground</p>
            <h1 className="font-display mt-4 text-[clamp(2.25rem,6vw,4rem)] leading-[0.96]">
              The spine, live.
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-ink-2">
              Pick a component, recolor the accent token, and copy the JSX. Use
              the <kbd className="font-mono text-sm text-ink">arrow keys</kbd>{" "}
              to move the focus ring and{" "}
              <kbd className="font-mono text-sm text-ink">Enter</kbd> to
              activate &mdash; that&rsquo;s the Neural Band on the glasses.
            </p>
          </div>

          <PlaygroundClient />

          <div className="mt-16 flex justify-center gap-3">
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
