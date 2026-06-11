import { GlassViewport } from "@glasskit-ui/react";
import { Screen } from "@registry/ui/screen";
import { Cue } from "@registry/ui/cue";
import { Reticle } from "@registry/ui/reticle";
import { StatusDot } from "@registry/ui/status-dot";
import { Pin } from "@registry/ui/pin";
import { Callout } from "@registry/ui/callout";

/** An AR scene — world-anchored Pin + Callout markers over a gaze Reticle. */
export function ExploreDemo() {
  return (
    <GlassViewport>
      <Screen
        cue={
          <Cue icon={<StatusDot tone="live" label="AR" />}>
            Look at a pin to select
          </Cue>
        }
      >
        <Reticle />
      </Screen>
      <Pin x={72} y={34} label="Blue Bottle" distance="120 m" />
      <Callout x={26} y={62} label="Powell St" detail="Muni · 3 min" />
    </GlassViewport>
  );
}
