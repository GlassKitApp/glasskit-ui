"use client";

import { useState } from "react";
import { GlassViewport } from "@glasskit/glasses-ui";
import { Screen } from "@registry/ui/screen";
import { Cue } from "@registry/ui/cue";
import { Stepper } from "@registry/ui/stepper";
import { Toggle } from "@registry/ui/toggle";
import { Segmented } from "@registry/ui/segmented";

/** Live settings screen — Stepper, Toggle and Segmented all wired to state. */
export function SettingsDemo() {
  const [brightness, setBrightness] = useState(3);
  const [notify, setNotify] = useState(true);
  const [mode, setMode] = useState<"map" | "list">("map");

  return (
    <GlassViewport>
      <Screen cue={<Cue>Pinch to go back</Cue>}>
        <Stepper
          label="Brightness"
          value={brightness}
          min={1}
          max={5}
          onChange={setBrightness}
        />
        <Toggle
          label="Notifications"
          checked={notify}
          onChange={setNotify}
        />
        <Segmented
          value={mode}
          onChange={setMode}
          options={[
            { value: "map", label: "Map" },
            { value: "list", label: "List" },
          ]}
        />
      </Screen>
    </GlassViewport>
  );
}
