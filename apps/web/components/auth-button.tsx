"use client";

import { useEffect, useState } from "react";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { STUDIO_URL } from "@/lib/config";

/**
 * The nav's sign-in / profile control, matching the parent glasskit app's
 * header. This zone shares glasskit.app's origin (Multi-Zones) and its
 * production Clerk instance, so the session cookie carries over: a user
 * signed in on the main site sees their avatar here too. A reserved slot
 * before Clerk loads avoids a layout jump.
 */
// Matches the parent glasskit app's header Sign-in CTA: green accent fill
// (bg-accent = #0b7e43 light / #36e27f dark, == the parent's --primary), white
// label, brighter-green hover (accent-ink == the parent's --primary-bright).
const BTN =
  "ml-2 inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-accent px-5 text-[13px] font-semibold text-accent-fg transition-colors hover:bg-accent-ink active:scale-[0.98]";

/**
 * How long to wait for ClerkJS before showing the fallback link.
 *
 * `isLoaded` stays false FOREVER if ClerkProvider can't complete its /v1/client
 * handshake — which is exactly what happens when this zone is served from a
 * *.vercel.app host and Clerk's auto-proxy heuristic points ClerkJS at the wrong
 * Frontend API domain (the fix is NEXT_PUBLIC_CLERK_DOMAIN on the glasskit-ui
 * Vercel project; see .env.example). The old code rendered a bare 9x9 div in
 * that state, so the nav had an invisible hole where sign-in should be and
 * nothing surfaced the failure. Never fail silently: degrade to a real link.
 */
const CLERK_LOAD_TIMEOUT_MS = 4000;

export function AuthButton() {
  const { isLoaded, isSignedIn } = useAuth();
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (isLoaded) return;
    const t = setTimeout(() => setTimedOut(true), CLERK_LOAD_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [isLoaded]);

  if (!isLoaded) {
    // Fallback: hand the user off to the parent zone, which owns a working
    // Clerk instance. A hard cross-zone nav, so a plain <a>.
    if (timedOut) {
      return (
        <a href={STUDIO_URL} className={BTN}>
          Sign in
        </a>
      );
    }
    return <div className="ml-2 size-9" />;
  }

  if (isSignedIn) {
    return (
      <div className="ml-2 grid size-9 place-items-center">
        <UserButton />
      </div>
    );
  }

  return (
    <SignInButton mode="modal">
      <button type="button" className={BTN}>
        Sign in
      </button>
    </SignInButton>
  );
}
