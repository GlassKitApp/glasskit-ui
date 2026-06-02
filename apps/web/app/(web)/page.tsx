import { Emulator } from "@/components/emulator";
import {
  FocusIcon,
  GestureIcon,
  LayersIcon,
  TerminalIcon,
  GithubIcon,
} from "@/components/icons";

const GITHUB = "https://github.com/GlassKitApp/glasskit-ui";

const FEATURES = [
  {
    icon: FocusIcon,
    title: "Spatial focus engine",
    body: "Arrow keys + a scoring model move the focus ring to the nearest target in any direction — a superset of Meta's .focusable, tuned for a 600×600 lens.",
  },
  {
    icon: GestureIcon,
    title: "Neural Band gestures",
    body: "The wristband's pinch and swipe vocabulary as one-shot React hooks. The same code path runs on your desk and on the glasses.",
  },
  {
    icon: LayersIcon,
    title: "Additive components",
    body: "A component system built for an emitted-light display — premium via luminous edges and glow, never washed-out blur.",
  },
  {
    icon: TerminalIcon,
    title: "npx registry",
    body: "Vendor styled components into your app with one command. You own the source and restyle it freely.",
  },
];

function InstallCommand() {
  return (
    <code className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-4 py-2.5 font-mono text-sm text-ink">
      <span className="text-accent">$</span> npm i @glasskit/glasses-ui
    </code>
  );
}

export default function Home() {
  return (
    <div className="relative">
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-bg/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="flex items-center gap-2.5 font-semibold tracking-tight">
            <span className="size-2.5 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
            GlassKit UI
          </span>
          <nav className="flex items-center gap-1.5 text-sm">
            <a
              href="#features"
              className="hidden rounded-lg px-3 py-1.5 text-ink-body transition hover:text-ink sm:block"
            >
              Features
            </a>
            <a
              href="#install"
              className="hidden rounded-lg px-3 py-1.5 text-ink-body transition hover:text-ink sm:block"
            >
              Install
            </a>
            <a
              href={GITHUB}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-ink transition hover:bg-white/[0.08]"
            >
              <GithubIcon className="size-4" /> GitHub
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6">
        {/* HERO — the emulator is the visual (the product IS the hero). */}
        <section className="flex flex-col items-center gap-12 pt-14 text-center lg:pt-20">
          <div className="flex max-w-2xl flex-col items-center gap-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-ink-body">
              <span className="size-1.5 rounded-full bg-accent" />
              The unowned React layer for Meta Ray-Ban Display
            </p>
            <h1 className="text-balance text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl">
              Build for the glasses,
              <br />
              <span className="text-accent accent-glow">not against them.</span>
            </h1>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-ink-body">
              The open-source SDK for Meta Ray-Ban Display apps: a glasses-tuned
              focus engine, the Neural Band gesture vocabulary, and an additive
              component system — the ergonomic layer Meta doesn&rsquo;t ship.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <InstallCommand />
              <a
                href={GITHUB}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-[#04210f] transition ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-accent-bright"
              >
                <GithubIcon className="size-4" /> Star on GitHub
              </a>
            </div>
          </div>

          <Emulator />

          <p className="-mt-2 text-sm text-ink-dim">
            A real 600×600 demo running the actual SDK — move with the D-pad,
            pinch to act.
          </p>
        </section>

        {/* MOAT */}
        <section
          id="features"
          className="grid gap-4 py-24 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className="glass-panel specular flex flex-col gap-3 p-6 text-left"
            >
              <span className="flex size-10 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                <f.icon className="size-5" />
              </span>
              <h3 className="text-base font-semibold tracking-tight">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-body">{f.body}</p>
            </article>
          ))}
        </section>

        {/* INSTALL / PROOF */}
        <section
          id="install"
          className="flex flex-col items-center gap-6 pb-24 text-center"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Free, open source, yours to own.
          </h2>
          <p className="max-w-lg text-pretty leading-relaxed text-ink-body">
            Start in seconds. The styled components vendor straight into your
            repo — source and all — so you&rsquo;re never blocked on us.
          </p>
          <InstallCommand />
        </section>
      </main>

      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-ink-dim sm:flex-row">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-accent" /> GlassKit UI —
            open source
          </span>
          <div className="flex items-center gap-5">
            <a href="#features" className="transition hover:text-ink">
              Features
            </a>
            <a
              href={GITHUB}
              className="inline-flex items-center gap-1.5 transition hover:text-ink"
            >
              <GithubIcon className="size-4" /> GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
