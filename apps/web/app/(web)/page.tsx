import { SiteHeader } from "@/components/site-header";
import { InstallCommand } from "@/components/install-command";
import { GithubIcon } from "@/components/icons";
import { GITHUB } from "@/lib/config";

const VALUES = [
  {
    label: "01 / Input",
    title: "Spatial focus engine",
    body: "Arrow keys and a scoring model move the focus ring to the nearest target. A superset of Meta's .focusable, tuned for a 600×600 lens.",
  },
  {
    label: "02 / Gestures",
    title: "Neural Band",
    body: "Pinch and swipe as one-shot React hooks. The same code runs on your desk and on the glasses.",
  },
  {
    label: "03 / Components",
    title: "Additive by design",
    body: "Built for an emitted-light display. Luminous, legible, and correct on a see-through lens, never washed-out blur.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      {/* HERO — centered, spacious, premium */}
      <section className="blueprint border-b border-line-2">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-28 text-center lg:py-44">
          <p className="rise mono-label">Open source · Meta Ray-Ban Display</p>
          <h1 className="rise font-display mt-6 text-[clamp(2.75rem,7.5vw,6rem)] leading-[0.95]">
            The component library
            <br />
            for the{" "}
            <span className="bg-gradient-to-r from-[#0a7d42] to-[#37d97a] bg-clip-text text-transparent">
              glasses
            </span>
            .
          </h1>
          <p className="rise-2 mt-8 max-w-xl text-lg leading-relaxed text-ink-2 sm:text-xl">
            Accessible, additive React components for Meta Ray-Ban Display. A
            focus engine, the Neural Band gestures, and everything a glanceable
            display needs. Open source.
          </p>
          <div className="rise-2 mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="/docs" className="btn btn-solid">
              Get started <span aria-hidden>→</span>
            </a>
            <a href="/playground" className="btn btn-outline">
              Playground
            </a>
            <a href={GITHUB} className="btn btn-outline">
              <GithubIcon className="size-4" /> GitHub
            </a>
          </div>
          <InstallCommand className="rise-3 mt-10" />
        </div>
      </section>

      {/* WHAT YOU GET — airy, text only */}
      <section className="mx-auto max-w-[1320px] px-6 py-28 lg:px-10 lg:py-40">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-20">
          {VALUES.map((v) => (
            <div key={v.title} className="border-t-2 border-ink pt-5">
              <p className="mono-label">{v.label}</p>
              <h3 className="font-display mt-4 text-2xl leading-tight">
                {v.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-2">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING */}
      <section className="blueprint border-y border-line-2">
        <div className="mx-auto max-w-[1320px] px-6 py-28 text-center lg:px-10 lg:py-40">
          <h2 className="font-display mx-auto max-w-3xl text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96]">
            Free. Open source. Yours to own.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
            Install from npm, or copy the components straight into your project.
            Your code to edit, no lock-in, no black box.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="/docs" className="btn btn-solid">
              Get started <span aria-hidden>→</span>
            </a>
            <a href={GITHUB} className="btn btn-outline">
              <GithubIcon className="size-4" /> Star on GitHub
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-bg">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-3 px-6 py-8 lg:px-10 sm:flex-row">
          <span className="mono-label">GlassKit UI · open source</span>
          <div className="flex gap-6">
            <a href="/docs" className="mono-label hover:text-ink">
              Docs
            </a>
            <a href="/playground" className="mono-label hover:text-ink">
              Playground
            </a>
            <a href={GITHUB} className="mono-label hover:text-ink">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
