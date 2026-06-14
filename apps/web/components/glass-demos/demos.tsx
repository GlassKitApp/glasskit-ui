"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Screen } from "@registry/ui/screen";
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
import { ComposeFlow } from "@registry/ui/compose-flow";
import { PermissionPrompt } from "@registry/ui/permission-prompt";
import { Timer } from "@registry/ui/timer";
import { EmptyState } from "@registry/ui/empty-state";
import { NotificationCard } from "@registry/ui/notification-card";
import { NowPlaying } from "@registry/ui/now-playing";
import { CallCard } from "@registry/ui/call-card";
import { Toaster, toast } from "@registry/ui/toaster";
import { AsyncView } from "@registry/ui/async-view";
import { Progress } from "@registry/ui/progress";
import { List, ListRow } from "@registry/ui/list";
import { Navigator, useNavigator } from "@registry/ui/navigator";
import { Compass } from "@registry/ui/compass";
import { DirectionArrow } from "@registry/ui/direction-arrow";
import { Heading } from "@registry/ui/heading";
import { Readout } from "@registry/ui/readout";
import { Avatar } from "@registry/ui/avatar";
import { Icon } from "@registry/ui/icon";
import {
  CheckGlyph,
  ChevronGlyph,
  MessageGlyph,
  MusicGlyph,
  NavGlyph,
  PhoneGlyph,
  PhoneOffGlyph,
  VolumeGlyph,
  CameraGlyph,
  PlayGlyph,
  PauseGlyph,
  TrackNextGlyph,
  TrackPrevGlyph,
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
    <Screen cue="Enter flips the focused switch">
      <Heading>Quick controls</Heading>
      <Toggle checked={wifi} onChange={setWifi} label="Wi-Fi" />
      <Toggle checked={dnd} onChange={setDnd} label="Do not disturb" />
    </Screen>
  );
}

