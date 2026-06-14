"use client";

import { Toaster as SonnerToaster, toast, type ToasterProps } from "sonner";

export { toast };

/**
 * <Toaster> — the GlassKit toast / notification system, built on Sonner (Emil
 * Kowalski's library) and themed to the lens surfaces. Mount once at the root of
 * your 600×600 app; fire with the imperative `toast()` API (re-exported here):
 *
 *   toast("Workout saved");
 *   toast("Mara Lin", { description: "On my way", icon: <Avatar … /> });
 *   toast.custom((id) => <NotificationCard … />);
 *
 * Top-anchored: <Screen> reserves the bottom strip for its Cue line, so
 * bottom toasts would cover exactly what the app is saying there. Override
 * with the `position` prop. Sonner handles the queue, stacking, auto-dismiss,
 * and the enter/exit motion. Toasts portal to the window edge, so their theme lives in
 * the (intentionally unscoped) `.gk-toaster__*` rules.
 *
 * A toast can be one of two things:
 *
 *   • Fire-and-forget — just a message. It auto-dismisses and is never
 *     interactive (don't put `focusable` content inside, including in
 *     `toast.custom()`): the D-pad ring would be stranded mid-read when the
 *     toast unmounts.
 *
 *   • Interactive — give it an `action` (its button is `focusable`, so the
 *     D-pad can reach it) and `duration: Infinity` so it persists. The
 *     infinite duration is what keeps the focusable action button from being
 *     stranded by auto-dismiss; the wearer pinches the action when ready.
 *
 *     toast("Maya Lin", {
 *       description: "On my way, be there in 5",
 *       action: { label: "View", onClick: () => open(id) },
 *       duration: Infinity,
 *     });
 *
 * For a persistent item the wearer must work through (reply chips, a calendar
 * alert), reach for a <NotificationCard> on the screen instead.
 */
export function Toaster(props: ToasterProps) {
  return (
    <SonnerToaster
      position="top-center"
      theme="dark"
      offset={20}
      gap={10}
      visibleToasts={3}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: "gk-toaster__toast",
          title: "gk-toaster__title",
          description: "gk-toaster__desc",
          icon: "gk-toaster__icon",
          actionButton: "gk-toaster__action focusable",
          cancelButton: "gk-toaster__cancel",
        },
      }}
      {...props}
    />
  );
}
