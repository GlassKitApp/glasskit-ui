"use client";

import { useState } from "react";
import { Navigator, useNavigator } from "./navigator";
import { Screen } from "./screen";
import { Heading } from "./heading";
import { List, ListRow } from "./list";
import { StatGrid } from "./stat-grid";
import { StatusDot } from "./status-dot";
import { Timer } from "./timer";
import { Button } from "./button";
import { Confirm } from "./confirm";
import { EmptyState } from "./empty-state";
import { Icon } from "./icon";

/**
 * <Workout> — a fitness companion: a workout list, a live session, and a rest
 * timer, composed from Navigator, Timer, and a destructive Confirm.
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

function HeartGlyph() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
    </svg>
  );
}

function ChevronGlyph() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 6l6 6l-6 6" />
    </svg>
  );
}
