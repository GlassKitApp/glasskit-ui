import { GlassViewport } from "@glasskit/glasses-ui";
import { Screen } from "@registry/ui/screen";
import { Launcher } from "@registry/ui/launcher";
import { GlowIcon } from "@registry/ui/glow-icon";
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
                <GlowIcon active>
                  <NavGlyph />
                </GlowIcon>
              ),
            },
            {
              id: "msg",
              label: "Messages",
              tagline: "2 new",
              icon: (
                <GlowIcon>
                  <MessageGlyph />
                </GlowIcon>
              ),
            },
            {
              id: "music",
              label: "Music",
              tagline: "Now playing",
              icon: (
                <GlowIcon>
                  <MusicGlyph />
                </GlowIcon>
              ),
            },
            {
              id: "fit",
              label: "Workout",
              tagline: "Ready",
              icon: (
                <GlowIcon>
                  <HeartGlyph />
                </GlowIcon>
              ),
            },
          ]}
        />
      </Screen>
    </GlassViewport>
  );
}
