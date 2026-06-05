import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Playground" };

export default function Playground() {
  return (
    <>
      <SiteHeader />
      <main className="blueprint flex min-h-[calc(100dvh-3.5rem)] items-center border-t border-line-2">
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <p className="mono-label">Playground</p>
          <h1 className="font-display mt-4 text-[clamp(2.5rem,7vw,5rem)] leading-[0.94]">
            Customize components,
            <br />
            in realtime.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-ink-2">
            Tweak the accent, the tokens, and component props live, then copy
            the result straight into your project. Lands with the styled
            components.
          </p>
          <p className="mono-label mt-10">◇ Coming soon</p>
          <div className="mt-9 flex justify-center gap-3">
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
