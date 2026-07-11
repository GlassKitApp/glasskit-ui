"use client";

import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

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

export function AuthButton() {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return <div className="ml-2 size-9" />;
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
