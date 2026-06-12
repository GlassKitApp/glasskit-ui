import { GlassViewport } from "@glasskit-ui/react";
import { Screen } from "@registry/ui/screen";
import { Cue } from "@registry/ui/cue";
import { Meter } from "@registry/ui/meter";
import { StatGrid } from "@registry/ui/stat-grid";
import { StatusDot } from "@registry/ui/status-dot";

/** A live workout monitor — a Meter ring gauge and a StatGrid cluster, with a
 * live StatusDot in the cue. */
export function StatsDemo() {
  return (
    <GlassViewport>
      <Screen
        cue={
          <Cue icon={<StatusDot status="live" label="GPS" />}>
            3.2 km · 18:40
          </Cue>
        }
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
