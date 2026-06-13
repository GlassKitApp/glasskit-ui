"use client";

import { useState } from "react";
import { Screen } from "@registry/ui/screen";
import { Cue } from "@registry/ui/cue";
import { Grid } from "@registry/ui/grid";
import { MediaThumb } from "@registry/ui/media-thumb";

const IMG = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=240&h=240&fit=crop&q=70`;

// Square crops so the cells line up: Grid is the aligned counterpart to Masonry.
const PHOTOS = [
  { id: "1501785888041-af3ef285b470", label: "Summit" },
  { id: "1441974231531-c6227db76b6e", label: "Pines" },
  { id: "1433086966358-54859d0ed716", label: "Falls" },
  { id: "1426604966848-d7adac402bff", label: "Valley" },
  { id: "1518495973542-4542c06a5843", label: "Canopy" },
  { id: "1469474968028-56623f02e42e", label: "Golden" },
];

/** An aligned photo grid: D-pad walks the cells, Enter opens one. */
export function MediaGridDemo() {
  const [sel, setSel] = useState<number | null>(null);
  const picked = sel != null ? PHOTOS[sel]! : null;

  return (
    <Screen
      status={
        <span className="t-caption">
          {picked ? picked.label : `Grid · ${PHOTOS.length} photos`}
        </span>
      }
      cue={<Cue>{picked ? `Opening ${picked.label}` : "Arrow the cells · Enter opens"}</Cue>}
    >
      <Grid columns={2}>
        {PHOTOS.map((photo, i) => (
          <MediaThumb
            key={photo.id}
            src={IMG(photo.id)}
            alt={photo.label}
            label={photo.label}
            onSelect={() => setSel(i)}
          />
        ))}
      </Grid>
    </Screen>
  );
}
