"use client";

import { useState } from "react";
import { Navigator, useNavigator } from "@registry/ui/navigator";
import { Screen } from "@registry/ui/screen";
import { Heading } from "@registry/ui/heading";
import { List, ListRow } from "@registry/ui/list";
import { StatGrid } from "@registry/ui/stat-grid";
import { StatusDot } from "@registry/ui/status-dot";
import { Timer } from "@registry/ui/timer";
import { Button } from "@registry/ui/button";
import { Confirm } from "@registry/ui/confirm";
import { EmptyState } from "@registry/ui/empty-state";
import { Icon } from "@registry/ui/icon";
import { HeartGlyph, ChevronGlyph } from "@/components/lens/icons";

/**
 * Workout — a complete example app: Navigator hierarchy (list → detail),
 * a live session screen, a rest timer, and a destructive end-confirm that
 * seeds the D-pad ring on the safe action. Middle pinch (Escape on desktop)
 * walks back up; pop restores focus to the row you came from.
 */
export function WorkoutApp() {
  return (
    <Navigator
      screens={{
        home: () => <Home />,
        run: () => <Run />,
        rest: () => <Rest />,
        end: () => <End />,
        history: () => <History />,
      }}
      initial="home"
    />
  );
}

function Home() {
  const nav = useNavigator();
  return (
    <Screen cue="Pinch opens · middle pinch backs out">
      <Heading eyebrow="Workout">Today</Heading>
      <List>
        <ListRow
          leading={
            <Icon size="sm" plate tone="peach" label="Run">
              <HeartGlyph />
            </Icon>
          }
          trailing={<ChevronGlyph />}
          onClick={() => nav.push("run")}
        >
          Start a run
        </ListRow>
        <ListRow trailing={<ChevronGlyph />} onClick={() => nav.push("rest")}>
          Rest timer
        </ListRow>
        <ListRow
          trailing={<ChevronGlyph />}
          onClick={() => nav.push("history")}
        >
          History
        </ListRow>
      </List>
    </Screen>
  );
}

function Run() {
  const nav = useNavigator();
  return (
    <Screen
      status={
        <span className="t-caption text-foreground-faint">
          <StatusDot status="live" label="GPS" /> Recording
        </span>
      }
      cue="Stats update as you move"
    >
      <StatGrid
        items={[
          { label: "Pace", value: "8'42", unit: "/mi" },
          { label: "Heart", value: 128, unit: "bpm" },
          { label: "Dist", value: "3.2", unit: "km" },
          { label: "Time", value: "18:40" },
        ]}
      />
      <Button variant="primary" onClick={() => nav.push("end")}>
        End workout
      </Button>
    </Screen>
  );
}

function Rest() {
  const [running, setRunning] = useState(true);
  const [round, setRound] = useState(0);
  return (
    <Screen cue="Middle pinch returns to the list">
      <Timer key={round} duration={90} running={running} label="Rest" />
      <div className="row">
        <Button variant="primary" onClick={() => setRunning((r) => !r)}>
          {running ? "Pause" : "Resume"}
        </Button>
        <Button
          onClick={() => {
            setRound((r) => r + 1);
            setRunning(true);
          }}
        >
          Restart
        </Button>
      </div>
    </Screen>
  );
}

function End() {
  const nav = useNavigator();
  return (
    <Screen cue="The ring seeds on the safe action">
      {/* destructive: ending discards the live session — focus starts on
          "Keep going" so a blind pinch can't end the run. */}
      <Confirm
        destructive
        title="End workout?"
        message="42 minutes will be saved."
        confirmLabel="End"
        cancelLabel="Keep going"
        onConfirm={() => nav.popToTop()}
        onCancel={() => nav.pop()}
      />
    </Screen>
  );
}

function History() {
  return (
    <Screen cue="Nothing here yet">
      <EmptyState
        title="No workouts"
        hint="Finished sessions land here."
        actionLabel="Start one"
      />
    </Screen>
  );
}
