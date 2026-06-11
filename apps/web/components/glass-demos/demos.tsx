"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Screen } from "@registry/ui/screen";
import { Cue } from "@registry/ui/cue";
import { Button } from "@registry/ui/button";
import { Toggle } from "@registry/ui/toggle";
import { Stepper } from "@registry/ui/stepper";
import { Slider } from "@registry/ui/slider";
import { Segmented } from "@registry/ui/segmented";
import { Tabs } from "@registry/ui/tabs";
import { Confirm } from "@registry/ui/confirm";
import { QuickReplyChips } from "@registry/ui/quick-reply-chips";
import { Deck } from "@registry/ui/deck";
import { Launcher } from "@registry/ui/launcher";
import { TextField } from "@registry/ui/text-field";
import { PermissionPrompt } from "@registry/ui/permission-prompt";
import { Timer } from "@registry/ui/timer";
import { EmptyState } from "@registry/ui/empty-state";
import { NotificationCard } from "@registry/ui/notification-card";
import { NowPlaying } from "@registry/ui/now-playing";
import { CallCard } from "@registry/ui/call-card";
import { Toast } from "@registry/ui/toast";
import { AsyncView } from "@registry/ui/async-view";
import { Progress } from "@registry/ui/progress";
import { Dictation } from "@registry/ui/dictation";
import { Viewfinder } from "@registry/ui/viewfinder";
import { Reticle } from "@registry/ui/reticle";
import { List, ListRow } from "@registry/ui/list";
import { Navigator, useNavigator } from "@registry/ui/navigator";
import { Compass } from "@registry/ui/compass";
import { DirectionArrow } from "@registry/ui/direction-arrow";
import { Heading } from "@registry/ui/heading";
import { Readout } from "@registry/ui/readout";
import { Avatar } from "@registry/ui/avatar";
import { GlowIcon } from "@registry/ui/glow-icon";
import {
  CheckGlyph,
  ChevronGlyph,
  MessageGlyph,
  MicGlyph,
  MusicGlyph,
  NavGlyph,
  PhoneGlyph,
  PhoneOffGlyph,
  VolumeGlyph,
  CameraGlyph,
} from "@/components/lens/icons";

/**
 * Interactive glass-app demos — what a /preview/<slug> route runs full-screen
 * on the glasses (and what the docs page embeds). Each is a real working
 * screen: D-pad moves focus, Enter activates, sensor components are live.
 * Demo state is local; the cue line narrates what the input just did.
 */

export function ToggleDemo() {
  const [wifi, setWifi] = useState(true);
  const [dnd, setDnd] = useState(false);
  return (
    <Screen cue={<Cue>Enter flips the focused switch</Cue>}>
      <Heading>Quick controls</Heading>
      <Toggle checked={wifi} onChange={setWifi} label="Wi-Fi" />
      <Toggle checked={dnd} onChange={setDnd} label="Do not disturb" />
    </Screen>
  );
}

export function ListDemo() {
  const [opened, setOpened] = useState<string | null>(null);
  const rows = ["Messages", "Navigation", "Music", "Camera", "Settings"];
  return (
    <Screen
      cue={
        <Cue>{opened ? `Opened ${opened}` : "Up / down walks the rows"}</Cue>
      }
    >
      <List>
        {rows.map((r) => (
          <ListRow
            key={r}
            onClick={() => setOpened(r)}
            trailing={<ChevronGlyph />}
          >
            {r}
          </ListRow>
        ))}
      </List>
    </Screen>
  );
}

export function StepperDemo() {
  const [zoom, setZoom] = useState(2);
  return (
    <Screen cue={<Cue>Focus − / + and press Enter</Cue>}>
      <Stepper
        value={zoom}
        onChange={setZoom}
        min={1}
        max={5}
        label="Zoom"
        unit="×"
      />
    </Screen>
  );
}

export function SliderDemo() {
  const [volume, setVolume] = useState(60);
  return (
    <Screen cue={<Cue>Arrow keys adjust while focused</Cue>}>
      <Slider
        value={volume}
        onChange={setVolume}
        label={`Volume · ${volume}`}
        icon={
          <GlowIcon size="sm">
            <VolumeGlyph />
          </GlowIcon>
        }
      />
    </Screen>
  );
}

