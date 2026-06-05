import { SiteHeader } from "@/components/site-header";
import { InstallCommand } from "@/components/install-command";
import { GithubIcon } from "@/components/icons";
import { GITHUB } from "@/lib/config";
import { LensStage } from "@/components/lens/lens-stage";
import { HeartRateDemo } from "@/components/lens/heart-rate-demo";

const VALUES = [
  {
    label: "01 / Components",
    title: "28, every HUD job",
    body: "Readouts, lists, progress, comms and launch screens — plus the world-anchored set (DirectionArrow, Compass, Pin, Callout) a watch kit can't do. Additive light on true black, never washed-out blur.",
  },
  {
    label: "02 / Input",
    title: "Spatial focus engine",
    body: "Arrow keys and the Neural Band move a focus ring to the nearest target — a superset of Meta's .focusable, tuned for a 600×600 lens. The same code runs on your desk and on the glasses.",
  },
  {
    label: "03 / Yours to own",
    title: "Copy in, no lock-in",
    body: "Vendor the source with one command — glasskit add — straight into your project, yours to edit. The SDK ships the hooks, viewport and focus engine from npm.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      {/* HERO — centered, spacious, premium */}
      <section className="blueprint border-b border-line-2">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center lg:py-32">
          <p className="rise mono-label">Open source · Meta Ray-Ban Display</p>
          <h1 className="rise font-display mt-6 text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95]">
            The component library
            <br />
            for the{" "}
            <span className="text-glow-accent bg-gradient-to-r from-[#0a7d42] to-[#37d97a] bg-clip-text text-transparent">
              glasses.
            </span>
          </h1>
          <p className="rise-2 mt-8 max-w-xl text-lg leading-relaxed text-ink-2 sm:text-xl">
            28 additive React components for Meta Ray-Ban Display — a spatial
            focus engine, the Neural Band gestures, and everything a glanceable
            see-through display needs. Open source.
          </p>
          <div className="rise-2 mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="/docs" className="btn btn-solid">
              Get started <span aria-hidden>→</span>
            </a>
            <a href="/docs/components" className="btn btn-outline">
              Browse components
            </a>
            <a href="/playground" className="btn btn-outline">
              Playground
            </a>
          </div>
          <InstallCommand
            mode="exec"
            command="glasskit add button"
            className="rise-3 mt-10"
          />
          <p className="rise-3 mono-label mt-3 text-ink-3">
            Copy components straight in — yours to own
          </p>
        </div>
      </section>

      {/* ON THE LENS — show the real thing */}
      <section className="border-b border-line-2 bg-bg">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-24 lg:flex-row lg:justify-between lg:py-28">
          <div className="max-w-md text-center lg:text-left">
            <p className="mono-label">On the lens</p>
            <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3rem)] leading-tight">
              Built from emitted light.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-2">
              Pure black is transparent on the waveguide, so every component is
              luminous edges, a single phosphor-green accent, and soft glow —
              never fills or blur. Crisp, glanceable, and correct over the real
              world.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a href="/playground" className="btn btn-solid">
                Open the playground <span aria-hidden>→</span>
              </a>
              <a href="/docs/components" className="btn btn-outline">
                All 28 components
              </a>
            </div>
          </div>
          <LensStage caption="Live · Screen · StatusBar · Readout · Button · GlowIcon">
            <HeartRateDemo />
          </LensStage>
        </div>
      </section>

      {/* WHAT YOU GET — airy, text only */}
      <section className="mx-auto max-w-[1320px] px-6 py-28 lg:px-10 lg:py-36">
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
            Install the SDK from npm, then{" "}
            <code className="font-mono text-[0.9em] text-ink">
              glasskit add
            </code>{" "}
            the components straight into your project. Your code to edit — no
            lock-in, no black box.
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
