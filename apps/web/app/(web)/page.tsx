import { Emulator } from "@/components/emulator";
import {
  FocusIcon,
  GestureIcon,
  LayersIcon,
  TerminalIcon,
} from "@/components/icons";

const GITHUB = "https://github.com/GlassKitApp/glasskit-ui";

const FEATURES = [
  {
    icon: FocusIcon,
    title: "Spatial focus engine",
    body: "Arrow keys move the focus ring to the nearest target — a superset of Meta's .focusable, tuned for the lens.",
  },
  {
    icon: GestureIcon,
    title: "Neural Band gestures",
    body: "Pinch and swipe as one-shot React hooks. The same code runs on your desk and on-device.",
  },
  {
    icon: LayersIcon,
    title: "Additive components",
    body: "Built for emitted light — luminous edges and glow, not the blur that breaks on a see-through display.",
  },
  {
    icon: TerminalIcon,
    title: "Vendored by npx",
    body: "Pull styled components into your repo with one command. You own the source and restyle it freely.",
  },
];

function PillPrimary({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={GITHUB}
      className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[15px] font-medium text-bg transition-opacity hover:opacity-90"
    >
      {children}
    </a>
  );
}

function PillOutline({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={GITHUB}
      className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-[15px] font-medium text-ink transition-colors hover:bg-ink/[0.04]"
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/70 backdrop-blur-xl">
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-6">
          <a
            href="/"
            className="flex items-center gap-2 text-[15px] font-semibold tracking-tight"
          >
            <span className="size-2 rounded-full bg-accent" />
            GlassKit&nbsp;UI
          </a>
          <nav className="flex items-center gap-7 text-[13px] text-ink-2">
            <a href="#demo" className="transition-colors hover:text-ink">
              Demo
            </a>
            <a href="#features" className="transition-colors hover:text-ink">
              Features
            </a>
            <a href={GITHUB} className="transition-colors hover:text-ink">
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO — the lens floats as the product on a soft Apple stage. */}
        <section
          id="demo"
          className="hero-stage px-6 pb-24 pt-16 text-center lg:pb-32 lg:pt-24"
        >
          <div className="mx-auto max-w-3xl">
            <p className="rise text-[14px] font-medium text-ink-2">
              Open-source React SDK · Meta Ray-Ban Display
            </p>
            <h1 className="rise mt-4 text-[clamp(3rem,8.5vw,7rem)] font-semibold leading-[1.0] tracking-tight">
              Build for the glasses.
            </h1>
            <p className="rise mx-auto mt-6 max-w-xl text-balance text-xl leading-relaxed text-ink-2 sm:text-[22px]">
              A glasses-tuned focus engine, the Neural Band gesture vocabulary,
              and an additive component system — the ergonomic layer Meta
              doesn&rsquo;t ship.
            </p>
            <div className="rise mt-8 flex items-center justify-center gap-3">
              <PillPrimary>
                Get started <span aria-hidden>→</span>
              </PillPrimary>
              <PillOutline>View on GitHub</PillOutline>
            </div>
          </div>

          <div className="rise mt-16 lg:mt-20">
            <Emulator />
          </div>
        </section>

        {/* FEATURES — quiet, spacious. */}
        <section
          id="features"
          className="mx-auto max-w-6xl px-6 py-28 lg:py-36"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Everything the lens needs.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-2">
              Built for a 600×600 additive display and D-pad-only input — the
              things a normal web UI gets wrong.
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="text-center sm:text-left">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-accent/12 text-accent-ink">
                  <f.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CLOSING */}
        <section className="hero-stage px-6 py-28 text-center lg:py-40">
          <h2 className="text-balance text-[clamp(2.5rem,5.5vw,4.25rem)] font-semibold leading-[1.02] tracking-tight">
            Free, open source,
            <br className="hidden sm:block" /> yours to own.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
            Vendor the components into your repo — source and all. Never
            blocked, never a black box.
          </p>
          <div className="mt-9 flex items-center justify-center gap-3">
            <PillPrimary>
              Star on GitHub <span aria-hidden>→</span>
            </PillPrimary>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-bg">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-[13px] text-ink-3 sm:flex-row">
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent" /> GlassKit UI —
            open source
          </span>
          <div className="flex gap-6">
            <a href="#features" className="transition-colors hover:text-ink">
              Features
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
