import { GlassViewport } from "@glasskit-ui/react";
import { Screen } from "@registry/ui/screen";
import { Readout } from "@registry/ui/readout";
import { Button } from "@registry/ui/button";
import { Icon } from "@registry/ui/icon";
import { HeartGlyph, CheckGlyph } from "./icons";

/**
 * A glanceable heart-rate "complication": icon + readout + a two-button action,
 * on one 600×600 lens surface. Pure visual; wrap it in <DpadProvider> to
 * drive focus with the arrow keys. (System status is OS chrome, not an app
 * component — the app owns the stage, not the status row.)
 */
export function HeartRateDemo() {
  return (
    <GlassViewport>
      <Screen cue="Recording · pinch to log" cueLive>
        <Icon size="lg" plate tone="peach" label="Heart rate">
          <HeartGlyph />
        </Icon>
        <Readout label="Heart rate" value="128" unit="BPM" />
        <div className="row">
          <Button
            variant="primary"
            icon={
              <Icon size="sm">
                <CheckGlyph />
              </Icon>
            }
          >
            Log
          </Button>
          <Button>Dismiss</Button>
        </div>
      </Screen>
    </GlassViewport>
  );
}