export function SegmentedDemo() {
  const [view, setView] = useState<"map" | "list">("map");
  return (
    <Screen cue={<Cue>Showing the {view} view</Cue>}>
      <Segmented
        value={view}
        onChange={setView}
        label="View"
        options={[
          { value: "map", label: "Map" },
          { value: "list", label: "List" },
        ]}
      />
    </Screen>
  );
}

export function TabsDemo() {
  const [tab, setTab] = useState("home");
  const LABELS: Record<string, string> = {
    controls: "Quick controls",
    home: "Home",
    apps: "App grid",
  };
  return (
    <Screen cue={<Cue>{LABELS[tab]}</Cue>}>
      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { id: "controls", label: "Controls" },
          { id: "home", label: "Home" },
          { id: "apps", label: "Apps" },
        ]}
      />
      <Readout label="Active tab" value={LABELS[tab] ?? tab} />
    </Screen>
  );
}

export function ConfirmDemo() {
  const [answer, setAnswer] = useState<string | null>(null);
  if (answer) {
    return (
      <Screen cue={<Cue tone="accent">{answer}</Cue>}>
        <Heading>Workout</Heading>
        <Button onClick={() => setAnswer(null)}>Again</Button>
      </Screen>
    );
  }
  return (
    <Screen>
      <Confirm
        title="End workout?"
        message="42 minutes will be saved."
        confirmLabel="End"
        cancelLabel="Keep going"
        onConfirm={() => setAnswer("Saved — nice run.")}
        onCancel={() => setAnswer("Still recording.")}
      />
    </Screen>
  );
}

export function QuickReplyChipsDemo() {
  const [sent, setSent] = useState<string | null>(null);
  return (
    <Screen
      cue={
        <Cue tone={sent ? "accent" : "default"}>
          {sent ? `Sent: “${sent}”` : "“Running late?”"}
        </Cue>
      }
    >
      <QuickReplyChips
        options={["On my way", "5 min", "Call me"]}
        onSelect={setSent}
      />
    </Screen>
  );
}

export function DeckDemo() {
  // Uncontrolled — a Neural Band swipe advances. Simulate one with the button
  // (which is also how a D-pad-only session moves forward).
  const swipe = () =>
    window.dispatchEvent(
      new CustomEvent("neuralband", { detail: { gesture: "swipe" } }),
    );
  return (
    <Screen cue={<Cue>Swipe the band (or press Next) to advance</Cue>}>
      <Deck>
        <Heading eyebrow="Step 1">Connect band</Heading>
        <Heading eyebrow="Step 2">Calibrate</Heading>
        <Heading eyebrow="Step 3">Ready</Heading>
      </Deck>
      <Button onClick={swipe}>Next</Button>
    </Screen>
  );
}

export function LauncherDemo() {
  const [opened, setOpened] = useState<string | null>(null);
  return (
    <Screen cue={<Cue>{opened ? `Opening ${opened}…` : "Pick an app"}</Cue>}>
      <Launcher
        apps={[
          {
            id: "nav",
            label: "Navigate",
            tagline: "320 m",
            icon: <NavGlyph />,
            onSelect: () => setOpened("Navigate"),
          },
          {
            id: "msg",
            label: "Messages",
            tagline: "2 new",
            icon: <MessageGlyph />,
            onSelect: () => setOpened("Messages"),
          },
          {
            id: "music",
            label: "Music",
            icon: <MusicGlyph />,
            onSelect: () => setOpened("Music"),
          },
          {
            id: "cam",
            label: "Camera",
            icon: <CameraGlyph />,
            onSelect: () => setOpened("Camera"),
          },
        ]}
      />
    </Screen>
  );
}

export function TextFieldDemo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Screen cue={<Cue>{value ? "Dictated" : "Activate to dictate"}</Cue>}>
      <TextField
        label="Message"
        value={value}
        onActivate={() => setValue("On my way — 5 minutes.")}
        icon={
          <GlowIcon size="sm">
            <MicGlyph />
          </GlowIcon>
        }
      />
    </Screen>
  );
}

export function PermissionPromptDemo() {
  const [granted, setGranted] = useState<boolean | null>(null);
  if (granted != null) {
    return (
      <Screen
        cue={<Cue tone="accent">{granted ? "Location on" : "Denied"}</Cue>}
      >
        <Heading>Navigation</Heading>
        <Button onClick={() => setGranted(null)}>Ask again</Button>
      </Screen>
    );
  }
  return (
    <Screen>
      <PermissionPrompt
        icon={
          <GlowIcon size="lg" plate tone="cyan" label="Location">
            <NavGlyph />
          </GlowIcon>
        }
        title="Use your location?"
        actions={
          <>
            <Button variant="primary" onClick={() => setGranted(true)}>
              Allow
            </Button>
            <Button onClick={() => setGranted(false)}>Not now</Button>
          </>
        }
      >
        Turn-by-turn directions need live GPS.
      </PermissionPrompt>
    </Screen>
  );
}