export function ListDemo() {
  const [opened, setOpened] = useState<string | null>(null);
  // Twice the fold on purpose: walking focus past the bottom proves the
  // list scrolls with the D-pad (native focus() scrolling + the thumb).
  const rows = [
    "Messages",
    "Navigation",
    "Music",
    "Camera",
    "Settings",
    "Weather",
    "Timer",
    "Photos",
    "Calls",
    "Translate",
  ];
  return (
    <Screen
      cue={
        opened
          ? `Opened ${opened}`
          : "Up / down walks the rows — keep going, it scrolls"
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
    <Screen cue="Focus − / + and press Enter">
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
    <Screen cue="Arrow keys adjust while focused">
      <Slider
        value={volume}
        onChange={setVolume}
        label={`Volume · ${volume}`}
        icon={
          <Icon size="sm">
            <VolumeGlyph />
          </Icon>
        }
      />
    </Screen>
  );
}

export function SegmentedDemo() {
  const [view, setView] = useState<"map" | "list">("map");
  return (
    <Screen cue={`Showing the ${view} view`}>
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
    <Screen
      status={
        <Tabs
          value={tab}
          onChange={setTab}
          items={[
            { id: "controls", label: "Controls" },
            { id: "home", label: "Home" },
            { id: "apps", label: "Apps" },
          ]}
        />
      }
      cue={LABELS[tab]}
    >
      <Readout label="Active tab" value={LABELS[tab] ?? tab} />
    </Screen>
  );
}

export function ConfirmDemo() {
  const [answer, setAnswer] = useState<string | null>(null);
  if (answer) {
    return (
      <Screen cue={answer} cueLive>
        <Heading>Recording</Heading>
        <Button onClick={() => setAnswer(null)}>Again</Button>
      </Screen>
    );
  }
  return (
    <Screen>
      <Confirm
        title="Discard recording?"
        message="12:48 of footage will be permanently deleted. This can't be undone."
        confirmLabel="Discard"
        cancelLabel="Keep"
        destructive
        onConfirm={() => setAnswer("Recording discarded")}
        onCancel={() => setAnswer("Still recording")}
      />
    </Screen>
  );
}

export function QuickReplyChipsDemo() {
  const [sent, setSent] = useState<string | null>(null);
  return (
    <Screen
      cue={sent ? `Sent: “${sent}”` : "“Running late?”"}
      cueLive={!!sent}
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
    <Screen cue="Swipe the band (or press Next) to advance">
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
    <Screen cue={opened ? `Opening ${opened}…` : "Pick an app"}>
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

export function PermissionPromptDemo() {
  const [granted, setGranted] = useState<boolean | null>(null);
  if (granted != null) {
    return (
      <Screen
        cue={granted ? "Location on" : "Denied"}
        cueLive
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
          <Icon size="lg" plate tone="cyan" label="Location">
            <NavGlyph />
          </Icon>
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
      cue={done ?? "Below the sightline, like the real Display"}
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
  const total = 238; // Teenage Dirtbag, 3:58
  const elapsed = Math.round((progress / 100) * total);
  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;
  return (
    <Screen>
      <NowPlaying
        art={
          <img
            src="https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/f7/c3/33/f7c333e4-b2b5-b49d-1406-f51bdac6a8aa/mzi.bllmhdje.jpg/300x300bb.jpg"
            alt="Teenage Dirtbag album art"
          />
        }
        title="Teenage Dirtbag"
        artist="Wheatus"
        progress={progress}
        elapsed={fmt(elapsed)}
        remaining={`-${fmt(total - elapsed)}`}
        controls={
          <>
            <Button aria-label="Previous" icon={<TrackPrevGlyph />} />
            <Button
              variant="primary"
              aria-label={playing ? "Pause" : "Play"}
              icon={playing ? <PauseGlyph /> : <PlayGlyph />}
              onClick={() => setPlaying((p) => !p)}
            />
            <Button aria-label="Next" icon={<TrackNextGlyph />} />
          </>
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
        state === "ended"
          ? "Call ended"
          : state === "active"
            ? "00:07 · connected"
            : undefined
      }
      cueLive={state === "active"}
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
                variant="positive"
                icon={
                  <Icon size="sm">
                    <PhoneGlyph />
                  </Icon>
                }
                onClick={() => setState("active")}
              >
                Accept
              </Button>
              <Button
                variant="danger"
                icon={
                  <Icon size="sm">
                    <PhoneOffGlyph />
                  </Icon>
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

export function ToasterDemo() {
  // One toast system. A toast is normally fire-and-forget, but it can be
  // interactive: give it a focusable `action`, and DISMISS it when acted on so
  // it never lingers. Each screen seeds the ring on its primary button, so the
  // D-pad flow stays predictable across the toast -> detail -> back hop.
  const [opened, setOpened] = useState(false);
  return (
    <>
      {opened ? (
        <Screen cue="Pinch Back to return">
          <Heading eyebrow="Maya Lin">Message</Heading>
          <p className="t-body text-foreground-faint">
            On my way, be there in 5
          </p>
          <Button
            variant="primary"
            initialFocus
            onClick={() => setOpened(false)}
          >
            Back
          </Button>
        </Screen>
      ) : (
        <Screen cue="Notify, then pinch View on the toast">
          <Heading>Toaster</Heading>
          <Button
            variant="primary"
            initialFocus
            onClick={() =>
              toast("Maya Lin", {
                description: "On my way, be there in 5",
                action: {
                  label: "View",
                  onClick: () => {
                    toast.dismiss();
                    setOpened(true);
                  },
                },
                duration: Infinity,
              })
            }
          >
            Notify
          </Button>
        </Screen>
      )}
      <Toaster />
    </>
  );
}

export function AsyncViewDemo() {
  // Starts on success so the preview shows content; Load/Fail re-drive it.
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("success");
  const load = (fail: boolean) => {
    setStatus("loading");
    setTimeout(() => setStatus(fail ? "error" : "success"), 1400);
  };
  return (
    <Screen cue="Drive the async state machine">
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
  // Seeded mid-flight: a 0% first frame renders an empty, invisible bar.
  const [pct, setPct] = useState(64);
  useEffect(() => {
    const id = setInterval(() => setPct((p) => (p >= 100 ? 0 : p + 2)), 200);
    return () => clearInterval(id);
  }, []);
  return (
    <Screen cue="Linear + step, same component">
      <Progress value={pct} label={`${Math.round(pct)}%`} />
      <Progress variant="step" value={Math.ceil((pct / 100) * 4)} max={4} />
    </Screen>
  );
}

export function ButtonDemo() {
  const [count, setCount] = useState(0);
  return (
    <Screen
      cue={count > 0 ? `Logged ×${count}` : "Enter activates"}
    >
      <Readout label="Heart rate" value="128" unit="BPM" />
      <div className="row">
        <Button
          variant="primary"
          icon={
            <Icon size="sm">
              <CheckGlyph />
            </Icon>
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
    <Screen cue="Middle pinch (Esc here) goes back">
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
    <Screen cue="Recording — back pauses" cueLive>
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
    <Screen cue="popToTop unwinds the whole stack">
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
    <Screen cue="System back returns home">
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
        simulated == null
          ? "Live head orientation"
          : "Simulated sweep — no sensor here"
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
        simulated == null
          ? "Toward the Ferry Building"
          : "Simulated sweep — no sensor here"
      }
      cueLive
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
      cue={done ? "Done — time's up" : "Pause, resume, or restart"}
      cueLive={done}
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
  const [checking, setChecking] = useState(false);
  // An honest refresh: flips to a brief loading state, then returns to empty.
  // Nothing magically appears — the screen has no photos, and still doesn't.
  const refresh = () => {
    if (checking) return;
    setChecking(true);
    setTimeout(() => setChecking(false), 1400);
  };
  return (
    <Screen cue={checking ? "Checking…" : "Nothing here yet"} cueLive={checking}>
      <EmptyState
        icon={
          <Icon size="lg" plate label="Photos">
            <CameraGlyph />
          </Icon>
        }
        title="No photos yet"
        hint="Photos you capture show up here."
        actionLabel={checking ? "Checking…" : "Refresh"}
        onAction={refresh}
      />
    </Screen>
  );
}

export function ComposeFlowDemo() {
  const [reply, setReply] = useState<string | null>(null);
  return (
    <Screen
      cue={
        reply
          ? "Sent — pinch to change"
          : "Pinch the field · pinch back closes"
      }
    >
      <ComposeFlow
        label="Reply"
        value={reply}
        placeholder="Pinch to enter text"
        options={["On my way", "5 min", "Call me", "Can't talk now"]}
        pickerTitle="Quick replies"
        onChange={setReply}
      />
    </Screen>
  );
}
