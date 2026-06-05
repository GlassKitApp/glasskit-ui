import { GlassViewport } from "@glasskit/glasses-ui";
import { Screen } from "@registry/ui/screen";
import { StatusBar } from "@registry/ui/status-bar";
import { Cue } from "@registry/ui/cue";
import { Readout } from "@registry/ui/readout";
import { DirectionArrow } from "@registry/ui/direction-arrow";

/** A world-anchored turn-by-turn screen — DirectionArrow + distance Readout. */
export function NavigateDemo() {
  return (
    <GlassViewport>
      <Screen
        status={<StatusBar start="9:41" end="87%" />}
        cue={<Cue tone="accent">Turn right onto Market St</Cue>}
      >
        <DirectionArrow bearing={35} />
        <Readout label="Market St" value="320" unit="m" />
      </Screen>
    </GlassViewport>
  );
}
