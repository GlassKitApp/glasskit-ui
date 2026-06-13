"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { FocusScope } from "@glasskit-ui/react";
import { cn } from "../lib/utils";
import { TextField } from "./text-field";
import { Heading } from "./heading";
import { List, ListRow } from "./list";

/**
 * <ComposeFlow> — the working text-entry recipe for a platform with no
 * keyboard or microphone: a <TextField> that opens a picker of choices when
 * activated; choosing writes the value back and returns to the field. The
 * picker is a real back-gesture surface — opening pushes a history entry, so
 * a middle pinch (or Escape in desktop dev) closes it instead of leaving the
 * screen, inside or outside a <Navigator>.
 *
 * This is the seam system dictation would replace: if Meta ships a text-input
 * API (see the ComposeFlow docs), swap the picker for the system
 * flow and the field API doesn't change.
 */
export function ComposeFlow({
  label,
  value,
  placeholder,
  options,
  pickerTitle = "Choose",
  icon,
  onChange,
  className,
}: {
  /** Field label (forwarded to <TextField>). */
  label?: ReactNode;
  /** Current value. Controlled — pair with `onChange`. */
  value?: string | null;
  placeholder?: ReactNode;
  /** The choices the picker offers. */
  options: string[];
  /** Heading on the picker view. */
  pickerTitle?: ReactNode;
  /** TextField trailing glyph. */
  icon?: ReactNode;
  onChange?: (value: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  const openPicker = () => {
    // Ride history so the system back gesture closes the picker. Carrying a
    // bumped gkNavDepth makes an enclosing <Navigator> treat the entry as
    // "not mine" and leave its stack alone.
    history.pushState(
      {
        ...history.state,
        gkCompose: true,
        gkNavDepth: (history.state?.gkNavDepth ?? 0) + 1,
      },
      "",
    );
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const onPop = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // The picker owns this back — a Navigator's own Escape handler would
      // otherwise also call history.back() and pop two entries. Capture
      // phase runs first; stop the event there.
      e.stopImmediatePropagation();
      history.back();
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("keydown", onKey, true);
    };
  }, [open]);

  // Closing re-renders the field view with fresh DOM — put the ring back on
  // the field so the wearer continues where they left off.
  useEffect(() => {
    if (wasOpen.current && !open) {
      root.current?.querySelector<HTMLElement>(".gk-textfield")?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  const choose = (v: string) => {
    onChange?.(v);
    history.back(); // popstate closes the picker — history stays balanced
  };

  return (
    <div ref={root} className={cn("gk-compose", className)}>
      {open ? (
        <FocusScope restoreFocus={false}>
          <Heading>{pickerTitle}</Heading>
          <List>
            {options.map((o) => (
              <ListRow key={o} onClick={() => choose(o)}>
                {o}
              </ListRow>
            ))}
          </List>
        </FocusScope>
      ) : (
        <TextField
          label={label}
          value={value ?? undefined}
          placeholder={placeholder}
          icon={icon}
          onActivate={openPicker}
        />
      )}
    </div>
  );
}
