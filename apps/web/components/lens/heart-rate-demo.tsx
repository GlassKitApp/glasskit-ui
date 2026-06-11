import { GlassViewport } from "@glasskit-ui/react";
import { Screen } from "@registry/ui/screen";
import { Readout } from "@registry/ui/readout";
import { Cue } from "@registry/ui/cue";
import { Button } from "@registry/ui/button";
import { GlowIcon } from "@registry/ui/glow-icon";
import { HeartGlyph, CheckGlyph } from "./icons";

/**
 * A glanceable heart-rate "complication": icon + readout + a two-button action,
 * on one 600×600 additive surface. Pure visual; wrap it in <DpadProvider> to
 * drive focus with the arrow keys. (System status is OS chrome, not an app
 * component — the app owns the stage, not the status row.)
 */
export function HeartRateDemo() {
  return (
    <GlassViewport>
      <Screen cue={<Cue tone="accent">Recording · tap to log</Cue>}>
        <GlowIcon size="lg" plate tone="peach" label="Heart rate">
          <HeartGlyph />
        </GlowIcon>
        <Readout label="Heart rate" value="128" unit="BPM" />
        <div className="row">
          <Button
            variant="primary"
            icon={
              <GlowIcon size="sm">
                <CheckGlyph />
              </GlowIcon>
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
