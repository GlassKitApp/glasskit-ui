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
      {/* NAV — segmented, hard-bordered cells (the brand lockup matches the
       * sibling glasskit repo: avatar mark + GlassKit wordmark). */}
      <header className="sticky top-0 z-50 border-b border-line-2 bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1320px] items-stretch">
          <a
            href="/"
            className="flex items-center gap-2.5 border-r border-line-2 pl-6 pr-6 transition-colors hover:bg-bg-2 lg:pl-10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/avatar.png" alt="" className="size-6 rounded-[5px]" />
            <span className="font-display text-[15px] font-bold tracking-tight">
              GlassKit <span className="font-medium text-ink-3">UI</span>
            </span>
          </a>
          <nav className="hidden items-stretch md:flex">
            <a
              href="#components"
              className="mono-label flex items-center border-r border-line-2 px-5 transition-colors hover:bg-bg-2 hover:text-ink"
            >
              Components
            </a>
            <a
              href="#docs"
              className="mono-label flex items-center border-r border-line-2 px-5 transition-colors hover:bg-bg-2 hover:text-ink"
            >
              Docs
            </a>
            <a
              href={GITHUB}
              className="mono-label flex items-center border-r border-line-2 px-5 transition-colors hover:bg-bg-2 hover:text-ink"
            >
              GitHub
            </a>
          </nav>
          <a
            href={GITHUB}
            className="mono-label ml-auto flex items-center border-l border-line-2 bg-ink px-6 text-bg transition-colors hover:bg-black lg:pr-10"
          >
            Get started
          </a>
        </div>
      </header>

      {/* HERO — blueprint grid; building blocks snap into it, bleeding right */}
      <section className="blueprint overflow-hidden border-b border-line-2">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-24">
          <div className="lg:col-span-5">
            <p className="rise mono-label">
              Open source · Meta Ray-Ban Display
            </p>
            <h1 className="rise font-display mt-5 text-[clamp(2.9rem,7vw,6.6rem)] leading-[0.95]">
              The component library
              <br />
              for the{" "}
              <span className="bg-gradient-to-r from-[#0a7d42] to-[#37d97a] bg-clip-text text-transparent">
                glasses
              </span>
              .
            </h1>
            <p className="rise-2 mt-7 max-w-md text-lg leading-relaxed text-ink-2">
              Accessible, additive React components for Meta Ray-Ban Display. A
              focus engine, the Neural Band gestures, and everything a
              glanceable display needs. Open source.
            </p>
            <div className="rise-2 mt-8 flex flex-wrap items-center gap-3">
              <a href={GITHUB} className="btn btn-solid">
                Get started <span aria-hidden>→</span>
              </a>
              <a href="#components" className="btn btn-outline">
                Browse components
              </a>
            </div>
            <div className="rise-2 mt-6 inline-flex items-center gap-2 border border-line-2 bg-bg px-4 py-2.5 font-mono text-sm text-ink-2">
              <span className="text-accent-ink">$</span> npm i
              @glasskit/glasses-ui
            </div>
          </div>

          {/* Showcase — dark building blocks snapped onto the blueprint */}
          <div className="rise-3 lg:col-span-7 lg:-mr-16 xl:-mr-32">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4 lg:pt-10">
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

      {/* COMPONENTS — the kit, laid out on the grid */}
      <section
        id="components"
        className="mx-auto max-w-[1320px] px-6 py-24 lg:px-10 lg:py-28"
      >
        <div className="flex flex-col items-start justify-between gap-4 border-b border-line-2 pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="mono-label">The kit · 28 parts</p>
            <h2 className="font-display mt-3 text-4xl leading-[0.95] sm:text-5xl">
              A component for every
              <br />
              part of the HUD.
            </h2>
          </div>
          <p className="max-w-xs text-ink-2">
            Monitor, navigate, guide, caption, notify. The archetypes a
            glanceable display actually needs.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DirectionCard />
          <ReadoutCard />
          <ButtonCard />
          <ProgressCard />
          <LauncherCard />
          <CueCard />
          <ChipsCard />
          <StatusBarCard />
        </div>
        <p className="mono-label mt-8">
          ◇ Previews are placeholders. Styled components ship next
        </p>
      </section>

      {/* CLOSING */}
      <section className="blueprint border-y border-line-2">
        <div className="mx-auto max-w-[1320px] px-6 py-28 lg:px-10 lg:py-32">
          <div className="max-w-3xl">
            <h2 className="font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.95]">
              Free. Open source.
              <br />
              Yours to vendor.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
              Pull the blocks straight into your repo, source and all. Never
              blocked, never a black box.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={GITHUB} className="btn btn-solid">
                Star on GitHub <span aria-hidden>→</span>
              </a>
              <a href="#components" className="btn btn-outline">
                Browse the kit
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-bg">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-3 px-6 py-8 lg:px-10 sm:flex-row">
          <span className="mono-label">GlassKit UI · open source</span>
          <div className="flex gap-6">
            <a href="#components" className="mono-label hover:text-ink">
              Components
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
