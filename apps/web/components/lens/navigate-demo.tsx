"use client";

import { useEffect, useState } from "react";
import { GlassViewport } from "@glasskit-ui/react";
import { Screen } from "@registry/ui/screen";
import { Cue } from "@registry/ui/cue";
import { Readout } from "@registry/ui/readout";
import { DirectionArrow } from "@registry/ui/direction-arrow";

/**
 * Point-to-target wayfinding — "find your friend." No map: a single arrow
 * locked on Maya's position. There's no head sensor in the browser, so we
 * simulate you looking around (the heading drifts) — the needle swings to
 * keep pointing at her, which is exactly the on-device behaviour.
 */
export function NavigateDemo() {
  const [bearing, setBearing] = useState(34);
  useEffect(() => {
    let t = 0;
    const id = setInterval(() => {
      t += 0.07;
      // Swing ±28° around "that way" — the arrow tracking a fixed person as
      // your head turns, not a 360° spinner.
      setBearing(Math.round(34 + 28 * Math.sin(t)));
    }, 60);
    return () => clearInterval(id);
  }, []);

  return (
    <GlassViewport>
      <Screen cue={<Cue emphasis="accent">Maya is this way</Cue>}>
        <DirectionArrow bearing={bearing} label="Maya" />
        <Readout label="Distance" value="240" unit="m" />
      </Screen>
    </GlassViewport>
  );
}
