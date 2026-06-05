import { GlassViewport } from "@glasskit/glasses-ui";
import { Screen } from "@registry/ui/screen";
import { StatusBar } from "@registry/ui/status-bar";
import { Cue } from "@registry/ui/cue";
import { Meter } from "@registry/ui/meter";
import { StatGrid } from "@registry/ui/stat-grid";
import { StatusDot } from "@registry/ui/status-dot";

/** A live workout monitor — StatusDot, Meter ring gauge, and a StatGrid cluster. */
export function StatsDemo() {
  return (
    <GlassViewport>
      <Screen
        status={
          <StatusBar
            start={<StatusDot tone="live" label="GPS" />}
            end="87%"
          />
        }
        cue={<Cue>3.2 km · 18:40</Cue>}
      >
        <Meter value={72} max={100} label="Effort" unit="%" />
        <StatGrid
          items={[
            { label: "Pace", value: "8'42", unit: "/mi" },
            { label: "Heart", value: 128, unit: "bpm" },
          ]}
        />
      </Screen>
    </GlassViewport>
  );
}
