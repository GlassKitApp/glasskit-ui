"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/lib/use-copy-to-clipboard";
import { LensStage } from "@/components/lens/lens-stage";
import { DpadProvider } from "@/components/lens/dpad-provider";
import { DevicePreview } from "@/components/device-preview";
import { PLAYGROUND_DEMOS as DEMOS } from "@/lib/playground-demos";
import { deriveRamp, rampCss } from "@/lib/theme-ramp";

/** Per-demo "run on glasses" payload, generated server-side (QR is async). */
export type DemoDevice = { qr: string; deepLink: string; url: string };

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

  { id: "custom", label: "Custom", cls: "", sw: "", ramp: null },
];

const RAMP_TOKENS = [
  "--accent-active",
  "--accent",
  "--accent-muted",
  "--accent-faint",
  "--accent-grad-hi",
  "--accent-grad-lo",
  "--accent-glow",
  "--color-accent",
] as const;

export function PlaygroundClient({
  devices = {},
}: {
  /** demo id → "run on glasses" QR/deep-link, generated server-side. */
  devices?: Record<string, DemoDevice>;
}) {
  const [demoId, setDemoId] = useState(DEMOS[0]!.id);
  const [accentId, setAccentId] = useState(ACCENTS[0]!.id);
  const [customHex, setCustomHex] = useState("#4cd9a6");
  const stage = useRef<HTMLDivElement>(null);

  const demo = DEMOS.find((d) => d.id === demoId)!;
  const accent = ACCENTS.find((a) => a.id === accentId)!;
  const customRamp = useMemo(() => deriveRamp(customHex), [customHex]);

  // "Custom" derives the whole ramp from one hex and applies it straight on
  // the lens element (inline style beats the stylesheet defaults declared on
  // .glass-viewport itself — the same reason presets target
  // `.accent-x .glass-viewport`). Imperative setProperty, the sanctioned
  // exception to the no-inline-CSS rule. Presets clear it.
  useEffect(() => {
    const lens = stage.current?.querySelector<HTMLElement>(".glass-viewport");
    if (!lens) return;
    if (accentId === "custom") {
      const r = customRamp;
      const values = [
        r.active,
        r.accent,
        r.muted,
        r.faint,
        r.gradHi,
        r.gradLo,
        r.glow,
        r.accent,
      ];
      RAMP_TOKENS.forEach((t, i) => lens.style.setProperty(t, values[i]!));
    } else {
      RAMP_TOKENS.forEach((t) => lens.style.removeProperty(t));
    }
  }, [accentId, customRamp, demoId]);

  return (
    <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[1fr_minmax(0,28rem)]">
      {/* Preview + controls */}
      <div className="flex flex-col gap-5">
        <div ref={stage} className={accent.cls}>
          <DpadProvider key={demo.id}>
            <LensStage
              caption={demo.caption}
              device={
                devices[demo.id] ? (
                  <DevicePreview
                    qr={devices[demo.id]!.qr}
                    deepLink={devices[demo.id]!.deepLink}
                    url={devices[demo.id]!.url}
                    appName={demo.label}
                  />
                ) : undefined
              }
            >
              {demo.node}
            </LensStage>
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
                {a.id === "custom" ? (
                  <span
                    className="h-3 w-3 rounded-full"
                    ref={(el) => el?.style.setProperty("background", customHex)}
                  />
                ) : (
                  <span className={cn("h-3 w-3 rounded-full", a.sw)} />
                )}
                {a.label}
              </button>
            ))}
            {accentId === "custom" ? (
              <input
                type="color"
                aria-label="Custom accent color"
                value={customHex}
                onChange={(e) => setCustomHex(e.target.value)}
                className="h-8 w-10 cursor-pointer border border-line-2 bg-transparent p-0.5"
              />
            ) : null}
          </div>
          {accentId === "custom" ? (
            <p className="text-[13px] text-ink-3">
              One hex in — the full 7-token ramp out (OKLab lightness steps,
              chroma falls off toward the dark end).
            </p>
          ) : null}
        </div>
      </div>

      {/* Code panel */}
      <CodePanel code={demo.code} accent={accent} customRamp={customRamp} />
    </div>
  );
}

function CodePanel({
  code,
  accent,
  customRamp,
}: {
  code: string;
  accent: (typeof ACCENTS)[number];
  customRamp: ReturnType<typeof deriveRamp>;
}) {
  const override =
    accent.id === "custom"
      ? rampCss(customRamp)
      : !accent.ramp
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
