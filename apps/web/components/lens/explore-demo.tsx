import { GlassViewport } from "@glasskit-ui/react";
import { Screen } from "@registry/ui/screen";
import { StatusDot } from "@registry/ui/status-dot";
import { Pin } from "@registry/ui/pin";

/** An AR scene with a world-anchored Pin marker near the center. */
export function ExploreDemo() {
  return (
    <GlassViewport>
      <Screen
        cue={
          <>
            <StatusDot status="live" label="AR" /> Center a pin to select
          </>
        }
      >
        {null}
      </Screen>
      <Pin x={72} y={34} label="Blue Bottle" distance="120 m" />
    </GlassViewport>
  );
}
