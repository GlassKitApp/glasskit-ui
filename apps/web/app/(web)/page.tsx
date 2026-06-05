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

function Install() {
  return (
    <code className="rounded-full border border-line bg-bg-2 px-5 py-3 font-mono text-sm text-ink-2">
      <span className="text-accent-ink">$</span> npm i @glasskit/glasses-ui
    </code>
  );
}

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/75 backdrop-blur-xl">
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
        {/* HERO */}
        <section className="mx-auto max-w-4xl px-6 pb-10 pt-20 text-center lg:pt-28">
          <h1 className="rise text-balance text-[clamp(2.75rem,7vw,5.5rem)] font-semibold leading-[1.04] tracking-tight">
            Build for the glasses.
          </h1>
          <p className="rise mx-auto mt-6 max-w-2xl text-balance text-xl leading-relaxed text-ink-2 sm:text-2xl">
            The open-source React SDK for Meta Ray-Ban Display — a glasses-tuned
            focus engine, the Neural Band gesture vocabulary, and an additive
            component system.
          </p>
          <div className="rise mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={GITHUB}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-bg transition-opacity hover:opacity-90"
            >
              Get started <span aria-hidden>→</span>
            </a>
            <Install />
          </div>
        </section>

        {/* PRODUCT — the live lens */}
        <section id="demo" className="mx-auto max-w-5xl px-6">
          <div className="product-frame rise p-6 sm:p-10">
            <Emulator />
          </div>
          <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-ink-3">
            A live 600×600 lens running the actual SDK. On a real Meta Ray-Ban
            Display pure black is transparent, so everything is emitted light.
            Move the focus ring with the D-pad; pinch to act.
          </p>
        </section>

        {/* FEATURES */}
        <section id="features" className="mt-20 bg-bg-2 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Everything the lens needs.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-2">
                Built for a 600×600 additive display and D-pad-only input — the
                things a normal web UI gets wrong.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="flex flex-col items-center text-center sm:items-start sm:text-left"
                >
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-accent/15 text-accent-ink">
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
          </div>
        </section>

        {/* CLOSING */}
        <section className="mx-auto max-w-3xl px-6 py-28 text-center lg:py-36">
          <h2 className="text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight">
            Free, open source, yours to own.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-2">
            Vendor the components into your repo — source and all. Never
            blocked, never a black box.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={GITHUB}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-bg transition-opacity hover:opacity-90"
            >
              Star on GitHub →
            </a>
            <Install />
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-bg-2">
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
