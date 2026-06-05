import {
  ReadoutCard,
  ButtonCard,
  ProgressCard,
  CueCard,
  LauncherCard,
  DirectionCard,
  StatusBarCard,
  ChipsCard,
} from "@/components/showcase";

const GITHUB = "https://github.com/GlassKitApp/glasskit-ui";

export default function Home() {
  return (
    <>
      {/* NAV — full width */}
      <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/70 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-6 lg:px-10">
          <a href="/" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="GlassKit" className="h-[22px] w-auto" />
            <span className="rounded bg-ink/[0.06] px-1.5 py-0.5 text-[11px] font-semibold text-ink-2">
              UI
            </span>
          </a>
          <nav className="flex items-center gap-1 text-[14px] text-ink-2">
            <a
              href="#components"
              className="hidden rounded-lg px-3 py-1.5 transition-colors hover:text-ink sm:block"
            >
              Components
            </a>
            <a
              href="#docs"
              className="hidden rounded-lg px-3 py-1.5 transition-colors hover:text-ink sm:block"
            >
              Docs
            </a>
            <a
              href={GITHUB}
              className="rounded-lg px-3 py-1.5 transition-colors hover:text-ink"
            >
              GitHub
            </a>
            <a
              href={GITHUB}
              className="pill ml-2 bg-ink text-bg hover:opacity-90"
            >
              Get started
            </a>
          </nav>
        </div>
      </header>

      {/* HERO — asymmetric, full width, showcase bleeds off the right edge */}
      <section className="mesh overflow-hidden">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-12 lg:gap-6 lg:px-10 lg:py-28">
          <div className="lg:col-span-5">
            <p className="rise text-[14px] font-medium text-ink-2">
              Open-source · Meta Ray-Ban Display
            </p>
            <h1 className="rise mt-4 text-[clamp(2.75rem,5.6vw,5rem)] font-semibold leading-[0.98] tracking-tight">
              Build glasses apps
              <br />
              that <span className="text-accent-ink glow-accent">glow</span>.
            </h1>
            <p className="rise-2 mt-6 max-w-md text-lg leading-relaxed text-ink-2">
              An open-source React component library for the Meta Ray-Ban
              Display — a focus engine, the Neural Band gestures, and components
              that look right on an additive lens.
            </p>
            <div className="rise-2 mt-8 flex flex-wrap items-center gap-3">
              <a
                href={GITHUB}
                className="pill bg-accent text-[#06230f] hover:opacity-90"
              >
                Get started <span aria-hidden>→</span>
              </a>
              <a
                href="#components"
                className="pill border border-ink/15 text-ink hover:bg-ink/[0.04]"
              >
                Browse components
              </a>
            </div>
            <code className="rise-2 mt-6 inline-flex items-center gap-2 rounded-lg border border-line bg-bg/60 px-4 py-2.5 font-mono text-sm text-ink-2 backdrop-blur">
              <span className="text-accent-ink">$</span> npm i
              @glasskit/glasses-ui
            </code>
          </div>

          {/* Showcase — placeholder additive components, bleeding right */}
          <div className="rise-3 relative lg:col-span-7 lg:-mr-24 xl:-mr-40">
            <div className="glow-halo pointer-events-none absolute -inset-12 -z-10 rounded-[40px] blur-2xl" />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4 pt-8">
                <StatusBarCard />
                <ReadoutCard />
                <CueCard />
              </div>
              <div className="flex flex-col gap-4">
                <ButtonCard />
                <ProgressCard />
                <LauncherCard />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPONENTS — full-width showcase row */}
      <section
        id="components"
        className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32"
      >
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="max-w-xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            A component for every part of the HUD.
          </h2>
          <p className="max-w-xs text-ink-2">
            Monitor, navigate, guide, caption, notify — derived from what a
            glanceable display actually does.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DirectionCard />
          <ReadoutCard />
          <ButtonCard />
          <ProgressCard />
          <LauncherCard />
          <CueCard />
          <ChipsCard />
          <StatusBarCard className="self-start" />
        </div>
        <p className="mt-8 text-sm text-ink-3">
          Previews are placeholders — the styled components ship next.
        </p>
      </section>

      {/* CLOSING */}
      <section className="mesh border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-28 text-center lg:px-10 lg:py-36">
          <h2 className="mx-auto max-w-2xl text-balance text-[clamp(2.25rem,4.5vw,4rem)] font-semibold leading-[1.02] tracking-tight">
            Free, open source, yours to own.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-2">
            Vendor the components into your repo — source and all. Never
            blocked, never a black box.
          </p>
          <div className="mt-9 flex justify-center">
            <a
              href={GITHUB}
              className="pill bg-accent text-[#06230f] hover:opacity-90"
            >
              Star on GitHub <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-line bg-bg">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-6 py-8 text-[13px] text-ink-3 lg:px-10 sm:flex-row">
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent" /> GlassKit UI —
            open source
          </span>
          <div className="flex gap-6">
            <a href="#components" className="transition-colors hover:text-ink">
              Components
            </a>
            <a href={GITHUB} className="transition-colors hover:text-ink">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
