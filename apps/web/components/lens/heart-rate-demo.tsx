import { GlassViewport } from "@glasskit/glasses-ui";
import { Screen } from "@registry/ui/screen";
import { StatusBar } from "@registry/ui/status-bar";
import { Readout } from "@registry/ui/readout";
import { Cue } from "@registry/ui/cue";
import { Button } from "@registry/ui/button";
import { GlowIcon } from "@registry/ui/glow-icon";
import { HeartGlyph, CheckGlyph, BatteryGlyph } from "./icons";

/**
 * The Wave 1 spine, composed: a glanceable heart-rate "complication".
 * Every styled component on one 600×600 additive surface — StatusBar,
 * Readout, Cue, Button, GlowIcon, inside a Screen. Pure visual; wrap it
 * in <DpadProvider> to drive focus with the arrow keys.
 */
export function HeartRateDemo() {
  return (
    <GlassViewport>
      <Screen
        status={
          <StatusBar
            start="9:41"
            end={
              <>
                <GlowIcon size="sm" label="Battery">
                  <BatteryGlyph />
                </GlowIcon>
                87%
              </>
            }
          />
        }
        cue={<Cue tone="accent">Recording · tap to log</Cue>}
      >
        <GlowIcon size="lg" active label="Heart rate">
          <HeartGlyph />
        </GlowIcon>
        <Readout label="Heart rate" value="128" unit="BPM" />
        <div className="row">
          <Button variant="primary" icon={<GlowIcon size="sm"><CheckGlyph /></GlowIcon>}>
            Log
          </Button>
          <Button>Dismiss</Button>
        </div>
      </Screen>
    </GlassViewport>
  );
}
