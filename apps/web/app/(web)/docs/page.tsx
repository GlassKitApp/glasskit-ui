import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { InstallCommand } from "@/components/install-command";

export const metadata: Metadata = { title: "Getting started" };

const IMPORT_CSS = `@import "tailwindcss";
@import "@glasskit/glasses-ui/styles.css";`;

const USAGE = `import { GlassViewport, useDpad } from "@glasskit/glasses-ui";

export function App() {
  useDpad(); // arrow keys -> spatial focus, Enter -> click

  return (
    <GlassViewport>
      <div className="screen">
        <h1>Hello, glasses</h1>
        <button type="button" className="focusable">
          Get directions
        </button>
      </div>
    </GlassViewport>
  );
}`;

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="mt-4 overflow-x-auto border border-line-2 bg-bg-2 p-4 font-mono text-[13px] leading-relaxed text-ink">
      <code>{children}</code>
    </pre>
  );
}

export default function DocsGettingStarted() {
  return (
    <>
      <SiteHeader />
      <main className="blueprint min-h-dvh border-t border-line-2">
        <div className="mx-auto max-w-2xl px-6 py-20 lg:py-28">
          <p className="mono-label">Docs</p>
          <h1 className="font-display mt-3 text-[clamp(2.5rem,6vw,4rem)] leading-[0.95]">
            Getting started
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-2">
            GlassKit UI is a React component library for Meta Ray-Ban Display
            Web Apps. Install the SDK, import the stylesheet once, and build
            inside a GlassViewport.
          </p>

          <h2 className="font-display mt-14 text-2xl">1. Install</h2>
          <p className="mt-3 text-ink-2">
            react and react-dom 19 are peer dependencies.
          </p>
          <InstallCommand className="mt-4" />

          <h2 className="font-display mt-14 text-2xl">2. Import the styles</h2>
          <p className="mt-3 text-ink-2">
            In your app&rsquo;s CSS entry, right after Tailwind:
          </p>
          <CodeBlock>{IMPORT_CSS}</CodeBlock>

          <h2 className="font-display mt-14 text-2xl">3. Build</h2>
          <p className="mt-3 text-ink-2">
            Wrap your app in GlassViewport and call useDpad once near the root.
            Any element with the{" "}
            <code className="font-mono text-sm">focusable</code> class joins
            D-pad navigation.
          </p>
          <CodeBlock>{USAGE}</CodeBlock>

          <p className="mono-label mt-16">
            ◇ Full docs ship with the styled components
          </p>
        </div>
      </main>
    </>
  );
}
