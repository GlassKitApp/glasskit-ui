"use client";

import type { ReactNode } from "react";
import { useDpad } from "@glasskit-ui/react";

/**
 * Enables D-pad navigation for a live preview: the arrow keys move the
 * green focus ring between `.focusable` elements and Enter activates them
 * (this is the wristband on a real device). Client-only — it attaches a
 * window key listener and seeds focus on mount.
 */
export function DpadProvider({ children }: { children: ReactNode }) {
  useDpad();
  return <>{children}</>;
}
