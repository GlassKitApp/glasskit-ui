"use client";

import { useState, type ReactNode } from "react";
import { Screen } from "@registry/ui/screen";
import { Grid } from "@registry/ui/grid";
import { Icon, type IconTone } from "@registry/ui/icon";
import { Pressable } from "@registry/ui/pressable";
import {
  CameraGlyph,
  MusicGlyph,
  NavGlyph,
  MessageGlyph,
  SunGlyph,
  PhoneGlyph,
  MicGlyph,
  KeyboardGlyph,
  VolumeGlyph,
  HeartGlyph,
} from "@/components/lens/icons";

// A real layout of items, not a gallery: an app / quick-actions grid. Enough
// tiles that it overflows the 600×600 stage and the Grid scrolls vertically.
const TILES: {
  label: string;
  tone: IconTone;
  glyph: ReactNode;
}[] = [
  { label: "Camera", tone: "blue", glyph: <CameraGlyph /> },
  { label: "Music", tone: "peach", glyph: <MusicGlyph /> },
  { label: "Maps", tone: "green", glyph: <NavGlyph /> },
  { label: "Messages", tone: "cyan", glyph: <MessageGlyph /> },
  { label: "Weather", tone: "amber", glyph: <SunGlyph /> },
  { label: "Calls", tone: "violet", glyph: <PhoneGlyph /> },
  { label: "Voice", tone: "blue", glyph: <MicGlyph /> },
  { label: "Keyboard", tone: "cyan", glyph: <KeyboardGlyph /> },
  { label: "Volume", tone: "green", glyph: <VolumeGlyph /> },
  { label: "Health", tone: "peach", glyph: <HeartGlyph /> },
];

/** An app grid: a real multi-column layout of focusable tiles the D-pad walks. */
export function MediaGridDemo() {
  const [sel, setSel] = useState<number | null>(null);
  const picked = sel != null ? TILES[sel]! : null;

  return (
    <Screen
      status={
        <span className="t-caption">
          {picked ? picked.label : `Apps · ${TILES.length}`}
        </span>
      }
      cue={picked ? `Opening ${picked.label}` : "Arrow the tiles · Enter opens"}
      cueLive={picked != null}
    >
      <Grid columns={3}>
        {TILES.map((tile, i) => (
          <Pressable
            key={tile.label}
            aria-label={tile.label}
            initialFocus={i === 0}
            onPress={() => setSel(i)}
            className="surface flex aspect-square flex-col items-center justify-center gap-2 rounded-lens"
          >
            <Icon size="md" plate tone={tile.tone}>
              {tile.glyph}
            </Icon>
            <span className="t-caption text-muted-foreground">{tile.label}</span>
          </Pressable>
        ))}
      </Grid>
    </Screen>
  );
}
