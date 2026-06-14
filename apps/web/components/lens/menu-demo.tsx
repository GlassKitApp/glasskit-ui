import { GlassViewport } from "@glasskit-ui/react";
import { Screen } from "@registry/ui/screen";
import { List, ListRow } from "@registry/ui/list";
import { Icon } from "@registry/ui/icon";
import {
  NavGlyph,
  MessageGlyph,
  MusicGlyph,
  ChevronGlyph,
  SunGlyph,
  PhoneGlyph,
  MicGlyph,
  CameraGlyph,
  VolumeGlyph,
  BatteryGlyph,
  HeartGlyph,
  AlertGlyph,
  KeyboardGlyph,
  CheckGlyph,
} from "./icons";

/** A glanceable launcher menu — well more rows than fit, so the focus ring
 *  walks the visible page first and the list only scrolls once you pass the
 *  last on-screen row (the focus engine drives the scroll). */
export function MenuDemo() {
  const rows = [
    { icon: <NavGlyph />, label: "Navigate", trailing: "chevron" },
    { icon: <MessageGlyph />, label: "Messages", trailing: "2" },
    { icon: <MusicGlyph />, label: "Now playing", trailing: "chevron" },
    { icon: <SunGlyph />, label: "Weather", trailing: "72°" },
    { icon: <PhoneGlyph />, label: "Calls", trailing: "chevron" },
    { icon: <MicGlyph />, label: "Voice notes", trailing: "3" },
    { icon: <CameraGlyph />, label: "Camera", trailing: "chevron" },
    { icon: <VolumeGlyph />, label: "Sound", trailing: "chevron" },
    { icon: <BatteryGlyph />, label: "Battery", trailing: "84%" },
    { icon: <HeartGlyph />, label: "Heart rate", trailing: "chevron" },
    { icon: <AlertGlyph />, label: "Alerts", trailing: "5" },
    { icon: <KeyboardGlyph />, label: "Brightness", trailing: "chevron" },
    { icon: <CheckGlyph />, label: "Reminders", trailing: "2" },
    { icon: <SunGlyph />, label: "Display", trailing: "chevron" },
    { icon: <PhoneGlyph />, label: "Contacts", trailing: "chevron" },
    { icon: <ChevronGlyph />, label: "Settings", trailing: "chevron" },
  ];

  return (
    <GlassViewport>
      <Screen>
        <List>
          {rows.map((r) => (
            <ListRow
              key={r.label}
              leading={<Icon size="sm">{r.icon}</Icon>}
              trailing={
                r.trailing === "chevron" ? (
                  <Icon size="sm">
                    <ChevronGlyph />
                  </Icon>
                ) : (
                  r.trailing
                )
              }
            >
              {r.label}
            </ListRow>
          ))}
        </List>
      </Screen>
    </GlassViewport>
  );
}
