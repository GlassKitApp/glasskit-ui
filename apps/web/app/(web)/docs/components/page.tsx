import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { COMPONENT_DOCS } from "@/lib/component-docs";

export const metadata: Metadata = {
  title: "Components",
  description:
    "The GlassKit UI spine — additive-lens components for Meta Ray-Ban Display apps.",
};

export default function ComponentsIndex() {
  return (
    <>
      <SiteHeader />
      <main className="blueprint min-h-dvh border-t border-line-2">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:py-28">
          <p className="mono-label">Docs · Components</p>
          <h1 className="font-display mt-3 text-[clamp(2.5rem,6vw,4rem)] leading-[0.95]">
            The spine
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
            The {COMPONENT_DOCS.length} components every glasses app pulls.
            Additive light on a true-black lens &mdash; luminous edges, a single
            phosphor-green accent, D-pad focus. Built to the{" "}
            <a
              href="https://ui.glasskit.app"
              className="text-accent-ink underline-offset-4 hover:underline"
            >
              Apple-feel
            </a>{" "}
            spec.
          </p>

          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {COMPONENT_DOCS.map((c) => (
              <a
                key={c.slug}
                href={`/docs/components/${c.slug}`}
                className="group border border-line-2 bg-bg p-5 transition-colors hover:bg-bg-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-bold">
                    {c.name}
                  </span>
                  <span className="mono-label">{c.category}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  {c.summary}
                </p>
                <span className="mono-label mt-4 inline-block text-accent-ink">
                  View →
                </span>
              </a>
            ))}
          </div>

          <div className="mt-14">
            <a href="/playground" className="btn btn-outline">
              Try them in the playground <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
