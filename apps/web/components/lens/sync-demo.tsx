import { GlassViewport } from "@glasskit/glasses-ui";
import { Screen } from "@registry/ui/screen";
import { StatusBar } from "@registry/ui/status-bar";
import { Cue } from "@registry/ui/cue";
import { Readout } from "@registry/ui/readout";
import { Progress } from "@registry/ui/progress";
import { AsyncView, Spinner } from "@registry/ui/async-view";

/** A data screen mid-sync — AsyncView (loading) wrapping a Spinner + step Progress. */
export function SyncDemo() {
  return (
    <GlassViewport>
      <Screen
        status={<StatusBar start="9:41" end="87%" />}
        cue={<Cue tone="accent">Keep glasses on</Cue>}
      >
        <AsyncView
          status="loading"
          loading={
            <div className="gk-async">
              <Spinner label="Syncing" />
              <Readout label="Syncing route" value="3" unit="/ 5" emphasis="secondary" />
              <Progress variant="step" value={3} max={5} />
            </div>
          }
        >
          {/* success state would render the route here */}
        </AsyncView>
      </Screen>
    </GlassViewport>
  );
}
