"use client";

import { useState } from "react";
import { GlassViewport } from "@glasskit-ui/react";
import { Screen } from "@registry/ui/screen";
import { MapView } from "@registry/ui/map-view";
import { BAKED_ROUTES } from "./map-routes";

// Flatiron, NYC — the grid reads cleaner than SF's diagonals.
const YOU: [number, number] = [40.7411, -73.9897];
const IMG = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=120&h=120&fit=crop&q=70`;

const PLACES = [
  {
    at: [40.7423, -73.9899] as [number, number],
    name: "Eataly",
    rating: "4.6",
    image: IMG("1517248135467-4c7edcad34c4"),
  },
  {
    at: [40.7416, -73.9881] as [number, number],
    name: "Shake Shack",
    rating: "4.5",
    image: IMG("1565299624946-b28f40a0ae38"),
  },
  {
    at: [40.7384, -73.9884] as [number, number],
    name: "Gramercy Tavern",
    rating: "4.8",
    image: IMG("1414235077428-338989a2e8c0"),
  },
  {
    at: [40.7419, -73.9869] as [number, number],
    name: "Eleven Madison",
    rating: "4.9",
    image: IMG("1559339352-11d035aa65de"),
  },
  {
    at: [40.7396, -73.9911] as [number, number],
    name: "Sweetgreen",
    rating: "4.4",
    image: IMG("1555396273-367ea4eb4db5"),
  },
];

/** Browse the restaurant pins with the D-pad; Enter on one routes you there —
 *  the line follows real SF roads (geometry baked from OSRM once, so the demo
 *  makes zero routing requests). The goal is always whatever you selected; the
 *  focus engine drives the whole map. */
export function MapDemo() {
  const [sel, setSel] = useState<number | null>(null);
  const dest = sel != null ? PLACES[sel]! : null;
  const baked = sel != null ? BAKED_ROUTES[sel]! : null;
  const route = baked?.path;

  return (
    <GlassViewport>
      <MapView
        center={YOU}
        zoom={16}
        places={PLACES}
        route={route}
        onSelectPlace={setSel}
      />
      <Screen
        status={
          <span className="t-caption text-primary">
            {dest && baked
              ? `${dest.name} · ${baked.meters} m · ${baked.mins} min`
              : "5 spots nearby"}
          </span>
        }
        cue={dest ? "Routing there" : "Arrow between spots · Enter to go"}
      >
        {null}
      </Screen>
    </GlassViewport>
  );
}
