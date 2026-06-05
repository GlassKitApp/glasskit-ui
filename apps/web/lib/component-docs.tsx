import type { ReactNode } from "react";
import { Screen } from "@registry/ui/screen";
import { StatusBar } from "@registry/ui/status-bar";
import { Readout } from "@registry/ui/readout";
import { Cue } from "@registry/ui/cue";
import { Button } from "@registry/ui/button";
import { GlowIcon } from "@registry/ui/glow-icon";
import { List, ListRow } from "@registry/ui/list";
import { Progress } from "@registry/ui/progress";
import { AsyncView, Spinner } from "@registry/ui/async-view";
import { DirectionArrow } from "@registry/ui/direction-arrow";
import { Compass } from "@registry/ui/compass";
import { Reticle } from "@registry/ui/reticle";
import {
  HeartGlyph,
  NavGlyph,
  MessageGlyph,
  BatteryGlyph,
  ChevronGlyph,
} from "@/components/lens/icons";

export type PropRow = {
  name: string;
  type: string;
  default?: string;
  desc: string;
};

export type ComponentDoc = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  /** Inner lens content — the doc page wraps it in a <GlassViewport>. */
  preview: ReactNode;
  props: PropRow[];
  usage: string;
};

export const COMPONENT_DOCS: ComponentDoc[] = [
  {
    slug: "screen",
    name: "Screen",
    category: "Shell",
    summary:
      "The on-lens layout shell: a status region, a centered stage for the one task, and a cue region — with safe margins that keep the surface mostly black.",
    preview: (
      <Screen
        status={<StatusBar start="9:41" end="87%" />}
        cue={<Cue>One task per view</Cue>}
      >
        <Readout label="Pace" value="8'42" unit="/mi" />
      </Screen>
    ),
    props: [
      { name: "children", type: "ReactNode", desc: "The stage content." },
      { name: "status", type: "ReactNode", desc: "Top status row." },
      { name: "cue", type: "ReactNode", desc: "Bottom hint line." },
      { name: "className", type: "string", desc: "Extra classes." },
    ],
    usage: `<Screen
  status={<StatusBar start="9:41" end="87%" />}
  cue={<Cue>One task per view</Cue>}
>
  <Readout label="Pace" value="8'42" unit="/mi" />
</Screen>`,
  },
  {
    slug: "status-bar",
    name: "StatusBar",
    category: "Status",
    summary:
      "The glanceable top status row (a watchOS TimeText analog): time, battery, connection. Logical start/end slots so it mirrors correctly under RTL.",
    preview: (
      <Screen
        status={
          <StatusBar
            start="9:41"
            end={
              <>
                <GlowIcon size="sm" label="Battery">
                  <BatteryGlyph />
                </GlowIcon>
                87%
              </>
            }
          />
        }
      >
        <Cue>Status pinned to the top edge</Cue>
      </Screen>
    ),
    props: [
      { name: "start", type: "ReactNode", desc: "Inline-start content." },
      { name: "end", type: "ReactNode", desc: "Inline-end content." },
      { name: "className", type: "string", desc: "Extra classes." },
    ],
    usage: `<StatusBar start="9:41" end="87%" />`,
  },
  {
    slug: "readout",
    name: "Readout",
    category: "Display",
    summary:
      "A single-value complication: label + value + optional unit. The glanceable archetype — one number legible in a 1–2 second glance, with tabular numerals.",
    preview: (
      <Screen>
        <Readout label="Heart rate" value="128" unit="BPM" />
      </Screen>
    ),
    props: [
      { name: "label", type: "ReactNode", desc: "The metric label." },
      { name: "value", type: "ReactNode", desc: "The value (tabular numerals)." },
      { name: "unit", type: "ReactNode", desc: "Optional trailing unit." },
      {
        name: "emphasis",
        type: '"primary" | "secondary"',
        default: '"primary"',
        desc: "Luminance tier; primary is the brightest value on screen.",
      },
    ],
    usage: `<Readout label="Heart rate" value="128" unit="BPM" />`,
  },
  {
    slug: "cue",
    name: "Cue",
    category: "Display",
    summary:
      "A caption / hint line: what to do next, or a transient status. Dim by default; set tone='accent' for a live/green state. No glow on body text.",
    preview: (
      <Screen>
        <Cue tone="accent">Listening…</Cue>
        <Cue>Look at a sign to translate</Cue>
      </Screen>
    ),
    props: [
      { name: "children", type: "ReactNode", desc: "The hint text." },
      {
        name: "tone",
        type: '"default" | "accent"',
        default: '"default"',
        desc: "Accent turns it green for live states.",
      },
      { name: "icon", type: "ReactNode", desc: "Optional leading glyph." },
    ],
    usage: `<Cue tone="accent">Listening…</Cue>`,
  },
  {
    slug: "button",
    name: "Button",
    category: "Action",
    summary:
      "A D-pad-focusable action. Renders a real <button> with the focusable class, so useDpad walks it and activates it on Enter/Space. Edge + focus ring are emitted light, never fills.",
    preview: (
      <Screen>
        <div className="row">
          <Button variant="primary">Confirm</Button>
          <Button>Dismiss</Button>
        </div>
      </Screen>
    ),
    props: [
      { name: "children", type: "ReactNode", desc: "The label." },
      {
        name: "variant",
        type: '"primary" | "secondary"',
        default: '"secondary"',
        desc: "Primary brightens the edge.",
      },
      { name: "icon", type: "ReactNode", desc: "Optional leading glyph." },
      { name: "disabled", type: "boolean", desc: "Excluded from D-pad focus." },
      { name: "onClick", type: "() => void", desc: "Fires on Enter/Space/click." },
    ],
    usage: `<Button variant="primary" onClick={log}>
  Confirm
</Button>`,
  },
  {
    slug: "glow-icon",
    name: "GlowIcon",
    category: "Display",
    summary:
      "Wraps a stroke-only line-icon SVG and applies the two-tier luminance rule: inert = near-white, active = phosphor green with a faint glow. Token sizes, no inline style.",
    preview: (
      <Screen>
        <div className="row">
          <GlowIcon active size="lg" label="Active">
            <HeartGlyph />
          </GlowIcon>
          <GlowIcon size="lg" label="Inert">
            <NavGlyph />
          </GlowIcon>
        </div>
      </Screen>
    ),
    props: [
      { name: "children", type: "ReactNode", desc: "A stroke-based SVG." },
      { name: "active", type: "boolean", default: "false", desc: "Green + glow tier." },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        desc: "16 / 20 / 28px.",
      },
      { name: "label", type: "string", desc: "a11y label; omit for decorative." },
    ],
    usage: `<GlowIcon active size="lg" label="Heart rate">
  <HeartIcon />
</GlowIcon>`,
  },
  {
    slug: "list",
    name: "List",
    category: "Action",
    summary:
      "A vertical stack of focusable rows (watchOS list spirit). Keep it short — a glanceable HUD caps at 3–5 rows. Compose List with ListRow (leading glyph, label, trailing value).",
    preview: (
      <Screen>
        <List>
          <ListRow
            leading={
              <GlowIcon active size="sm">
                <NavGlyph />
              </GlowIcon>
            }
            trailing={
              <GlowIcon size="sm">
                <ChevronGlyph />
              </GlowIcon>
            }
          >
            Navigate
          </ListRow>
          <ListRow
            leading={
              <GlowIcon size="sm">
                <MessageGlyph />
              </GlowIcon>
            }
            trailing="2"
          >
            Messages
          </ListRow>
        </List>
      </Screen>
    ),
    props: [
      { name: "List · children", type: "ReactNode", desc: "ListRow elements." },
      { name: "ListRow · children", type: "ReactNode", desc: "The row label." },
      { name: "ListRow · leading", type: "ReactNode", desc: "Inline-start glyph." },
      { name: "ListRow · trailing", type: "ReactNode", desc: "Inline-end value." },
      { name: "ListRow · onClick", type: "() => void", desc: "Row activation." },
    ],
    usage: `<List>
  <ListRow leading={<GlowIcon size="sm"><NavIcon /></GlowIcon>}>
    Navigate
  </ListRow>
  <ListRow trailing="2">Messages</ListRow>
</List>`,
  },
  {
    slug: "progress",
    name: "Progress",
    category: "Display",
    summary:
      "Emitted progress in two shapes: a continuous linear bar (a native <progress>, so the fill needs no inline style; also covers countdowns) and discrete step-of-N dots for wizards.",
    preview: (
      <Screen>
        <Progress value={64} label="Downloading · 64%" />
        <Progress variant="step" value={2} max={4} />
      </Screen>
    ),
    props: [
      { name: "value", type: "number", desc: "Current value (clamped to [0, max])." },
      { name: "max", type: "number", default: "100", desc: "Total / step count." },
      {
        name: "variant",
        type: '"linear" | "step"',
        default: '"linear"',
        desc: "Continuous bar or step-of-N dots.",
      },
      { name: "label", type: "ReactNode", desc: "Optional caption." },
    ],
    usage: `<Progress value={64} label="Downloading · 64%" />
<Progress variant="step" value={2} max={4} />`,
  },
  {
    slug: "async-view",
    name: "AsyncView",
    category: "Status",
    summary:
      "The four-state async renderer every data screen needs: placeholder → loading → success / error. You own the async work and pass the status; AsyncView picks the view, with additive defaults.",
    preview: (
      <Screen>
        <AsyncView
          status="loading"
          loading={
            <div className="gk-async">
              <Spinner label="Loading" />
              <Cue>Loading route…</Cue>
            </div>
          }
        >
          {null}
        </AsyncView>
      </Screen>
    ),
    props: [
      {
        name: "status",
        type: '"idle" | "loading" | "success" | "error"',
        desc: "Which view to render.",
      },
      { name: "children", type: "ReactNode", desc: "Success content." },
      { name: "loading", type: "ReactNode", desc: "Override the default Spinner." },
      { name: "error", type: "ReactNode", desc: "Override the default error line." },
      { name: "placeholder", type: "ReactNode", desc: "Shown when idle." },
    ],
    usage: `<AsyncView status={status} error={<Cue>Couldn’t load</Cue>}>
  <Readout label="Heart rate" value={bpm} unit="BPM" />
</AsyncView>`,
  },
  {
    slug: "direction-arrow",
    name: "DirectionArrow",
    category: "Spatial",
    summary:
      "Points toward a real-world bearing. World-anchored: it rotates via an SVG transform attribute and is never mirrored under RTL — a flipped arrow points the wrong way.",
    preview: (
      <Screen>
        <DirectionArrow bearing={35} />
        <Readout label="Market St" value="320" unit="m" />
      </Screen>
    ),
    props: [
      {
        name: "bearing",
        type: "number",
        desc: "Target direction in degrees (0 = up/N, clockwise).",
      },
      { name: "label", type: "ReactNode", desc: "Optional caption." },
    ],
    usage: `// bearing from useGeolocation + the target heading
<DirectionArrow bearing={bearing} label="Market St" />`,
  },
  {
    slug: "compass",
    name: "Compass",
    category: "Spatial",
    summary:
      "A heading rose: North stays world-aligned while a fixed top marker shows where you face. World-anchored — never mirrored under RTL.",
    preview: (
      <Screen>
        <Compass heading={290} />
      </Screen>
    ),
    props: [
      {
        name: "heading",
        type: "number",
        desc: "Current facing in degrees (from useDeviceOrientation).",
      },
      { name: "label", type: "ReactNode", desc: "Optional caption." },
    ],
    usage: `const { alpha } = useDeviceOrientation();
<Compass heading={alpha ?? 0} />`,
  },
  {
    slug: "reticle",
    name: "Reticle",
    category: "Spatial",
    summary:
      "An aim-to-select target: four corner brackets framing the gaze center. Set active while dwelling on a hittable target to brighten it.",
    preview: (
      <Screen>
        <Reticle active label="Aim at a sign" />
        <Cue>Dwell to select</Cue>
      </Screen>
    ),
    props: [
      {
        name: "active",
        type: "boolean",
        default: "false",
        desc: "Brightens the brackets while dwelling on a target.",
      },
      { name: "label", type: "string", desc: "a11y label." },
    ],
    usage: `<Reticle active={isOnTarget} label="Aim at a sign" />`,
  },
];

export function getComponentDoc(slug: string): ComponentDoc | undefined {
  return COMPONENT_DOCS.find((d) => d.slug === slug);
}
