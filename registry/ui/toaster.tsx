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
 * Bottom-anchored (below the sightline) to match the real Display; override with
 * the `position` prop. Sonner handles the queue, stacking, auto-dismiss, and the
 * enter/exit motion. Toasts portal to the window edge, so their theme lives in
 * the (intentionally unscoped) `.gk-toaster__*` rules.
 */
export function Toaster(props: ToasterProps) {
  return (
    <SonnerToaster
      position="bottom-center"
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
          actionButton: "gk-toaster__action",
          cancelButton: "gk-toaster__cancel",
        },
      }}
      {...props}
    />
  );
}
