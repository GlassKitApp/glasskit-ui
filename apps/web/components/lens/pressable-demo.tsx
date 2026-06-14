"use client";

import { useState, type ReactNode } from "react";
import { Screen } from "@registry/ui/screen";
import { Pressable } from "@registry/ui/pressable";
import { Icon, type IconTone } from "@registry/ui/icon";
import { VolumeGlyph, CheckGlyph } from "@/components/lens/icons";

// Custom cards that aren't a plain ListRow: an icon plate, a two-line label, and
// a selection check. Exactly the case Pressable is for — your own layout, made
// D-pad-walkable and pressable with no extra chrome.
const DEVICES: { id: string; name: string; detail: string; tone: IconTone }[] = [
  { id: "living", name: "Living Room", detail: "2 speakers", tone: "blue" },
  { id: "kitchen", name: "Kitchen", detail: "1 speaker", tone: "green" },
  { id: "bedroom", name: "Bedroom", detail: "1 speaker", tone: "violet" },
];

/** A "cast to" picker: custom cards the D-pad walks and Enter selects. */
export function PressableDemo() {
  const [sel, setSel] = useState("living");
  const picked = DEVICES.find((d) => d.id === sel);

  return (
    <Screen
      status={<span className="t-caption">Cast to</span>}
      cue={picked ? `Playing in ${picked.name}` : "Arrow the cards · Enter casts"}
      cueLive={picked != null}
    >
      <div className="flex w-full flex-col gap-3">
        {DEVICES.map((d, i) => {
          const on = d.id === sel;
          return (
            <Pressable
              key={d.id}
              initialFocus={i === 0}
              aria-label={d.name}
              onPress={() => setSel(d.id)}
              className="surface flex w-full items-center gap-4 rounded-lens p-4"
            >
              <Icon size="md" plate tone={d.tone}>
                <VolumeGlyph />
              </Icon>
              <span className="flex min-w-0 flex-1 flex-col items-start text-start">
                <span className="t-body">{d.name}</span>
                <span className="t-caption text-foreground-faint">{d.detail}</span>
              </span>
              {on ? (<Check />) : null}
            </Pressable>
          );
        })}
      </div>
    </Screen>
  );
}

function Check(): ReactNode {
  return (
    <span className="grid size-7 place-items-center text-primary [&_svg]:size-6">
      <CheckGlyph />
    </span>
  );
}
