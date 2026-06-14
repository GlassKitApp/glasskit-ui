import { GlassViewport } from "@glasskit-ui/react";
import { Screen } from "@registry/ui/screen";
import { Readout } from "@registry/ui/readout";
import { Progress } from "@registry/ui/progress";
import { AsyncView, Spinner } from "@registry/ui/async-view";

/** A data screen mid-sync — AsyncView (loading) wrapping a Spinner + step Progress. */
export function SyncDemo() {
  return (
    <GlassViewport>
      <Screen cue="Keep glasses on" cueLive>
        <AsyncView
          status="loading"
          loading={
            <div className="gk-async">
              <Spinner label="Syncing" />
              <Readout
                label="Syncing route"
                value="3"
                unit="/ 5"
                emphasis="secondary"
              />
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