export function NotificationCardDemo() {
  const [done, setDone] = useState<string | null>(null);
  return (
    <Screen
      cue={<Cue>{done ?? "Below the sightline, like the real Display"}</Cue>}
    >
      <NotificationCard
        avatar={<Avatar name="Maya Chen" tone="violet" />}
        title="Maya Chen"
        time="now"
        actions={
          <>
            <Button variant="primary" onClick={() => setDone("Replied 👍")}>
              Reply
            </Button>
            <Button onClick={() => setDone("Dismissed")}>Dismiss</Button>
          </>
        }
      >
        Still on for 7? I got us a table by the window.
      </NotificationCard>
    </Screen>
  );
}

export function NowPlayingDemo() {
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(34);
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(
      () => setProgress((p) => (p >= 100 ? 0 : p + 0.5)),
      1000,
    );
    return () => clearInterval(id);
  }, [playing]);
  const total = 212; // 3:32
  const elapsed = Math.round((progress / 100) * total);
  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;
  return (
    <Screen>
      <NowPlaying
        art={
          <GlowIcon size="lg" plate tone="peach" label="Album art">
            <MusicGlyph />
          </GlowIcon>
        }
        title="Weightless"
        artist="Marconi Union"
        progress={progress}
        elapsed={fmt(elapsed)}
        remaining={`-${fmt(total - elapsed)}`}
        controls={
          <Button variant="primary" onClick={() => setPlaying((p) => !p)}>
            {playing ? "Pause" : "Play"}
          </Button>
        }
      />
    </Screen>
  );
}

export function CallCardDemo() {
  const [state, setState] = useState<"ringing" | "active" | "ended">("ringing");
  return (
    <Screen
      cue={
        state === "ended" ? (
          <Cue>Call ended</Cue>
        ) : state === "active" ? (
          <Cue tone="accent">00:07 · connected</Cue>
        ) : undefined
      }
    >
      <CallCard
        avatar={<Avatar name="Dani Ortiz" tone="green" size="lg" />}
        name="Dani Ortiz"
        status={
          state === "ringing"
            ? "Incoming call"
            : state === "active"
              ? "Connected"
              : "Call ended"
        }
        actions={
          state === "ringing" ? (
            <>
              <Button
                variant="primary"
                icon={
                  <GlowIcon size="sm">
                    <PhoneGlyph />
                  </GlowIcon>
                }
                onClick={() => setState("active")}
              >
                Accept
              </Button>
              <Button
                icon={
                  <GlowIcon size="sm">
                    <PhoneOffGlyph />
                  </GlowIcon>
                }
                onClick={() => setState("ended")}
              >
                Decline
              </Button>
            </>
          ) : state === "active" ? (
            <Button onClick={() => setState("ended")}>End call</Button>
          ) : (
            <Button onClick={() => setState("ringing")}>Ring again</Button>
          )
        }
      />
    </Screen>
  );
}

export function ToastDemo() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => setOpen(false), 2400);
    return () => clearTimeout(id);
  }, [open]);
  return (
    <Screen
      cue={
        <Toast open={open} tone="accent">
          Saved to camera roll
        </Toast>
      }
    >
      <Heading>Toast</Heading>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Save photo
      </Button>
    </Screen>
  );
}

export function AsyncViewDemo() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const load = (fail: boolean) => {
    setStatus("loading");
    setTimeout(() => setStatus(fail ? "error" : "success"), 1400);
  };
  return (
    <Screen cue={<Cue>Drive the async state machine</Cue>}>
      <AsyncView status={status} errorLabel="No signal — try again">
        <Readout label="Heart rate" value="128" unit="BPM" />
      </AsyncView>
      <div className="row">
        <Button variant="primary" onClick={() => load(false)}>
          Load
        </Button>
        <Button onClick={() => load(true)}>Fail</Button>
      </div>
    </Screen>
  );
}

