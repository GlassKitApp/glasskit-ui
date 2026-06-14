import { GlassViewport } from "@glasskit-ui/react";
import { Screen } from "@registry/ui/screen";
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
          <>
            <StatusDot status="live" label="GPS" /> 3.2 km · 18:40
          </>
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
