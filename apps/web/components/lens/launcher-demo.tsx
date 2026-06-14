import { GlassViewport } from "@glasskit-ui/react";
import { Screen } from "@registry/ui/screen";
import { Launcher } from "@registry/ui/launcher";
import { Icon } from "@registry/ui/icon";
import { NavGlyph, MessageGlyph, MusicGlyph, HeartGlyph } from "./icons";

/** The app-grid entry screen — Launcher with four D-pad-focusable cards. */
export function LauncherDemo() {
  return (
    <GlassViewport>
      <Screen>
        <Launcher
          apps={[
            {
              id: "nav",
              label: "Navigate",
              tagline: "320 m",
              icon: (
                <Icon active>
                  <NavGlyph />
                </Icon>
              ),
            },
            {
              id: "msg",
              label: "Messages",
              tagline: "2 new",
              icon: (
                <Icon>
                  <MessageGlyph />
                </Icon>
              ),
            },
            {
              id: "music",
              label: "Music",
              tagline: "Now playing",
              icon: (
                <Icon>
                  <MusicGlyph />
                </Icon>
              ),
            },
            {
              id: "fit",
              label: "Workout",
              tagline: "Ready",
              icon: (
                <Icon>
                  <HeartGlyph />
                </Icon>
              ),
            },
          ]}
        />
      </Screen>
    </GlassViewport>
  );
}
