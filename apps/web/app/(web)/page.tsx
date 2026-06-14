import Link from "next/link";
import { ProductNav } from "@/components/product-nav";
import { ProductFooter } from "@/components/product-footer";
import { InstallCommand } from "@/components/install-command";
import { CopyPromptButton } from "@/components/copy-prompt-button";
import { GithubIcon } from "@/components/icons";
import { GITHUB } from "@/lib/config";
import { COMPONENT_NAV } from "@/lib/component-nav";
import { JsonLd } from "@/components/json-ld";
import {
  jsonLdGraph,
  organizationSchema,
  webSiteSchema,
  softwareSchema,
} from "@/lib/seo";

const COUNT = COMPONENT_NAV.length;

const VALUES = [
  {
    label: "01 / Components",
    title: `${COUNT}, every HUD job`,
    body: "Readouts, lists, timers, comms and launch screens, plus the world-anchored set (DirectionArrow, Compass, Pin) a watch kit can't do. Premium surfaces tuned for a 600×600 lens, never washed-out blur.",
  },
  {
    label: "02 / Input",
    title: "Spatial focus engine",
    body: "Arrow keys and the Neural Band move a focus ring to the nearest target, a superset of Meta's .focusable, tuned for a 600×600 lens. The same code runs on your desk and on the glasses.",
  },
  {
    label: "03 / Yours to own",
    title: "Copy in, no lock-in",
    body: "Vendor the source with one command, @glasskit-ui/cli add, straight into your project, yours to edit. The SDK ships the hooks, viewport and focus engine from npm.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          organizationSchema(),
          webSiteSchema(),
          softwareSchema(),
        )}
      />
      <ProductNav />

      {/* HERO: centered, spacious, premium. Bleeds up under the transparent
          nav (-mt-14 = nav height) so the blueprint grid shows behind it, like
          the parent; pt-14 puts the content back below the nav. */}
      <section className="blueprint -mt-14 pt-14">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center lg:py-32">
          <h1 className="rise font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95]">
            The component library
            <br />
            for the{" "}
            <span className="text-glow-accent bg-gradient-to-r from-[var(--accent)] to-[var(--accent-ink)] bg-clip-text text-transparent">
              glasses.
            </span>
          </h1>
          <p className="rise-2 mt-8 max-w-xl text-lg leading-relaxed text-ink-2 sm:text-xl">
            {COUNT} React components for Meta Ray-Ban Display: a spatial focus
            engine, Neural Band input, system-back navigation, and everything a
            glanceable in-lens display needs. Open source.
          </p>
          <div className="rise-2 mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/docs" className="btn btn-solid">
              Get started <span aria-hidden>→</span>
            </Link>
            <Link href="/docs/components/screen" className="btn btn-outline">
              Browse components
            </Link>
            <Link href="/playground" className="btn btn-outline">
              Playground
            </Link>
            <CopyPromptButton />
          </div>
          <InstallCommand
            mode="exec"
            command="@glasskit-ui/cli add button"
            className="rise-3 mt-10"
          />
        </div>
      </section>

      {/* WHAT YOU GET: airy, text only */}
      <section className="mx-auto max-w-[1320px] px-6 py-16 lg:px-10 lg:py-24">
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
      <section className="blueprint">
        <div className="mx-auto max-w-[1320px] px-6 py-20 text-center lg:px-10 lg:py-28">
          <h2 className="font-display mx-auto max-w-3xl text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96]">
            Free. Open source. Yours to own.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
            Install the SDK from npm, then{" "}
            <code className="font-mono text-[0.9em] text-ink">
              @glasskit-ui/cli add
            </code>{" "}
            the components straight into your project. Your code to edit, no
            lock-in, no black box.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/docs" className="btn btn-solid">
              Get started <span aria-hidden>→</span>
            </Link>
            <a href={GITHUB} className="btn btn-outline">
              <GithubIcon className="size-4" /> Star on GitHub
            </a>
          </div>
        </div>
      </section>

      <ProductFooter />
    </>
  );
}
