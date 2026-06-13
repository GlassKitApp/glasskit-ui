import { GlassViewport } from "@glasskit-ui/react";
import { Screen } from "@registry/ui/screen";
import { Cue } from "@registry/ui/cue";
import { StatusDot } from "@registry/ui/status-dot";
import { Pin } from "@registry/ui/pin";
import { Callout } from "@registry/ui/callout";

/** An AR scene with world-anchored Pin + Callout markers around the center. */
export function ExploreDemo() {
  return (
    <GlassViewport>
      <Screen
        cue={
          <Cue icon={<StatusDot status="live" label="AR" />}>
            Center a pin to select
          </Cue>
        }
      >
        {null}
      </Screen>
      <Pin x={72} y={34} label="Blue Bottle" distance="120 m" />
      <Callout x={26} y={62} label="Powell St" detail="Muni · 3 min" />
    </GlassViewport>
  );
}
