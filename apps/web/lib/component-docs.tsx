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
import { Toggle } from "@registry/ui/toggle";
import { Stepper } from "@registry/ui/stepper";
import { Segmented } from "@registry/ui/segmented";
import { Confirm } from "@registry/ui/confirm";
import { Badge } from "@registry/ui/badge";
import { StatusDot } from "@registry/ui/status-dot";
import { Meter } from "@registry/ui/meter";
import { StatGrid } from "@registry/ui/stat-grid";
import { Toast } from "@registry/ui/toast";
import { ErrorState } from "@registry/ui/error-state";
import { Heading } from "@registry/ui/heading";
import { Launcher } from "@registry/ui/launcher";
import { Deck } from "@registry/ui/deck";
import { QuickReplyChips } from "@registry/ui/quick-reply-chips";
import { Pin } from "@registry/ui/pin";
import { Callout } from "@registry/ui/callout";
import {
  HeartGlyph,
  NavGlyph,
  MessageGlyph,
  BatteryGlyph,
  ChevronGlyph,
  AlertGlyph,
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
  {
    slug: "toggle",
    name: "Toggle",
    category: "Action",
    summary:
      "A binary switch, D-pad-focusable. Controlled via checked + onChange. The knob slides on a logical margin, so it mirrors correctly under RTL.",
    preview: (
      <Screen>
        <Toggle checked label="Notifications" />
        <Toggle checked={false} label="Airplane mode" />
      </Screen>
    ),
    props: [
      { name: "checked", type: "boolean", desc: "On/off state (controlled)." },
      { name: "onChange", type: "(next: boolean) => void", desc: "Fires on toggle." },
      { name: "label", type: "ReactNode", desc: "Row label." },
      { name: "disabled", type: "boolean", desc: "Excluded from D-pad focus." },
    ],
    usage: `<Toggle
  label="Notifications"
  checked={on}
  onChange={setOn}
/>`,
  },
  {
    slug: "stepper",
    name: "Stepper",
    category: "Action",
    summary:
      "Adjust a value in discrete steps (glasses have no fine slider). The − and + are D-pad-focusable; bounds disable the ends. Controlled via value + onChange.",
    preview: (
      <Screen>
        <Stepper label="Brightness" value={3} min={1} max={5} unit="/ 5" />
      </Screen>
    ),
    props: [
      { name: "value", type: "number", desc: "Current value (controlled)." },
      { name: "onChange", type: "(next: number) => void", desc: "Fires on ± (clamped)." },
      { name: "min", type: "number", desc: "Lower bound (disables −)." },
      { name: "max", type: "number", desc: "Upper bound (disables +)." },
      { name: "step", type: "number", default: "1", desc: "Increment." },
      { name: "label / unit", type: "ReactNode", desc: "Caption / trailing unit." },
    ],
    usage: `<Stepper
  label="Brightness"
  value={value} min={1} max={5}
  onChange={setValue}
/>`,
  },
  {
    slug: "segmented",
    name: "Segmented",
    category: "Action",
    summary:
      "Pick one of a few options (a watchOS-style segmented control). Each segment is a D-pad-focusable radio; the selected one glows green. Keep it to 2–4 options.",
    preview: (
      <Screen>
        <Segmented
          value="map"
          options={[
            { value: "map", label: "Map" },
            { value: "list", label: "List" },
            { value: "ar", label: "AR" },
          ]}
        />
      </Screen>
    ),
    props: [
      {
        name: "options",
        type: "{ value, label }[]",
        desc: "The choices (value: string | number).",
      },
      { name: "value", type: "T", desc: "The selected value (controlled)." },
      { name: "onChange", type: "(next: T) => void", desc: "Fires on select." },
    ],
    usage: `<Segmented
  value={mode}
  onChange={setMode}
  options={[
    { value: "map", label: "Map" },
    { value: "list", label: "List" },
  ]}
/>`,
  },
  {
    slug: "confirm",
    name: "Confirm",
    category: "Action",
    summary:
      "A decision screen: a prompt plus a two-button action bar. Drop it into a Screen stage; useDpad seeds focus on the primary action.",
    preview: (
      <Screen>
        <Confirm
          title="End workout?"
          message="Your route so far will be saved."
          confirmLabel="End"
        />
      </Screen>
    ),
    props: [
      { name: "title", type: "ReactNode", desc: "The question." },
      { name: "message", type: "ReactNode", desc: "Supporting detail." },
      {
        name: "confirmLabel / cancelLabel",
        type: "ReactNode",
        default: '"Confirm" / "Cancel"',
        desc: "Button labels.",
      },
      {
        name: "onConfirm / onCancel",
        type: "() => void",
        desc: "Action handlers.",
      },
    ],
    usage: `<Confirm
  title="End workout?"
  message="Your route so far will be saved."
  confirmLabel="End"
  onConfirm={end}
  onCancel={dismiss}
/>`,
  },
  {
    slug: "badge",
    name: "Badge",
    category: "Display",
    summary:
      "A small count or status pill. Pure display — hairline by default, accent tone for the one thing that should draw the eye (emitted green, never a dark-on-light fill).",
    preview: (
      <Screen>
        <div className="row">
          <Badge>3</Badge>
          <Badge tone="accent">LIVE</Badge>
        </div>
      </Screen>
    ),
    props: [
      { name: "children", type: "ReactNode", desc: "Count or short label." },
      {
        name: "tone",
        type: '"default" | "accent"',
        default: '"default"',
        desc: "Accent glows green.",
      },
    ],
    usage: `<Badge tone="accent">LIVE</Badge>`,
  },
  {
    slug: "status-dot",
    name: "StatusDot",
    category: "Status",
    summary:
      "A glanceable sensor / permission / connection indicator. With one accent on the lens, state reads from luminance + motion: on = steady, live = pulsing, off = dim.",
    preview: (
      <Screen>
        <StatusDot tone="live" label="GPS lock" />
        <StatusDot tone="on" label="Mic ready" />
        <StatusDot tone="off" label="Offline" />
      </Screen>
    ),
    props: [
      {
        name: "tone",
        type: '"on" | "live" | "off"',
        default: '"on"',
        desc: "Steady / pulsing / dim.",
      },
      { name: "label", type: "ReactNode", desc: "Optional caption." },
    ],
    usage: `<StatusDot tone="live" label="GPS lock" />`,
  },
  {
    slug: "meter",
    name: "Meter",
    category: "Display",
    summary:
      "A bounded ring gauge for a level (battery, signal, effort) — distinct from Progress, which tracks task completion. The arc fills via an SVG stroke-dashoffset; value is clamped to [0, max].",
    preview: (
      <Screen>
        <Meter value={72} max={100} label="Effort" unit="%" />
      </Screen>
    ),
    props: [
      { name: "value", type: "number", desc: "Current level (clamped to [0, max])." },
      { name: "max", type: "number", default: "100", desc: "Upper bound." },
      { name: "label", type: "ReactNode", desc: "Caption under the value." },
      { name: "unit", type: "ReactNode", desc: "Trailing unit." },
    ],
    usage: `<Meter value={72} max={100} label="Effort" unit="%" />`,
  },
  {
    slug: "stat-grid",
    name: "StatGrid",
    category: "Display",
    summary:
      "A compact grid of readouts for a multi-metric glance (a complication cluster). Pure display, tabular numerals. Keep it to 2–4 cells.",
    preview: (
      <Screen>
        <StatGrid
          items={[
            { label: "Pace", value: "8'42", unit: "/mi" },
            { label: "Heart", value: 128, unit: "bpm" },
            { label: "Dist", value: "3.2", unit: "km" },
            { label: "Time", value: "18:40" },
          ]}
        />
      </Screen>
    ),
    props: [
      {
        name: "items",
        type: "{ label, value, unit? }[]",
        desc: "The metrics to show.",
      },
    ],
    usage: `<StatGrid items={[
  { label: "Pace", value: "8'42", unit: "/mi" },
  { label: "Heart", value: 128, unit: "bpm" },
]} />`,
  },
  {
    slug: "toast",
    name: "Toast",
    category: "Status",
    summary:
      "A transient notice that animates in with a brief luminance rise (never a modal scrim). Controlled via open; you own the auto-dismiss timer.",
    preview: (
      <Screen>
        <Toast open tone="accent">
          Workout saved
        </Toast>
      </Screen>
    ),
    props: [
      { name: "open", type: "boolean", desc: "Render the toast (else nothing)." },
      { name: "children", type: "ReactNode", desc: "The message." },
      {
        name: "tone",
        type: '"default" | "accent"',
        default: '"default"',
        desc: "Accent adds a green glow.",
      },
    ],
    usage: `<Toast open={saved} tone="accent">
  Workout saved
</Toast>`,
  },
  {
    slug: "error-state",
    name: "ErrorState",
    category: "Status",
    summary:
      "A recoverable error screen: optional glyph + title + message + a retry action. No red — the lens has one accent, so the failure reads from the words. Pairs with AsyncView's error slot.",
    preview: (
      <Screen>
        <ErrorState
          icon={
            <GlowIcon size="lg" label="Error">
              <AlertGlyph />
            </GlowIcon>
          }
          title="No signal"
          message="Move to an open area and try again."
        />
      </Screen>
    ),
    props: [
      { name: "title", type: "ReactNode", default: '"Something went wrong"', desc: "The headline." },
      { name: "message", type: "ReactNode", desc: "Supporting detail." },
      { name: "icon", type: "ReactNode", desc: "Optional leading glyph." },
      { name: "onRetry", type: "() => void", desc: "Shows a retry button when set." },
      { name: "retryLabel", type: "ReactNode", default: '"Retry"', desc: "Retry button label." },
    ],
    usage: `<ErrorState
  title="No signal"
  message="Move to an open area and try again."
  onRetry={refetch}
/>`,
  },
  {
    slug: "heading",
    name: "Heading",
    category: "Display",
    summary:
      "A screen/section title with an optional green eyebrow above it. Pure display — one heading per view keeps the glance cheap.",
    preview: (
      <Screen>
        <Heading eyebrow="Workout">Morning Run</Heading>
      </Screen>
    ),
    props: [
      { name: "children", type: "ReactNode", desc: "The title." },
      { name: "eyebrow", type: "ReactNode", desc: "Small tracked label above." },
    ],
    usage: `<Heading eyebrow="Workout">Morning Run</Heading>`,
  },
  {
    slug: "launcher",
    name: "Launcher",
    category: "Navigation",
    summary:
      "The app grid: the entry screen for a multi-app surface. Cards are D-pad-focusable; keep it to ~4 apps so the whole grid is one glance.",
    preview: (
      <Screen>
        <Launcher
          apps={[
            {
              id: "nav",
              label: "Navigate",
              tagline: "320 m",
              icon: (
                <GlowIcon active>
                  <NavGlyph />
                </GlowIcon>
              ),
            },
            {
              id: "msg",
              label: "Messages",
              tagline: "2 new",
              icon: (
                <GlowIcon>
                  <MessageGlyph />
                </GlowIcon>
              ),
            },
          ]}
        />
      </Screen>
    ),
    props: [
      {
        name: "apps",
        type: "{ id, label, tagline?, icon?, onSelect? }[]",
        desc: "The apps to show as focusable cards.",
      },
    ],
    usage: `<Launcher apps={[
  { id: "nav", label: "Navigate", tagline: "320 m",
    icon: <GlowIcon active><NavIcon /></GlowIcon>, onSelect: openNav },
  { id: "msg", label: "Messages", tagline: "2 new",
    icon: <GlowIcon><MessageIcon /></GlowIcon>, onSelect: openMessages },
]} />`,
  },
  {
    slug: "deck",
    name: "Deck",
    category: "Navigation",
    summary:
      "A horizontal paged flow (wizard / onboarding). Controlled via index; shows one page with step dots beneath. Pages advance on pinch / D-pad — never scroll.",
    preview: (
      <Screen>
        <Deck index={1}>
          <Heading eyebrow="Step 1">Connect band</Heading>
          <Heading eyebrow="Step 2">Calibrate</Heading>
          <Heading eyebrow="Step 3">Ready</Heading>
        </Deck>
      </Screen>
    ),
    props: [
      { name: "index", type: "number", desc: "The current page (clamped)." },
      { name: "children", type: "ReactNode", desc: "One node per page." },
    ],
    usage: `<Deck index={step}>
  <OnboardConnect />
  <OnboardCalibrate />
  <OnboardReady />
</Deck>`,
  },
  {
    slug: "quick-reply-chips",
    name: "QuickReplyChips",
    category: "Action",
    summary:
      "Tappable canned replies (the comms job — there is no keyboard on the lens, text is voice). Each chip is D-pad-focusable. Keep the set short and glanceable.",
    preview: (
      <Screen>
        <Cue>&ldquo;Running late&rdquo;</Cue>
        <QuickReplyChips options={["On my way", "5 min", "Call me"]} />
      </Screen>
    ),
    props: [
      { name: "options", type: "string[]", desc: "The canned replies." },
      { name: "onSelect", type: "(reply: string) => void", desc: "Fires on tap." },
    ],
    usage: `<QuickReplyChips
  options={["On my way", "5 min", "Call me"]}
  onSelect={send}
/>`,
  },
  {
    slug: "pin",
    name: "Pin",
    category: "Spatial",
    summary:
      "A world-anchored waypoint marker (ring + dot, name + distance above) placed at a projected screen point. World-anchored: positioned by an SVG transform attribute and never mirrored under RTL.",
    preview: (
      <Pin x={50} y={48} label="Blue Bottle" distance="120 m" />
    ),
    props: [
      { name: "x / y", type: "number", desc: "0–100, % of the lens (you project from the world)." },
      { name: "label", type: "ReactNode", desc: "Place name." },
      { name: "distance", type: "ReactNode", desc: "Optional distance." },
    ],
    usage: `// x/y projected from the world position each frame
<Pin x={x} y={y} label="Blue Bottle" distance="120 m" />`,
  },
  {
    slug: "callout",
    name: "Callout",
    category: "Spatial",
    summary:
      "A world-object annotation: an anchor + a vertical leader up to an emitted label (no box — additive translates the card to line + type). World-anchored, never mirrored.",
    preview: (
      <Callout x={50} y={56} label="Powell St" detail="Muni · 3 min" />
    ),
    props: [
      { name: "x / y", type: "number", desc: "0–100, % of the lens." },
      { name: "label", type: "ReactNode", desc: "The annotation label." },
      { name: "detail", type: "ReactNode", desc: "Optional second line." },
    ],
    usage: `<Callout x={x} y={y} label="Powell St" detail="Muni · 3 min" />`,
  },
];

export function getComponentDoc(slug: string): ComponentDoc | undefined {
  return COMPONENT_DOCS.find((d) => d.slug === slug);
}
