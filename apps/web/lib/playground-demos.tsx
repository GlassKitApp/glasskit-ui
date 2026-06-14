import type { ReactNode } from "react";
import { HeartRateDemo } from "@/components/lens/heart-rate-demo";
import { MenuDemo } from "@/components/lens/menu-demo";
import { SyncDemo } from "@/components/lens/sync-demo";
import { NavigateDemo } from "@/components/lens/navigate-demo";
import { SettingsDemo } from "@/components/lens/settings-demo";
import { StatsDemo } from "@/components/lens/stats-demo";
import { LauncherDemo } from "@/components/lens/launcher-demo";
import { MapDemo } from "@/components/lens/map-demo";

export type PlaygroundDemo = {
  id: string;
  label: string;
  caption: string;
  node: ReactNode;
  /** Illustrative copy-paste snippet (simplified icon names) — teaches the
   *  shape, not byte-identical to the demo source. */
  code: string;
};

/**
 * The playground demos — shared between the interactive playground
 * (PlaygroundClient) and the full-screen glass route at /play/<id> (the
 * "run on glasses" QR target). Single source of truth so the two can't drift.
 */
export const PLAYGROUND_DEMOS: PlaygroundDemo[] = [
  {
    id: "map",
    label: "Map",
    caption: "MapView · real Leaflet map — D-pad the pins, Enter routes you",
    node: <MapDemo />,
    code: `<GlassViewport>
  {/* A real moving map (Leaflet, dark tiles). The photo pins are D-pad
      focusable — Enter routes you there along real roads. */}
  <MapView
    center={[40.7411, -73.9897]}
    places={restaurants}
    route={selectedRoute}
    onSelectPlace={setSelected}
  />
  <Screen status={<span className="t-caption text-primary">Eleven Madison · 738 m · 9 min</span>}>
    {null}
  </Screen>
</GlassViewport>`,
  },
  {
    id: "vitals",
    label: "Vitals",
    caption: "Screen · Readout · Button · Icon",
    node: <HeartRateDemo />,
    code: `<GlassViewport>
  <Screen cue="Recording · pinch to log" cueLive>
    <Icon size="lg" active><HeartIcon /></Icon>
    <Readout label="Heart rate" value="128" unit="BPM" />
    <div className="row">
      <Button variant="primary" icon={<Icon size="sm"><CheckIcon /></Icon>}>
        Log
      </Button>
      <Button>Dismiss</Button>
    </div>
  </Screen>
</GlassViewport>`,
  },
  {
    id: "menu",
    label: "Menu",
    caption: "List · ListRow · Icon",
    node: <MenuDemo />,
    code: `<GlassViewport>
  <Screen>
    <List>
      <ListRow leading={<Icon size="sm"><NavIcon /></Icon>}
               trailing={<Icon size="sm"><ChevronIcon /></Icon>}>
        Navigate
      </ListRow>
      <ListRow leading={<Icon size="sm"><MessageIcon /></Icon>} trailing="2">
        Messages
      </ListRow>
      {/* …more rows than fit — the focus engine scrolls the list */}
    </List>
  </Screen>
</GlassViewport>`,
  },
  {
    id: "sync",
    label: "Sync",
    caption: "AsyncView · Spinner · Progress",
    node: <SyncDemo />,
    code: `<GlassViewport>
  <Screen cue="Keep glasses on" cueLive>
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
      {/* success state renders the route here */}
    </AsyncView>
  </Screen>
</GlassViewport>`,
  },
  {
    id: "navigate",
    label: "Find",
    caption: "DirectionArrow · point-to-target wayfinding (no map needed)",
    node: <NavigateDemo />,
    code: `<GlassViewport>
  <Screen cue="Maya is this way" cueLive>
    {/* self-wired: useGeolocation + useDeviceOrientation aim the needle at a
        real {lat, lon} — finding a friend, your car, an off-screen pin */}
    <DirectionArrow target={{ lat: 37.7955, lon: -122.3937 }} label="Maya" />
    <Readout label="Distance" value="240" unit="m" />
  </Screen>
</GlassViewport>`,
  },
  {
    id: "settings",
    label: "Settings",
    caption: "Stepper · Toggle · Segmented (live — arrow + Enter)",
    node: <SettingsDemo />,
    code: `function Settings() {
  const [brightness, setBrightness] = useState(3);
  const [notify, setNotify] = useState(true);
  const [mode, setMode] = useState("map");

  return (
    <Screen cue="Pinch to go back">
      <Stepper label="Brightness" value={brightness}
               min={1} max={5} onChange={setBrightness} />
      <Toggle label="Notifications" checked={notify} onChange={setNotify} />
      <Segmented value={mode} onChange={setMode}
        options={[{ value: "map", label: "Map" }, { value: "list", label: "List" }]} />
    </Screen>
  );
}`,
  },
  {
    id: "stats",
    label: "Stats",
    caption: "StatusDot · Meter · StatGrid",
    node: <StatsDemo />,
    code: `<GlassViewport>
  <Screen cue={<><StatusDot status="live" label="GPS" /> 3.2 km · 18:40</>}>
    <Meter value={72} max={100} label="Effort" unit="%" />
    <StatGrid items={[
      { label: "Pace", value: "8'42", unit: "/mi" },
      { label: "Heart", value: 128, unit: "bpm" },
    ]} />
  </Screen>
</GlassViewport>`,
  },
  {
    id: "launcher",
    label: "Launcher",
    caption: "Launcher app grid · Icon",
    node: <LauncherDemo />,
    code: `<Screen>
  <Launcher apps={[
    { id: "nav", label: "Navigate", tagline: "320 m",
      icon: <Icon active><NavIcon /></Icon>, onSelect: openNav },
    { id: "msg", label: "Messages", tagline: "2 new",
      icon: <Icon><MessageIcon /></Icon>, onSelect: openMessages },
    // …
  ]} />
</Screen>`,
  },
];

export function getPlaygroundDemo(id: string): PlaygroundDemo | undefined {
  return PLAYGROUND_DEMOS.find((d) => d.id === id);
}
