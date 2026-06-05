"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/lib/use-copy-to-clipboard";
import { LensStage } from "@/components/lens/lens-stage";
import { DpadProvider } from "@/components/lens/dpad-provider";
import { HeartRateDemo } from "@/components/lens/heart-rate-demo";
import { MenuDemo } from "@/components/lens/menu-demo";
import { SyncDemo } from "@/components/lens/sync-demo";

type Demo = {
  id: string;
  label: string;
  caption: string;
  node: React.ReactNode;
  code: string;
};

// `code` is an illustrative copy-paste snippet (simplified icon names), not the
// literal demo source — it teaches the shape, it isn't kept byte-identical.
const DEMOS: Demo[] = [
  {
    id: "vitals",
    label: "Vitals",
    caption: "Screen · StatusBar · Readout · Cue · Button · GlowIcon",
    node: <HeartRateDemo />,
    code: `<GlassViewport>
  <Screen
    status={<StatusBar start="9:41" end="87%" />}
    cue={<Cue tone="accent">Recording · tap to log</Cue>}
  >
    <GlowIcon size="lg" active><HeartIcon /></GlowIcon>
    <Readout label="Heart rate" value="128" unit="BPM" />
    <div className="row">
      <Button variant="primary" icon={<GlowIcon size="sm"><CheckIcon /></GlowIcon>}>
        Log
      </Button>
      <Button>Dismiss</Button>
    </div>
  </Screen>
</GlassViewport>`,
  },
  {
    id: "menu",
    label: "Menu",
    caption: "List · ListRow · GlowIcon",
    node: <MenuDemo />,
    code: `<GlassViewport>
  <Screen
    status={<StatusBar start="9:41" end="87%" />}
    cue={<Cue>Look down to dismiss</Cue>}
  >
    <List>
      <ListRow leading={<GlowIcon active size="sm"><NavIcon /></GlowIcon>}
               trailing={<GlowIcon size="sm"><ChevronIcon /></GlowIcon>}>
        Navigate
      </ListRow>
      <ListRow leading={<GlowIcon size="sm"><MessageIcon /></GlowIcon>} trailing="2">
        Messages
      </ListRow>
      <ListRow leading={<GlowIcon size="sm"><MusicIcon /></GlowIcon>}
               trailing={<GlowIcon size="sm"><ChevronIcon /></GlowIcon>}>
        Now playing
      </ListRow>
    </List>
  </Screen>
</GlassViewport>`,
  },
  {
    id: "sync",
    label: "Sync",
    caption: "AsyncView · Spinner · Progress",
    node: <SyncDemo />,
    code: `<GlassViewport>
  <Screen
    status={<StatusBar start="9:41" end="87%" />}
    cue={<Cue tone="accent">Keep glasses on</Cue>}
  >
    <AsyncView
      status="loading"
      loading={
        <div className="gk-async">
          <Spinner label="Syncing" />
          <Readout label="Syncing route" value="3" unit="/ 5" emphasis="secondary" />
          <Progress variant="step" value={3} max={5} />
        </div>
      }
    >
      {/* success state renders the route here */}
    </AsyncView>
  </Screen>
</GlassViewport>`,
  },
];

const ACCENTS = [
  { id: "phosphor", label: "Phosphor", cls: "", sw: "sw-phosphor" },
  { id: "ice", label: "Ice", cls: "accent-ice", sw: "sw-ice" },
  { id: "amber", label: "Amber", cls: "accent-amber", sw: "sw-amber" },
  { id: "violet", label: "Violet", cls: "accent-violet", sw: "sw-violet" },
];

export function PlaygroundClient() {
  const [demoId, setDemoId] = useState(DEMOS[0]!.id);
  const [accentId, setAccentId] = useState(ACCENTS[0]!.id);

  const demo = DEMOS.find((d) => d.id === demoId)!;
  const accent = ACCENTS.find((a) => a.id === accentId)!;

  return (
    <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[1fr_minmax(0,28rem)]">
      {/* Preview + controls */}
      <div className="flex flex-col gap-5">
        <div className={accent.cls}>
          <DpadProvider key={demo.id}>
            <LensStage caption={demo.caption}>{demo.node}</LensStage>
          </DpadProvider>
        </div>

        {/* Demo tabs */}
        <div className="flex flex-col gap-2">
          <span className="mono-label">Component</span>
          <div className="flex flex-wrap gap-2">
            {DEMOS.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDemoId(d.id)}
                className={cn(
                  "border px-3 py-1.5 text-[14px] font-medium transition-colors",
                  d.id === demoId
                    ? "border-ink bg-ink text-bg"
                    : "border-line-2 text-ink-2 hover:text-ink",
                )}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accent picker */}
        <div className="flex flex-col gap-2">
          <span className="mono-label">Accent token</span>
          <div className="flex flex-wrap gap-2">
            {ACCENTS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setAccentId(a.id)}
                aria-pressed={a.id === accentId}
                className={cn(
                  "inline-flex items-center gap-2 border px-3 py-1.5 text-[14px] transition-colors",
                  a.id === accentId
                    ? "border-ink text-ink"
                    : "border-line-2 text-ink-2 hover:text-ink",
                )}
              >
                <span className={cn("h-3 w-3 rounded-full", a.sw)} />
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Code panel */}
      <CodePanel code={demo.code} accent={accent} />
    </div>
  );
}

function CodePanel({
  code,
  accent,
}: {
  code: string;
  accent: (typeof ACCENTS)[number];
}) {
  const override =
    accent.cls === ""
      ? "/* default — phosphor green */"
      : `.glass-viewport { --color-accent: var(--your-accent); }`;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="mono-label">Copy into your project</span>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto border border-line-2 bg-bg-2 p-4 text-left font-mono text-[12.5px] leading-relaxed text-ink">
        <code>{code}</code>
      </pre>
      <pre className="overflow-x-auto border border-line-2 bg-bg-2 p-3 text-left font-mono text-[12px] leading-relaxed text-ink-2">
        <code>{override}</code>
      </pre>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const { copied, copy } = useCopyToClipboard();
  return (
    <button
      type="button"
      onClick={() => void copy(text)}
      className="border border-line-2 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-ink-2 transition-colors hover:text-ink"
    >
      {copied ? "Copied ✓" : "Copy"}
    </button>
  );
}