export function ProgressDemo() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPct((p) => (p >= 100 ? 0 : p + 2)), 200);
    return () => clearInterval(id);
  }, []);
  return (
    <Screen cue={<Cue>Linear + step, same component</Cue>}>
      <Progress value={pct} label={`${Math.round(pct)}%`} />
      <Progress variant="step" value={Math.ceil((pct / 100) * 4)} max={4} />
    </Screen>
  );
}

export function DictationDemo() {
  const SCRIPT = "Meet me at the north entrance in ten minutes";
  const [words, setWords] = useState(0);
  const [listening, setListening] = useState(true);
  const all = SCRIPT.split(" ");
  useEffect(() => {
    if (!listening) return;
    const id = setInterval(
      () => setWords((w) => (w >= all.length ? 0 : w + 1)),
      450,
    );
    return () => clearInterval(id);
  }, [listening, all.length]);
  return (
    <Screen cue={<Cue>{listening ? "Listening…" : "Paused"}</Cue>}>
      <Dictation
        listening={listening}
        transcript={words > 0 ? all.slice(0, words).join(" ") : undefined}
        placeholder="Start speaking…"
      />
      <Button onClick={() => setListening((l) => !l)}>
        {listening ? "Stop" : "Resume"}
      </Button>
    </Screen>
  );
}

export function ViewfinderDemo() {
  const [recording, setRecording] = useState(false);
  const [zoom, setZoom] = useState(1);
  return (
    <Screen cue={<Cue>{recording ? "Recording" : "Standby"}</Cue>}>
      <Viewfinder zoom={`${zoom}×`} recording={recording}>
        <div className="row">
          <Button variant="primary" onClick={() => setRecording((r) => !r)}>
            {recording ? "Stop" : "Record"}
          </Button>
          <Button onClick={() => setZoom((z) => (z >= 3 ? 1 : z + 1))}>
            Zoom
          </Button>
        </div>
      </Viewfinder>
    </Screen>
  );
}

export function ReticleDemo() {
  const [locked, setLocked] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setLocked((l) => !l), 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <Screen cue={<Cue>{locked ? "Target acquired" : "Aim at a sign"}</Cue>}>
      <Reticle active={locked} label="Aim at a sign" />
    </Screen>
  );
}

export function ButtonDemo() {
  const [count, setCount] = useState(0);
  return (
    <Screen
      cue={<Cue>{count > 0 ? `Logged ×${count}` : "Enter activates"}</Cue>}
    >
      <Readout label="Heart rate" value="128" unit="BPM" />
      <div className="row">
        <Button
          variant="primary"
          icon={
            <GlowIcon size="sm">
              <CheckGlyph />
            </GlowIcon>
          }
          onClick={() => setCount((c) => c + 1)}
        >
          Log
        </Button>
        <Button onClick={() => setCount(0)}>Reset</Button>
      </div>
    </Screen>
  );
}

function NavHome() {
  const nav = useNavigator();
  return (
    <Screen cue={<Cue>Middle pinch (Esc here) goes back</Cue>}>
      <Heading eyebrow="Navigator">Workout</Heading>
      <List>
        <ListRow
          onClick={() => nav.push("session", { kind: "Run" })}
          trailing={<ChevronGlyph />}
        >
          Start a run
        </ListRow>
        <ListRow
          onClick={() => nav.push("session", { kind: "Ride" })}
          trailing={<ChevronGlyph />}
        >
          Start a ride
        </ListRow>
        <ListRow
          onClick={() => nav.push("history")}
          trailing={<ChevronGlyph />}
        >
          History
        </ListRow>
      </List>
    </Screen>
  );
}

function NavSession({ kind }: { kind?: string }) {
  const nav = useNavigator();
  return (
    <Screen cue={<Cue tone="accent">Recording — back pauses</Cue>}>
      <Heading eyebrow={kind}>In progress</Heading>
      <Readout label="Elapsed" value="12:08" />
      <Button variant="primary" onClick={() => nav.push("summary")}>
        Finish
      </Button>
    </Screen>
  );
}

function NavSummary() {
  const nav = useNavigator();
  return (
    <Screen cue={<Cue>popToTop unwinds the whole stack</Cue>}>
      <Heading eyebrow="Saved">Nice run</Heading>
      <Readout label="Distance" value="5.2" unit="km" />
      <Button variant="primary" onClick={() => nav.popToTop()}>
        Done
      </Button>
    </Screen>
  );
}

