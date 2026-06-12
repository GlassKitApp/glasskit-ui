"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/lib/use-copy-to-clipboard";
import { LensStage } from "@/components/lens/lens-stage";
import { DpadProvider } from "@/components/lens/dpad-provider";
import { HeartRateDemo } from "@/components/lens/heart-rate-demo";
import { MenuDemo } from "@/components/lens/menu-demo";
import { SyncDemo } from "@/components/lens/sync-demo";
import { NavigateDemo } from "@/components/lens/navigate-demo";
import { SettingsDemo } from "@/components/lens/settings-demo";
import { StatsDemo } from "@/components/lens/stats-demo";
import { LauncherDemo } from "@/components/lens/launcher-demo";
import { ExploreDemo } from "@/components/lens/explore-demo";

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
    caption: "Screen · Readout · Cue · Button · GlowIcon",
    node: <HeartRateDemo />,
    code: `<GlassViewport>
  <Screen cue={<Cue emphasis="accent">Recording · pinch to log</Cue>}>
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
  <Screen cue={<Cue>Swipe to browse · pinch to open</Cue>}>
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
  <Screen cue={<Cue emphasis="accent">Keep glasses on</Cue>}>
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
  {
    id: "navigate",
    label: "Navigate",
    caption: "DirectionArrow (world-anchored) · Readout · Cue",
    node: <NavigateDemo />,
    code: `<GlassViewport>
  <Screen cue={<Cue emphasis="accent">Turn right onto Market St</Cue>}>
    {/* self-wired: useGeolocation + useDeviceOrientation steer it */}
    <DirectionArrow target={{ lat: 37.7955, lon: -122.3937 }} />
    {/* or control it yourself: <DirectionArrow bearing={35} /> */}
    <Readout label="Market St" value="320" unit="m" />
  </Screen>
</GlassViewport>`,
  },
  {
    id: "settings",
    label: "Settings",
    caption: "Stepper · Toggle · Segmented (live — arrow + Enter)",
    node: <SettingsDemo />,
    code: `function Settings() {
  const [brightness, setBrightness] = useState(3);
  const [notify, setNotify] = useState(true);
  const [mode, setMode] = useState("map");

  return (
    <Screen cue={<Cue>Pinch to go back</Cue>}>
      <Stepper label="Brightness" value={brightness}
               min={1} max={5} onChange={setBrightness} />
      <Toggle label="Notifications" checked={notify} onChange={setNotify} />
      <Segmented value={mode} onChange={setMode}
        options={[{ value: "map", label: "Map" }, { value: "list", label: "List" }]} />
    </Screen>
  );
}`,
  },
  {
    id: "stats",
    label: "Stats",
    caption: "StatusDot · Meter · StatGrid",
    node: <StatsDemo />,
    code: `<GlassViewport>
  <Screen cue={<Cue icon={<StatusDot status="live" label="GPS" />}>3.2 km · 18:40</Cue>}>
    <Meter value={72} max={100} label="Effort" unit="%" />
    <StatGrid items={[
      { label: "Pace", value: "8'42", unit: "/mi" },
      { label: "Heart", value: 128, unit: "bpm" },
    ]} />
  </Screen>
</GlassViewport>`,
  },
  {
    id: "launcher",
    label: "Launcher",
    caption: "Launcher app grid · GlowIcon",
    node: <LauncherDemo />,
    code: `<Screen>
  <Launcher apps={[
    { id: "nav", label: "Navigate", tagline: "320 m",
      icon: <GlowIcon active><NavIcon /></GlowIcon>, onSelect: openNav },
    { id: "msg", label: "Messages", tagline: "2 new",
      icon: <GlowIcon><MessageIcon /></GlowIcon>, onSelect: openMessages },
    // …
  ]} />
</Screen>`,
  },
  {
    id: "explore",
    label: "Explore",
    caption: "Pin + Callout (world-anchored) · Reticle",
    node: <ExploreDemo />,
    code: `<GlassViewport>
  <Screen cue={<Cue icon={<StatusDot status="live" label="AR" />}>Center a pin to select</Cue>}>
    <Reticle />
  </Screen>
  {/* x/y are 0–100% projected from the world position */}
  <Pin x={72} y={34} label="Blue Bottle" distance="120 m" />
  <Callout x={26} y={62} label="Powell St" detail="Muni · 3 min" />
</GlassViewport>`,
  },
];

// `ramp` mirrors the .accent-* classes in globals.css — the override snippet
// must teach the real tokens, so keep the two in sync.
const ACCENTS = [
  { id: "blue", label: "Blue", cls: "", sw: "sw-blue", ramp: null },
  {
    id: "cyan",
    label: "Cyan",
    cls: "accent-cyan",
    sw: "sw-cyan",
    ramp: {
      active: "#82e1f2",
      accent: "#34c8e6",
      muted: "#1f7d92",
      faint: "#133f4a",
      gradHi: "#48cde8",
      gradLo: "#2ba6c0",
      glow: "rgba(43, 166, 192, 0.6)",
    },
  },
  {
    id: "amber",
    label: "Amber",
    cls: "accent-amber",
    sw: "sw-amber",
    ramp: {
      active: "#ffca6b",
      accent: "#f5a623",
      muted: "#a06d12",
      faint: "#4d350a",
      gradHi: "#f6af39",
      gradLo: "#cf8c1b",
      glow: "rgba(207, 140, 27, 0.6)",
    },
  },
  {
    id: "violet",
    label: "Violet",
    cls: "accent-violet",
    sw: "sw-violet",
    ramp: {
      active: "#c4baff",
      accent: "#9b8cff",
      muted: "#5d52a6",
      faint: "#2f2a55",
      gradHi: "#a597ff",
      gradLo: "#7f72d7",
      glow: "rgba(127, 114, 215, 0.6)",
    },
  },
  {
    id: "white",
    label: "Mono",
    cls: "accent-white",
    sw: "sw-white",
    ramp: {
      active: "#ffffff",
      accent: "#e9ebee",
      muted: "#9aa0a6",
      faint: "#3a3f46",
      gradHi: "#7d8694",
      gradLo: "#555d68",
      glow: "rgba(85, 93, 104, 0.6)",
    },
  },
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
  const override = !accent.ramp
    ? "/* default — blue */"
    : `.glass-viewport {
  --accent-active: ${accent.ramp.active};
  --accent: ${accent.ramp.accent};
  --accent-muted: ${accent.ramp.muted};
  --accent-faint: ${accent.ramp.faint};
  --accent-grad-hi: ${accent.ramp.gradHi};
  --accent-grad-lo: ${accent.ramp.gradLo};
  --accent-glow: ${accent.ramp.glow};
}`;

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
