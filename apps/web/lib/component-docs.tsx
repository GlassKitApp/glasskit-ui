import type { ReactNode } from "react";
import { Screen } from "@registry/ui/screen";
import { Readout } from "@registry/ui/readout";
import { Cue } from "@registry/ui/cue";
import { Button } from "@registry/ui/button";
import { GlowIcon } from "@registry/ui/glow-icon";
import { List, ListRow } from "@registry/ui/list";
import { Progress } from "@registry/ui/progress";
import { AsyncView, Spinner } from "@registry/ui/async-view";
import { DirectionArrow } from "@registry/ui/direction-arrow";
import { Compass } from "@registry/ui/compass";
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
import { EmptyState } from "@registry/ui/empty-state";
import { Timer } from "@registry/ui/timer";
import { Heading } from "@registry/ui/heading";
import { Launcher } from "@registry/ui/launcher";
import { Deck } from "@registry/ui/deck";
import { QuickReplyChips } from "@registry/ui/quick-reply-chips";
import { Pin } from "@registry/ui/pin";
import { Callout } from "@registry/ui/callout";
import { MapView } from "@registry/ui/map-view";
import { BAKED_ROUTES } from "@/components/lens/map-routes";
import { Avatar } from "@registry/ui/avatar";
import { NotificationCard } from "@registry/ui/notification-card";
import { NowPlaying } from "@registry/ui/now-playing";
import { AssistantOrb } from "@registry/ui/assistant-orb";
import { MessageThread, ChatBubble } from "@registry/ui/chat-bubble";
import { CallCard } from "@registry/ui/call-card";
import { MediaThumb } from "@registry/ui/media-thumb";
import { MediaGalleryDemo } from "@/components/lens/media-gallery-demo";
import { MediaGridDemo } from "@/components/lens/media-grid-demo";
import { Pressable } from "@registry/ui/pressable";
import { Tabs } from "@registry/ui/tabs";
import { Clock } from "@registry/ui/clock";
import { WeatherTile } from "@registry/ui/weather-tile";
import { Slider } from "@registry/ui/slider";
import { TextField } from "@registry/ui/text-field";
import { ComposeFlow } from "@registry/ui/compose-flow";
import { PermissionPrompt } from "@registry/ui/permission-prompt";
import {
  HeartGlyph,
  NavGlyph,
  MessageGlyph,
  MusicGlyph,
  ChevronGlyph,
  AlertGlyph,
  BatteryGlyph,
  CheckGlyph,
  PhoneGlyph,
  PhoneOffGlyph,
  SunGlyph,
  VolumeGlyph,
  MicGlyph,
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
  /** Inner lens content; the doc page wraps it in a <GlassViewport>. */
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
      "The on-lens layout shell: a status region, a centered stage for the one task, and a cue region, with safe margins that keep the surface mostly black.",
    preview: (
      <Screen cue={<Cue>One task per view</Cue>}>
        <Readout label="Pace" value="8'42" unit="/mi" />
      </Screen>
    ),
    props: [
      { name: "children", type: "ReactNode", desc: "The stage content." },
      { name: "status", type: "ReactNode", desc: "Optional top region." },
      { name: "cue", type: "ReactNode", desc: "Bottom hint line." },
      { name: "className", type: "string", desc: "Extra classes." },
    ],
    usage: `<Screen cue={<Cue>One task per view</Cue>}>
  <Readout label="Pace" value="8'42" unit="/mi" />
</Screen>`,
  },
  {
    slug: "readout",
    name: "Readout",
    category: "Display",
    summary:
      "A single-value complication: label, value, and optional unit. The glanceable archetype: one number legible in a 1–2 second glance, with tabular numerals.",
    preview: (
      <Screen>
        <Readout label="Heart rate" value="128" unit="BPM" />
      </Screen>
    ),
    props: [
      { name: "label", type: "ReactNode", desc: "The metric label." },
      {
        name: "value",
        type: "ReactNode",
        desc: "The value (tabular numerals).",
      },
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
      "A caption / hint line: what to do next, or a transient status. Dim by default; set emphasis='accent' for a live state. No glow on body text.",
    preview: (
      <Screen>
        <Cue emphasis="accent">Listening…</Cue>
        <Cue>Look at a sign to translate</Cue>
      </Screen>
    ),
    props: [
      { name: "children", type: "ReactNode", desc: "The hint text." },
      {
        name: "emphasis",
        type: '"default" | "accent"',
        default: '"default"',
        desc: "Accent highlights it for live states.",
      },
      { name: "icon", type: "ReactNode", desc: "Optional leading glyph." },
    ],
    usage: `<Cue emphasis="accent">Listening…</Cue>`,
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
      {
        name: "onClick",
        type: "() => void",
        desc: "Fires on Enter/Space/click.",
      },
      {
        name: "initialFocus",
        type: "boolean",
        default: "false",
        desc: "Seed the D-pad ring here when the screen mounts (data-autofocus).",
      },
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
      "Wraps a stroke-only line-icon SVG and applies the two-tier luminance rule: inert = near-white, active = the accent with a faint glow, or an iOS-style gradient plate via `plate`. Token sizes, no inline style.",
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
      {
        name: "active",
        type: "boolean",
        default: "false",
        desc: "Accent + glow tier.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        desc: "16 / 20 / 28px.",
      },
      {
        name: "label",
        type: "string",
        desc: "a11y label; omit for decorative.",
      },
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
      "A vertical stack of focusable rows (watchOS list spirit). Keep it short: a glanceable HUD caps at 3–5 rows. Compose List with ListRow (leading glyph, label, trailing value).",
    preview: (
      <Screen>
        <List>
          <ListRow
            leading={
              <GlowIcon plate tone="blue" size="sm">
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
              <GlowIcon plate tone="green" size="sm">
                <MessageGlyph />
              </GlowIcon>
            }
            trailing="2"
          >
            Messages
          </ListRow>
          <ListRow
            leading={
              <GlowIcon plate tone="peach" size="sm">
                <MusicGlyph />
              </GlowIcon>
            }
            trailing={
              <GlowIcon size="sm">
                <ChevronGlyph />
              </GlowIcon>
            }
          >
            Music
          </ListRow>
          <ListRow
            leading={
              <GlowIcon plate tone="violet" size="sm">
                <HeartGlyph />
              </GlowIcon>
            }
            trailing="128"
          >
            Vitals
          </ListRow>
          <ListRow
            leading={
              <GlowIcon plate tone="cyan" size="sm">
                <NavGlyph />
              </GlowIcon>
            }
            trailing={
              <GlowIcon size="sm">
                <ChevronGlyph />
              </GlowIcon>
            }
          >
            Maps
          </ListRow>
          <ListRow
            leading={
              <GlowIcon plate tone="amber" size="sm">
                <AlertGlyph />
              </GlowIcon>
            }
            trailing={
              <GlowIcon size="sm">
                <ChevronGlyph />
              </GlowIcon>
            }
          >
            Alerts
          </ListRow>
          <ListRow
            leading={
              <GlowIcon plate tone="cyan" size="sm">
                <BatteryGlyph />
              </GlowIcon>
            }
            trailing="87%"
          >
            Battery
          </ListRow>
          <ListRow
            leading={
              <GlowIcon plate tone="green" size="sm">
                <CheckGlyph />
              </GlowIcon>
            }
            trailing={
              <GlowIcon size="sm">
                <ChevronGlyph />
              </GlowIcon>
            }
          >
            Updates
          </ListRow>
        </List>
      </Screen>
    ),
    props: [
      { name: "List · children", type: "ReactNode", desc: "ListRow elements." },
      { name: "ListRow · children", type: "ReactNode", desc: "The row label." },
      {
        name: "ListRow · leading",
        type: "ReactNode",
        desc: "Inline-start glyph.",
      },
      {
        name: "ListRow · trailing",
        type: "ReactNode",
        desc: "Inline-end value.",
      },
      {
        name: "ListRow · onClick",
        type: "() => void",
        desc: "Row activation.",
      },
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
      {
        name: "value",
        type: "number",
        desc: "Current value (clamped to [0, max]).",
      },
      {
        name: "max",
        type: "number",
        default: "100",
        desc: "Total / step count.",
      },
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
      "The four-state async renderer every data screen needs: placeholder → loading → success / error. You own the async work and pass the status; AsyncView picks the view, with lens-ready defaults.",
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
      {
        name: "loading",
        type: "ReactNode",
        desc: "Override the default Spinner.",
      },
      {
        name: "error",
        type: "ReactNode",
        desc: "Override the default error line.",
      },
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
      "Points toward a real-world bearing. World-anchored: it rotates via an SVG transform attribute and is never mirrored under RTL, since a flipped arrow points the wrong way.",
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
        desc: "Controlled screen angle in degrees (0 = up, clockwise). Always wins.",
      },
      {
        name: "target",
        type: "{ lat, lon }",
        desc: "Self-connects: live GPS + head orientation aim the needle at this coordinate.",
      },
      { name: "label", type: "ReactNode", desc: "Optional caption." },
    ],
    usage: `// self-wired: live geolocation + head orientation
<DirectionArrow target={{ lat: 37.7749, lon: -122.4194 }} label="Market St" />

// or controlled, if you computed the angle yourself
<DirectionArrow bearing={bearing} label="Market St" />`,
  },
  {
    slug: "compass",
    name: "Compass",
    category: "Spatial",
    summary:
      "A heading rose: North stays world-aligned while a fixed top marker shows where you face. World-anchored, never mirrored under RTL.",
    preview: (
      <Screen>
        <Compass heading={290} />
      </Screen>
    ),
    props: [
      {
        name: "heading",
        type: "number",
        desc: "Controlled heading in degrees. Omit to read the live head orientation.",
      },
      { name: "label", type: "ReactNode", desc: "Optional caption." },
    ],
    usage: `// self-wired: follows useDeviceOrientation
<Compass />

// or controlled (demos, your own sensor fusion)
<Compass heading={290} />`,
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
      {
        name: "onChange",
        type: "(next: boolean) => void",
        desc: "Fires on toggle.",
      },
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
      {
        name: "onChange",
        type: "(next: number) => void",
        desc: "Fires on ± (clamped).",
      },
      { name: "min", type: "number", desc: "Lower bound (disables −)." },
      { name: "max", type: "number", desc: "Upper bound (disables +)." },
      { name: "step", type: "number", default: "1", desc: "Increment." },
      {
        name: "label / unit",
        type: "ReactNode",
        desc: "Caption / trailing unit.",
      },
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
      "Pick one of a few options (a watchOS-style segmented control). Each segment is a D-pad-focusable radio; the selected one lifts with the accent. Keep it to 2–4 options.",
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
      "A decision screen: a prompt plus a two-button action bar. Drop it into a Screen stage; useDpad seeds focus on the primary action. destructive seeds the ring on cancel, because a blind pinch must never destroy anything; the ring is scoped to the decision.",
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
      {
        name: "destructive",
        type: "boolean",
        default: "false",
        desc: "Irreversible action. Seed the D-pad ring on cancel, not confirm.",
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
      "A small count or status pill. Pure display: hairline by default, accent tone for the one thing that should draw the eye (the accent gradient, for the one thing that needs the eye).",
    preview: (
      <Screen>
        <div className="row">
          <Badge>3</Badge>
          <Badge emphasis="accent">LIVE</Badge>
        </div>
      </Screen>
    ),
    props: [
      { name: "children", type: "ReactNode", desc: "Count or short label." },
      {
        name: "emphasis",
        type: '"default" | "accent"',
        default: '"default"',
        desc: "Accent gradient tone.",
      },
    ],
    usage: `<Badge emphasis="accent">LIVE</Badge>`,
  },
  {
    slug: "status-dot",
    name: "StatusDot",
    category: "Status",
    summary:
      "A glanceable sensor / permission / connection indicator. With one accent on the lens, state reads from luminance + motion: on = steady, live = pulsing, off = dim.",
    preview: (
      <Screen>
        <StatusDot status="live" label="GPS lock" />
        <StatusDot status="on" label="Mic ready" />
        <StatusDot status="off" label="Offline" />
      </Screen>
    ),
    props: [
      {
        name: "status",
        type: '"on" | "live" | "off"',
        default: '"on"',
        desc: "Steady / pulsing / dim.",
      },
      { name: "label", type: "ReactNode", desc: "Optional caption." },
    ],
    usage: `<StatusDot status="live" label="GPS lock" />`,
  },
  {
    slug: "meter",
    name: "Meter",
    category: "Display",
    summary:
      "A bounded ring gauge for a level (battery, signal, effort), distinct from Progress, which tracks task completion. The arc fills via an SVG stroke-dashoffset; value is clamped to [0, max].",
    preview: (
      <Screen>
        <Meter value={72} max={100} label="Effort" unit="%" />
      </Screen>
    ),
    props: [
      {
        name: "value",
        type: "number",
        desc: "Current level (clamped to [0, max]).",
      },
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
        <Toast open emphasis="accent">
          Workout saved
        </Toast>
      </Screen>
    ),
    props: [
      {
        name: "open",
        type: "boolean",
        desc: "Render the toast (else nothing).",
      },
      { name: "children", type: "ReactNode", desc: "The message." },
      {
        name: "emphasis",
        type: '"default" | "accent"',
        default: '"default"',
        desc: "Accent adds a soft glow.",
      },
    ],
    usage: `<Toast open={saved} emphasis="accent">
  Workout saved
</Toast>`,
  },
  {
    slug: "error-state",
    name: "ErrorState",
    category: "Status",
    summary:
      "A recoverable error screen: optional glyph, title, message, and a retry action. No red: the lens has one accent, so the failure reads from the words. Pairs with AsyncView's error slot.",
    preview: (
      <Screen>
        <ErrorState
          icon={
            <GlowIcon size="lg" plate tone="amber" label="Error">
              <AlertGlyph />
            </GlowIcon>
          }
          title="No signal"
          message="Move to an open area and try again."
        />
      </Screen>
    ),
    props: [
      {
        name: "title",
        type: "ReactNode",
        default: '"Something went wrong"',
        desc: "The headline.",
      },
      { name: "message", type: "ReactNode", desc: "Supporting detail." },
      { name: "icon", type: "ReactNode", desc: "Optional leading glyph." },
      {
        name: "onRetry",
        type: "() => void",
        desc: "Shows a retry button when set.",
      },
      {
        name: "retryLabel",
        type: "ReactNode",
        default: '"Retry"',
        desc: "Retry button label.",
      },
    ],
    usage: `<ErrorState
  title="No signal"
  message="Move to an open area and try again."
  onRetry={refetch}
/>`,
  },
  {
    slug: "empty-state",
    name: "EmptyState",
    category: "Status",
    summary:
      "The nothing-here screen: optional glyph, title, hint, and one action. The quiet sibling of ErrorState: nothing failed, there's just no content yet. Pairs with AsyncView's placeholder slot.",
    preview: (
      <Screen>
        <EmptyState
          icon={
            <GlowIcon size="lg" plate label="Messages">
              <MessageGlyph />
            </GlowIcon>
          }
          title="No messages"
          hint="New conversations land here."
        />
      </Screen>
    ),
    props: [
      {
        name: "title",
        type: "ReactNode",
        default: '"Nothing here yet"',
        desc: "The headline.",
      },
      {
        name: "hint",
        type: "ReactNode",
        desc: "A quieter second line: what will fill this screen, or how.",
      },
      { name: "icon", type: "ReactNode", desc: "Optional leading glyph." },
      {
        name: "onAction",
        type: "() => void",
        desc: "Shows an action button when set.",
      },
      {
        name: "actionLabel",
        type: "ReactNode",
        default: '"Refresh"',
        desc: "Action button label.",
      },
    ],
    usage: `<EmptyState
  title="No messages"
  hint="New conversations land here."
  onAction={refetch}
/>

// as AsyncView's placeholder
<AsyncView status={status} placeholder={<EmptyState title="No workouts" />}>
  {data}
</AsyncView>`,
  },
  {
    slug: "heading",
    name: "Heading",
    category: "Display",
    summary:
      "A screen/section title with an optional accent eyebrow above it. Pure display: one heading per view keeps the glance cheap.",
    preview: (
      <Screen>
        <Heading eyebrow="Workout">Morning Run</Heading>
      </Screen>
    ),
    props: [
      { name: "children", type: "ReactNode", desc: "The title." },
      {
        name: "eyebrow",
        type: "ReactNode",
        desc: "Small tracked label above.",
      },
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
      "A horizontal paged flow (wizard / onboarding). Self-connects to the Neural Band, so a wristband swipe advances the page. Pass index to control it; step dots beneath. Never scrolls.",
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
      {
        name: "index",
        type: "number",
        desc: "Controlled page (clamped). Omit for uncontrolled, where Neural Band swipes advance.",
      },
      {
        name: "defaultIndex",
        type: "number",
        default: "0",
        desc: "Starting page when uncontrolled.",
      },
      {
        name: "onIndexChange",
        type: "(index: number) => void",
        desc: "Fires with the next page on every swipe (both modes).",
      },
      { name: "children", type: "ReactNode", desc: "One node per page." },
    ],
    usage: `// self-wired: Neural Band swipes advance
<Deck>
  <OnboardConnect />
  <OnboardCalibrate />
  <OnboardReady />
</Deck>

// or controlled
<Deck index={step} onIndexChange={setStep}>…</Deck>`,
  },
  {
    slug: "navigator",
    name: "Navigator",
    category: "Navigation",
    summary:
      "A screen stack with system-back integration. Every push adds a real history entry, so the Display's back gesture (middle pinch, OS v125.1+) pops it via popstate. The stack rides in history.state, so a mid-flow reload restores the screen; opt-in paths mirror pushes into the URL. Pop restores focus to the row that pushed.",
    // Static stand-in: the live stack (with real history pushes) runs in the
    // interactive demo and the /preview glass app.
    preview: (
      <Screen cue={<Cue>Middle pinch goes back</Cue>}>
        <Heading eyebrow="Navigator">Workout</Heading>
        <List>
          <ListRow>Start a run</ListRow>
          <ListRow>Start a ride</ListRow>
          <ListRow>History</ListRow>
        </List>
      </Screen>
    ),
    props: [
      {
        name: "screens",
        type: "Record<string, (params?) => ReactNode>",
        desc: "Screen renderers by name; receive the push params.",
      },
      { name: "initial", type: "string", desc: "Root screen name." },
      { name: "initialParams", type: "unknown", desc: "Params for the root." },
      {
        name: "paths",
        type: "Record<string, string>",
        desc: "Screen name → URL segment. Mirrors the stack into the pathname; with a host catch-all route, pushed screens deep-link.",
      },
    ],
    usage: `const nav = useNavigator(); // inside a screen
nav.push("detail", { id }); nav.pop(); nav.popToTop(); nav.replace("done");

<Navigator
  initial="home"
  screens={{
    home: () => <Home />,
    detail: (params) => <Detail {...params} />,
  }}
/>

// overlays intercept the back gesture:
useBackHandler(() => { if (open) { setOpen(false); return true; } return false; });`,
  },
  {
    slug: "quick-reply-chips",
    name: "QuickReplyChips",
    category: "Action",
    summary:
      "Tappable canned replies (the comms job: there is no keyboard on the lens, text is voice). Each chip is D-pad-focusable. Keep the set short and glanceable.",
    preview: (
      <Screen>
        <Cue>&ldquo;Running late&rdquo;</Cue>
        <QuickReplyChips options={["On my way", "5 min", "Call me"]} />
      </Screen>
    ),
    props: [
      { name: "options", type: "string[]", desc: "The canned replies." },
      {
        name: "onSelect",
        type: "(reply: string) => void",
        desc: "Fires on tap.",
      },
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
      "A world-anchored waypoint marker (ring + dot, name + distance above) placed at a projected screen point. You project: derive x from the target's relative bearing (lib/geo), since the platform gives heading + GPS, not 3D pose. Never mirrored under RTL.",
    preview: <Pin x={50} y={48} label="Blue Bottle" distance="120 m" />,
    props: [
      {
        name: "x / y",
        type: "number",
        desc: "0–100, % of the lens (you project from the world).",
      },
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
      "A world-object annotation: an anchor + a vertical leader up to an emitted label (no box, just a leader line + emitted type). Project x from relative bearing like Pin (lib/geo). World-anchored, never mirrored.",
    preview: <Callout x={50} y={56} label="Powell St" detail="Muni · 3 min" />,
    props: [
      { name: "x / y", type: "number", desc: "0–100, % of the lens." },
      { name: "label", type: "ReactNode", desc: "The annotation label." },
      { name: "detail", type: "ReactNode", desc: "Optional second line." },
    ],
    usage: `<Callout x={x} y={y} label="Powell St" detail="Muni · 3 min" />`,
  },
  {
    slug: "map-view",
    name: "MapView",
    category: "Spatial",
    summary:
      "A real moving map for the lens, built on Leaflet (~42KB). Dark raster tiles that follow your position, with the route and a you-are-here marker drawn on top in accent. It defaults to keyless CARTO dark tiles; pass tileUrl for MapTiler or Stadia in production.",
    preview: (
      <>
        <MapView
          center={[40.7411, -73.9897]}
          zoom={16}
          route={BAKED_ROUTES[3]!.path}
          destination={BAKED_ROUTES[3]!.path.at(-1)}
        />
        <Screen
          status={<Cue emphasis="accent">Eleven Madison · 738 m · 9 min</Cue>}
          cue={<Cue>Routing there</Cue>}
        >
          {null}
        </Screen>
      </>
    ),
    props: [
      {
        name: "center",
        type: "[number, number]",
        desc: "Your position [lat, lon]. The map follows it.",
      },
      { name: "zoom", type: "number", default: "16", desc: "Zoom level." },
      {
        name: "route",
        type: "[number, number][]",
        desc: "Route polyline as [lat, lon] points.",
      },
      {
        name: "destination",
        type: "[number, number]",
        desc: "Destination pin [lat, lon].",
      },
      {
        name: "tileUrl",
        type: "string",
        default: "CARTO dark",
        desc: "Raster tile template. Bring your own provider key for production.",
      },
    ],
    usage: `// keyless CARTO dark tiles (preview-grade); live position follows you
const here = useGeolocation(); // [lat, lon]

<MapView
  center={[here.lat, here.lon]}
  route={routeLatLngs}
  destination={[37.7814, -122.4217]}
  // tileUrl="https://api.maptiler.com/maps/streets-dark/{z}/{x}/{y}.png?key=…"
/>`,
  },
  {
    slug: "avatar",
    name: "Avatar",
    category: "Comms",
    summary:
      "A contact / sender avatar: a photo when you have one, else initials on a gradient plate. The building block for notifications, chats, and calls.",
    preview: (
      <Screen>
        <div className="row">
          <Avatar name="Mara Lin" tone="violet" size="lg" />
          <Avatar name="Sam Ortiz" tone="green" size="lg" />
          <Avatar name="Devon Reyes" tone="amber" size="lg" />
        </div>
      </Screen>
    ),
    props: [
      {
        name: "name",
        type: "string",
        desc: "Display name → initials + a11y label.",
      },
      { name: "src", type: "string", desc: "Optional photo URL." },
      {
        name: "tone",
        type: '"blue" | "green" | "peach" | "violet" | "cyan" | "amber"',
        default: '"blue"',
        desc: "Gradient tone for the initials plate.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        desc: "46 / 62 / 92px.",
      },
    ],
    usage: `<Avatar name="Mara Lin" tone="violet" />
<Avatar name="Sam Ortiz" src={photoUrl} />`,
  },
  {
    slug: "notification-card",
    name: "NotificationCard",
    category: "Comms",
    summary:
      "An incoming notification: avatar + sender + time, a message preview, and optional quick actions. The glanceable comms surface (richer than a Toast).",
    preview: (
      <Screen>
        <NotificationCard
          avatar={<Avatar name="Mara Lin" tone="violet" size="sm" />}
          title="Mara Lin"
          time="now"
        >
          On my way, be there in 5
        </NotificationCard>
      </Screen>
    ),
    props: [
      {
        name: "avatar",
        type: "ReactNode",
        desc: "Leading <Avatar> or app glyph.",
      },
      { name: "title", type: "ReactNode", desc: "Sender / app name." },
      { name: "time", type: "ReactNode", desc: "Optional timestamp." },
      { name: "children", type: "ReactNode", desc: "The message preview." },
      { name: "actions", type: "ReactNode", desc: "Optional action row." },
    ],
    usage: `<NotificationCard
  avatar={<Avatar name="Mara Lin" tone="violet" size="sm" />}
  title="Mara Lin" time="now"
>
  On my way, be there in 5
</NotificationCard>`,
  },
  {
    slug: "now-playing",
    name: "NowPlaying",
    category: "Media",
    summary:
      "A media now-playing card with album art, title and artist, a scrub bar, and elapsed / remaining times. It's a status display for playback your app tracks. Audio support in the Display webview is undocumented, so verify on-device.",
    preview: (
      <Screen>
        <NowPlaying
          art={<span className="gk-grad-peach" />}
          title="Midnight City"
          artist="M83"
          progress={42}
          elapsed="1:48"
          remaining="-2:31"
        />
      </Screen>
    ),
    props: [
      {
        name: "art",
        type: "ReactNode",
        desc: "Album art: an <img> or a gradient tile.",
      },
      { name: "title / artist", type: "ReactNode", desc: "Track + artist." },
      {
        name: "progress",
        type: "number",
        default: "0",
        desc: "0–100 scrub position.",
      },
      { name: "elapsed / remaining", type: "ReactNode", desc: "Time labels." },
      { name: "controls", type: "ReactNode", desc: "Optional transport row." },
    ],
    usage: `<NowPlaying
  art={<img src={cover} alt="" />}
  title="Midnight City" artist="M83"
  progress={42} elapsed="1:48" remaining="-2:31"
/>`,
  },
  {
    slug: "assistant-orb",
    name: "AssistantOrb",
    category: "AI",
    summary:
      "The Meta-AI presence: a glowing gradient orb that animates per state (idle breathe, listening pulse, thinking swirl, speaking). Pair with a transcript line.",
    preview: (
      <Screen>
        <AssistantOrb state="listening" label="Listening…" />
      </Screen>
    ),
    props: [
      {
        name: "state",
        type: '"idle" | "listening" | "thinking" | "speaking"',
        default: '"idle"',
        desc: "Drives the orb animation.",
      },
      { name: "label", type: "ReactNode", desc: "Caption / transcript line." },
    ],
    usage: `<AssistantOrb state={aiState} label={transcript} />`,
  },
  {
    slug: "toaster",
    name: "Toaster",
    category: "Status",
    summary:
      "The toast / notification SYSTEM: Sonner (Emil Kowalski's library) themed to the lens. Mount <Toaster> once, then fire imperatively with toast(); it handles the queue, stacking, auto-dismiss, and enter/exit motion. Top-anchored, so Screen's Cue line owns the bottom strip.",
    preview: (
      // Static mock in the status slot, top-anchored like the real
      // top-center mount. (Tailwind margin utilities can't pin it: the SDK's
      // unlayered `.glass-viewport *` margin reset beats layered utilities.)
      <Screen
        status={
          <div className="gk-toaster__toast">
            <span className="gk-toaster__icon">
              <Avatar name="Mara Lin" tone="violet" size="sm" />
            </span>
            <div>
              <div className="gk-toaster__title">Mara Lin</div>
              <div className="gk-toaster__desc">On my way, be there in 5</div>
            </div>
          </div>
        }
      >
        {null}
      </Screen>
    ),
    props: [
      {
        name: "position",
        type: "Position",
        default: '"top-center"',
        desc: "Anchor; bottom = device-accurate.",
      },
      {
        name: "(Sonner props)",
        type: "ToasterProps",
        desc: "offset, gap, visibleToasts, theme, etc.",
      },
      {
        name: "toast()",
        type: "imperative API",
        desc: "toast(msg) · toast(t,{description,icon,action}) · toast.custom().",
      },
    ],
    usage: `// once at your app root (inside the 600×600 window)
<Toaster />

// then anywhere:
toast("Workout saved");
toast("Mara Lin", {
  description: "On my way",
  icon: <Avatar name="Mara Lin" tone="violet" size="sm" />,
});`,
  },
  {
    slug: "chat-bubble",
    name: "ChatBubble",
    category: "Comms",
    summary:
      'A conversation view. <MessageThread> stacks <ChatBubble>s: from="them" is a surface bubble at the start, from="me" is the accent-gradient bubble at the end. RTL-safe.',
    preview: (
      <Screen>
        <MessageThread>
          <ChatBubble from="them">Where are you?</ChatBubble>
          <ChatBubble from="me">Two blocks away</ChatBubble>
          <ChatBubble from="them">Grab a table?</ChatBubble>
          <ChatBubble from="me">On it 👍</ChatBubble>
        </MessageThread>
      </Screen>
    ),
    props: [
      {
        name: "MessageThread · children",
        type: "ReactNode",
        desc: "ChatBubble elements.",
      },
      {
        name: "ChatBubble · from",
        type: '"me" | "them"',
        default: '"them"',
        desc: "Alignment + style.",
      },
      {
        name: "ChatBubble · children",
        type: "ReactNode",
        desc: "The message.",
      },
    ],
    usage: `<MessageThread>
  <ChatBubble from="them">Where are you?</ChatBubble>
  <ChatBubble from="me">Two blocks away</ChatBubble>
</MessageThread>`,
  },
  {
    slug: "call-card",
    name: "CallCard",
    category: "Comms",
    summary:
      "An incoming / active call: a big avatar, caller name, a status line, and round accept / decline actions (the one place a semantic green/red reads clearer than the single accent).",
    preview: (
      <Screen>
        <CallCard
          avatar={<Avatar name="Devon Reyes" tone="cyan" size="lg" />}
          name="Devon Reyes"
          status="Incoming call"
          actions={
            <>
              <button
                type="button"
                className="focusable gk-callbtn gk-callbtn--decline"
                aria-label="Decline"
              >
                <GlowIcon size="md">
                  <PhoneOffGlyph />
                </GlowIcon>
              </button>
              <button
                type="button"
                className="focusable gk-callbtn gk-callbtn--accept"
                aria-label="Accept"
              >
                <GlowIcon size="md">
                  <PhoneGlyph />
                </GlowIcon>
              </button>
            </>
          }
        />
      </Screen>
    ),
    props: [
      { name: "avatar", type: "ReactNode", desc: "A large <Avatar>." },
      { name: "name", type: "ReactNode", desc: "Caller name." },
      {
        name: "status",
        type: "ReactNode",
        desc: '"Incoming call", a timer, etc.',
      },
      {
        name: "actions",
        type: "ReactNode",
        desc: "Accept / decline controls.",
      },
    ],
    usage: `<CallCard
  avatar={<Avatar name="Devon Reyes" tone="cyan" size="lg" />}
  name="Devon Reyes" status="Incoming call"
  actions={<><DeclineButton /><AcceptButton /></>}
/>`,
  },
  {
    slug: "media-thumb",
    name: "MediaThumb",
    category: "Media",
    summary:
      "A photo / reel tile (Photos, Instagram): a rounded media tile with optional duration pill and caption overlay. Drop tiles in a masonry gk-gallery for a staggered, D-pad-scrollable grid; pass onSelect to make each tile focusable.",
    preview: <MediaGalleryDemo />,
    props: [
      {
        name: "src",
        type: "string",
        desc: "Image URL (else a gradient placeholder).",
      },
      { name: "label", type: "ReactNode", desc: "Caption overlay." },
      {
        name: "duration",
        type: "ReactNode",
        desc: "Duration pill (for video/reels).",
      },
      {
        name: "aspect",
        type: '"square" | "portrait"',
        default: '"square"',
        desc: "Tile ratio. Mixed aspects make a masonry stagger.",
      },
      {
        name: "onSelect",
        type: "() => void",
        desc: "Makes the tile a focusable button, fired on Enter.",
      },
    ],
    usage: `// a focusable photo tile (mixed aspects make a masonry stagger)
<MediaThumb
  src={photo.src}
  label={photo.label}
  aspect={photo.aspect}      // "square" | "portrait"
  onSelect={() => open(photo)}
/>

// for a vertical masonry, deal the tiles into two
// .gk-gallery__col stacks inside a .gk-gallery container.`,
  },
  {
    slug: "tabs",
    name: "Tabs",
    category: "Navigation",
    summary:
      "A top-level tab strip (the home's quick-controls | home | apps pager). Each tab is D-pad-focusable; the active one gets an accent underline. Controlled via value + onChange.",
    preview: (
      <Screen
        status={
          <Tabs
            value="home"
            items={[
              { id: "controls", label: "Controls" },
              { id: "home", label: "Home" },
              { id: "apps", label: "Apps" },
            ]}
          />
        }
      >
        <Readout label="Tuesday" value="9:41" />
      </Screen>
    ),
    props: [
      { name: "items", type: "{ id, label }[]", desc: "The tabs." },
      { name: "value", type: "string", desc: "Active tab id (controlled)." },
      {
        name: "onChange",
        type: "(id: string) => void",
        desc: "Fires on select.",
      },
    ],
    usage: `<Tabs
  value={tab}
  onChange={setTab}
  items={[
    { id: "controls", label: "Controls" },
    { id: "home", label: "Home" },
    { id: "apps", label: "Apps" },
  ]}
/>`,
  },
  {
    slug: "clock",
    name: "Clock",
    category: "Display",
    summary:
      "The home time / date complication: a big tabular time, a quieter date, and an optional meta line (weather, alarm). Self-ticking by default (minute-aligned); pass time to control the formatting yourself.",
    preview: (
      <Screen>
        <Clock time="9:41" date="Tuesday, June 9" meta="72° · Sunny" />
      </Screen>
    ),
    props: [
      {
        name: "time",
        type: "ReactNode",
        desc: "Controlled, preformatted time. Omit to tick live.",
      },
      {
        name: "date",
        type: "ReactNode",
        desc: "Date line. In live mode, omitting it shows the live date.",
      },
      { name: "meta", type: "ReactNode", desc: "Optional trailing line." },
      {
        name: "locale",
        type: "string",
        desc: "BCP 47 locale for live formatting (default: device locale).",
      },
      {
        name: "hour12",
        type: "boolean",
        desc: "Force 12/24-hour live time (default: locale convention).",
      },
    ],
    usage: `// self-ticking, device locale
<Clock meta="72° · Sunny" />

// or controlled: you own the formatting
<Clock time="9:41" date="Tuesday, June 9" />`,
  },
  {
    slug: "timer",
    name: "Timer",
    category: "Display",
    summary:
      "A countdown readout: big tabular m:ss, an optional label, and a bar draining toward zero. Self-ticking (end-time anchored, no drift) with pause/resume via running; pass remaining to control it yourself.",
    preview: (
      <Screen>
        <Timer remaining={154} duration={300} label="Pasta" />
      </Screen>
    ),
    props: [
      {
        name: "duration",
        type: "number",
        desc: "Total seconds. Drives self-ticking and the drain bar's scale.",
      },
      {
        name: "remaining",
        type: "number",
        desc: "Controlled seconds left. Omit to self-tick from duration.",
      },
      {
        name: "running",
        type: "boolean",
        default: "true",
        desc: "Pause/resume the self-ticking countdown.",
      },
      { name: "label", type: "ReactNode", desc: "Caption under the time." },
      {
        name: "showBar",
        type: "boolean",
        default: "true",
        desc: "Hide the drain bar (it needs duration for its scale).",
      },
      {
        name: "onComplete",
        type: "() => void",
        desc: "Fires once when a self-ticking countdown reaches zero.",
      },
    ],
    usage: `// self-ticking 5-minute countdown
<Timer duration={300} label="Pasta" onComplete={notify} />

// paused / resumed from app state
<Timer duration={300} running={running} />

// or controlled: you own the clock
<Timer remaining={secondsLeft} duration={300} />`,
  },
  {
    slug: "weather-tile",
    name: "WeatherTile",
    category: "Display",
    summary:
      "A glanceable weather complication: a condition glyph + big temperature, the condition, and an optional location / hi-lo line. A popping surface.",
    preview: (
      <Screen>
        <WeatherTile
          icon={
            <GlowIcon size="lg">
              <SunGlyph />
            </GlowIcon>
          }
          temp="72°"
          condition="Sunny"
          location="San Francisco"
          range="H:78° L:61°"
        />
      </Screen>
    ),
    props: [
      { name: "temp", type: "ReactNode", desc: "Temperature." },
      { name: "condition", type: "ReactNode", desc: "Condition text." },
      { name: "icon", type: "ReactNode", desc: "Condition glyph." },
      {
        name: "location / range",
        type: "ReactNode",
        desc: "Place · hi-lo line.",
      },
    ],
    usage: `<WeatherTile
  icon={<GlowIcon size="lg"><SunIcon /></GlowIcon>}
  temp="72°" condition="Sunny" location="San Francisco" range="H:78° L:61°"
/>`,
  },
  {
    slug: "slider",
    name: "Slider",
    category: "Action",
    summary:
      "A continuous level control (volume, brightness, the quick controls). A native range tinted with accent-color; arrow keys / Neural-Band pinch-twist adjust it. Controlled via value + onChange.",
    preview: (
      <Screen>
        <Slider
          value={70}
          icon={
            <GlowIcon size="md">
              <VolumeGlyph />
            </GlowIcon>
          }
          label="Volume"
        />
        <Slider
          value={40}
          icon={
            <GlowIcon size="md">
              <SunGlyph />
            </GlowIcon>
          }
          label="Brightness"
        />
      </Screen>
    ),
    props: [
      { name: "value", type: "number", desc: "Current value (controlled)." },
      {
        name: "min / max",
        type: "number",
        default: "0 / 100",
        desc: "Bounds.",
      },
      {
        name: "onChange",
        type: "(next: number) => void",
        desc: "Fires on adjust.",
      },
      {
        name: "icon / label",
        type: "ReactNode",
        desc: "Leading glyph / caption.",
      },
    ],
    usage: `<Slider
  value={volume} onChange={setVolume}
  icon={<GlowIcon size="md"><VolumeIcon /></GlowIcon>}
  label="Volume"
/>`,
  },
  {
    slug: "text-field",
    name: "TextField",
    category: "Input",
    summary:
      "A text-entry surface. No keyboard (or microphone API) on the lens: a focusable field showing the value + a mic-style affordance; onActivate opens your own capture flow. ComposeFlow is the ready-made picker recipe.",
    preview: (
      <Screen>
        <TextField
          label="Reply"
          placeholder="Pinch to enter text"
          icon={
            <GlowIcon size="md">
              <MicGlyph />
            </GlowIcon>
          }
        />
      </Screen>
    ),
    props: [
      { name: "label", type: "ReactNode", desc: "Field label." },
      {
        name: "value",
        type: "ReactNode",
        desc: "Current value (else placeholder).",
      },
      {
        name: "placeholder",
        type: "ReactNode",
        default: '"Pinch to enter text"',
        desc: "Empty hint.",
      },
      { name: "icon", type: "ReactNode", desc: "Trailing affordance (mic)." },
      {
        name: "onActivate",
        type: "() => void",
        desc: "Opens dictation / handwriting.",
      },
    ],
    usage: `<TextField
  label="Reply" value={draft} onActivate={startDictation}
  icon={<GlowIcon size="md"><MicIcon /></GlowIcon>}
/>`,
  },
  {
    slug: "compose-flow",
    name: "ComposeFlow",
    category: "Input",
    summary:
      "The working text-entry recipe: a TextField that opens a picker of choices when activated; choosing writes back and returns. The picker rides history, so the back gesture closes it, inside or outside a Navigator. The seam system dictation would replace.",
    preview: (
      <Screen>
        <ComposeFlow
          label="Reply"
          value="On my way"
          options={["On my way", "5 min", "Call me"]}
        />
      </Screen>
    ),
    props: [
      { name: "label", type: "ReactNode", desc: "Field label." },
      {
        name: "value",
        type: "string | null",
        desc: "Current value. Controlled, so pair with onChange.",
      },
      { name: "placeholder", type: "ReactNode", desc: "Empty-field hint." },
      {
        name: "options",
        type: "string[]",
        desc: "The choices the picker offers.",
      },
      {
        name: "pickerTitle",
        type: "ReactNode",
        default: '"Choose"',
        desc: "Heading on the picker view.",
      },
      { name: "icon", type: "ReactNode", desc: "TextField trailing glyph." },
      {
        name: "onChange",
        type: "(value: string) => void",
        desc: "Fires with the chosen option.",
      },
    ],
    usage: `const [reply, setReply] = useState<string | null>(null);

<ComposeFlow
  label="Reply"
  value={reply}
  onChange={setReply}
  options={["On my way", "5 min", "Call me"]}
  pickerTitle="Quick replies"
/>`,
  },
  {
    slug: "permission-prompt",
    name: "PermissionPrompt",
    category: "Input",
    summary:
      "An explicit access request (sensors, location, camera, mic) that MRBD apps must ask for before use. A gradient-plate icon, a clear title, the reason, and allow / deny actions.",
    preview: (
      <Screen>
        <PermissionPrompt
          icon={
            <GlowIcon size="lg" plate tone="cyan">
              <NavGlyph />
            </GlowIcon>
          }
          title="Use your location?"
          actions={
            <>
              <Button>Not now</Button>
              <Button variant="primary">Allow</Button>
            </>
          }
        >
          Maps needs your location for walking directions.
        </PermissionPrompt>
      </Screen>
    ),
    props: [
      { name: "icon", type: "ReactNode", desc: "A gradient-plate GlowIcon." },
      { name: "title", type: "ReactNode", desc: "The request." },
      { name: "children", type: "ReactNode", desc: "Why the app needs it." },
      { name: "actions", type: "ReactNode", desc: "Allow / deny controls." },
    ],
    usage: `<PermissionPrompt
  icon={<GlowIcon size="lg" plate tone="cyan"><LocationIcon /></GlowIcon>}
  title="Use your location?"
  actions={<><Button onClick={deny}>Not now</Button>
            <Button variant="primary" onClick={allow}>Allow</Button></>}
>
  Maps needs your location for walking directions.
</PermissionPrompt>`,
  },
  {
    slug: "pressable",
    name: "Pressable",
    category: "Action",
    summary:
      "The focusable wrapper for custom UI. Renders a real button carrying the focusable class, so useDpad walks it and fires onPress on Enter or the Neural Band pinch. Reach for it to make your own content (a card, a tile, a row) D-pad-interactive when no first-class component fits. It adds no chrome beyond the focus ring and press animation.",
    preview: (
      <Screen cue={<Cue>Arrow between the tiles, Enter to press</Cue>}>
        <div className="row">
          <Pressable initialFocus>
            <Readout label="Steps" value="8,420" />
          </Pressable>
          <Pressable>
            <Readout label="Floors" value="12" />
          </Pressable>
        </div>
      </Screen>
    ),
    props: [
      {
        name: "children",
        type: "ReactNode",
        desc: "Your content. Pressable styles nothing inside it.",
      },
      {
        name: "onPress",
        type: "() => void",
        desc: "Fires on Enter / pinch (and click).",
      },
      {
        name: "initialFocus",
        type: "boolean",
        default: "false",
        desc: "Seed the D-pad ring here on mount (data-autofocus).",
      },
      { name: "disabled", type: "boolean", desc: "Dims and skips focus." },
    ],
    usage: `// make any custom content D-pad-interactive
<Pressable onPress={() => open(item)} className="my-card">
  <YourCustomLayout item={item} />
</Pressable>`,
  },
  {
    slug: "masonry",
    name: "Masonry",
    category: "Layout",
    summary:
      "A staggered, vertically-scrolling multi-column layout (the Pinterest / Photos look, where columns do not line up). Drop any children in; Masonry measures each and greedily fills the shortest column, so the sides stay balanced whatever the order. It scrolls vertically and keeps a D-pad-focused child in view.",
    preview: <MediaGalleryDemo />,
    props: [
      {
        name: "columns",
        type: "number",
        default: "2",
        desc: "Number of columns.",
      },
      {
        name: "children",
        type: "ReactNode",
        desc: "The items (e.g. MediaThumb tiles or Pressable cards).",
      },
    ],
    usage: `<Masonry columns={2}>
  {photos.map((p) => (
    <MediaThumb key={p.id} src={p.src} aspect={p.aspect} onSelect={() => open(p)} />
  ))}
</Masonry>`,
  },
  {
    slug: "grid",
    name: "Grid",
    category: "Layout",
    summary:
      "An aligned, vertically-scrolling multi-column layout: every cell shares the same track, so rows line up (the counterpart to Masonry, which staggers). Drop any children in; it scrolls vertically and keeps a D-pad-focused child in view. Column count (2, 3, 4) rides on data-cols, so the lens needs no inline style.",
    preview: <MediaGridDemo />,
    props: [
      {
        name: "columns",
        type: "2 | 3 | 4",
        default: "2",
        desc: "Number of equal columns.",
      },
      {
        name: "children",
        type: "ReactNode",
        desc: "The cells (e.g. MediaThumb tiles or Pressable cards).",
      },
    ],
    usage: `<Grid columns={2}>
  {photos.map((p) => (
    <MediaThumb key={p.id} src={p.src} onSelect={() => open(p)} />
  ))}
</Grid>`,
  },
];

export function getComponentDoc(slug: string): ComponentDoc | undefined {
  return COMPONENT_DOCS.find((d) => d.slug === slug);
}