function NavHistory() {
  const nav = useNavigator();
  return (
    <Screen cue={<Cue>System back returns home</Cue>}>
      <Heading eyebrow="History">This week</Heading>
      <Readout label="Sessions" value="4" />
      <Button onClick={() => nav.pop()}>Back</Button>
    </Screen>
  );
}

export function NavigatorDemo() {
  return (
    <Navigator
      initial="home"
      screens={{
        home: () => <NavHome />,
        session: (params) => <NavSession {...(params as { kind: string })} />,
        summary: () => <NavSummary />,
        history: () => <NavHistory />,
      }}
    />
  );
}

/**
 * Live-orientation wrapper: render the sensor-wired child as-is, but if no
 * `deviceorientation` event lands within ~1.5s (desktop, no sensor), drive a
 * slow simulated sweep so the demo still moves.
 */
function useSimulatedHeading() {
  const [simulated, setSimulated] = useState<number | undefined>(undefined);
  useEffect(() => {
    let real = false;
    const onReal = () => {
      real = true;
      setSimulated(undefined);
      window.removeEventListener("deviceorientation", onReal);
    };
    window.addEventListener("deviceorientation", onReal);
    let sweep: ReturnType<typeof setInterval> | undefined;
    const arm = setTimeout(() => {
      if (real) return;
      let deg = 0;
      sweep = setInterval(() => {
        deg = (deg + 1.5) % 360;
        setSimulated(deg);
      }, 50);
    }, 1500);
    return () => {
      window.removeEventListener("deviceorientation", onReal);
      clearTimeout(arm);
      if (sweep) clearInterval(sweep);
    };
  }, []);
  return simulated;
}

export function CompassDemo() {
  const simulated = useSimulatedHeading();
  return (
    <Screen
      cue={
        <Cue>
          {simulated == null
            ? "Live head orientation"
            : "Simulated sweep — no sensor here"}
        </Cue>
      }
    >
      {/* heading omitted on-device → useDeviceOrientation drives it */}
      <Compass heading={simulated} label="Heading" />
    </Screen>
  );
}

export function DirectionArrowDemo() {
  const simulated = useSimulatedHeading();
  // Aim at SF Ferry Building; on-device, live GPS + head orientation steer it.
  const target = { lat: 37.7955, lon: -122.3937 };
  return (
    <Screen
      cue={
        <Cue tone="accent">
          {simulated == null
            ? "Toward the Ferry Building"
            : "Simulated sweep — no sensor here"}
        </Cue>
      }
    >
      <DirectionArrow
        bearing={simulated}
        target={simulated == null ? target : undefined}
        label="Ferry Building"
      />
      <Readout label="Distance" value="320" unit="m" />
    </Screen>
  );
}

export function TimerDemo() {
  const [running, setRunning] = useState(true);
  const [round, setRound] = useState(0);
  const [done, setDone] = useState(false);
  return (
    <Screen
      cue={
        <Cue tone={done ? "accent" : undefined}>
          {done ? "Done — time's up" : "Pause, resume, or restart"}
        </Cue>
      }
    >
      <Timer
        key={round}
        duration={90}
        running={running}
        label="Rest"
        onComplete={() => setDone(true)}
      />
      <div className="row">
        <Button variant="primary" onClick={() => setRunning((r) => !r)}>
          {running ? "Pause" : "Resume"}
        </Button>
        <Button
          onClick={() => {
            setRound((r) => r + 1);
            setRunning(true);
            setDone(false);
          }}
        >
          Restart
        </Button>
      </div>
    </Screen>
  );
}

export function EmptyStateDemo() {
  const [messages, setMessages] = useState<string[]>([]);
  if (messages.length > 0) {
    return (
      <Screen cue={<Cue>Filled — this is the same screen</Cue>}>
        <List>
          {messages.map((m) => (
            <ListRow key={m} trailing={<ChevronGlyph />}>
              {m}
            </ListRow>
          ))}
        </List>
      </Screen>
    );
  }
  return (
    <Screen cue={<Cue>The action invites the first content</Cue>}>
      <EmptyState
        icon={
          <GlowIcon size="lg" plate label="Messages">
            <MessageGlyph />
          </GlowIcon>
        }
        title="No messages"
        hint="New conversations land here."
        actionLabel="Check now"
        onAction={() => setMessages(["Maya", "Dispatch", "Group ride"])}
      />
    </Screen>
  );
}
