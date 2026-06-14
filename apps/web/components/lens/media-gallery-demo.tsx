"use client";

import { useState } from "react";
import { Screen } from "@registry/ui/screen";
import { Masonry } from "@registry/ui/masonry";
import { MediaThumb } from "@registry/ui/media-thumb";

const IMG = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=70`;

type Photo = { id: string; label: string; aspect: "square" | "portrait" };

// Mixed aspects are what make a masonry stagger: the columns never line up.
const PHOTOS: Photo[] = [
  { id: "1506744038136-46273834b3fb", label: "Lakeside", aspect: "portrait" },
  { id: "1501785888041-af3ef285b470", label: "Summit", aspect: "square" },
  { id: "1470071459604-3b5ec3a7fe05", label: "Fog", aspect: "portrait" },
  { id: "1441974231531-c6227db76b6e", label: "Pines", aspect: "square" },
  { id: "1469474968028-56623f02e42e", label: "Golden", aspect: "portrait" },
  { id: "1433086966358-54859d0ed716", label: "Falls", aspect: "square" },
  { id: "1447752875215-b2761acb3c5d", label: "Trail", aspect: "portrait" },
  { id: "1426604966848-d7adac402bff", label: "Valley", aspect: "square" },
  { id: "1472214103451-9374bd1c798e", label: "Dunes", aspect: "portrait" },
  { id: "1518495973542-4542c06a5843", label: "Canopy", aspect: "square" },
];

/** A scrollable masonry photo gallery: D-pad walks the tiles, Enter opens one. */
export function MediaGalleryDemo() {
  const [sel, setSel] = useState<number | null>(null);
  const picked = sel != null ? PHOTOS[sel]! : null;

  return (
    <Screen
      status={
        <span className="t-caption">
          {picked ? picked.label : `Gallery · ${PHOTOS.length} photos`}
        </span>
      }
      cue={picked ? `Opening ${picked.label}` : "Arrow the grid · Enter opens"}
    >
      <Masonry columns={2}>
        {PHOTOS.map((photo, i) => (
          <MediaThumb
            key={photo.id}
            src={IMG(photo.id, 240, photo.aspect === "portrait" ? 320 : 240)}
            alt={photo.label}
            label={photo.label}
            aspect={photo.aspect}
            onSelect={() => setSel(i)}
          />
        ))}
      </Masonry>
    </Screen>
  );
}
