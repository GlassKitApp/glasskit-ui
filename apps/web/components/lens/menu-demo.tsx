import { GlassViewport } from "@glasskit-ui/react";
import { Screen } from "@registry/ui/screen";
import { Cue } from "@registry/ui/cue";
import { List, ListRow } from "@registry/ui/list";
import { GlowIcon } from "@registry/ui/glow-icon";
import { NavGlyph, MessageGlyph, MusicGlyph, ChevronGlyph } from "./icons";

/** A glanceable launcher menu — List + ListRow, leading GlowIcons, trailing chevrons. */
export function MenuDemo() {
  return (
    <GlassViewport>
      <Screen cue={<Cue>Swipe to browse · pinch to open</Cue>}>
        <List>
          <ListRow
            leading={
              <GlowIcon active size="sm">
                <NavGlyph />
              </GlowIcon>
            }
            trailing={
              <GlowIcon size="sm">
                <ChevronGlyph />
              </GlowIcon>
            }
          >
            Navigate
          </ListRow>
          <ListRow
            leading={
              <GlowIcon size="sm">
                <MessageGlyph />
              </GlowIcon>
            }
            trailing="2"
          >
            Messages
          </ListRow>
          <ListRow
            leading={
              <GlowIcon size="sm">
                <MusicGlyph />
              </GlowIcon>
            }
            trailing={
              <GlowIcon size="sm">
                <ChevronGlyph />
              </GlowIcon>
            }
          >
            Now playing
          </ListRow>
        </List>
      </Screen>
    </GlassViewport>
  );
}
