import { BASE_PATH } from "@/lib/config";

/**
 * Umbrella product band — replicated from the parent glasskit app's
 * `components/landing/header.tsx`, which documents itself as a "design contract
 * this repo must replicate" (the navbar is NOT shared code yet).
 *
 * Uses the site theme tokens (bg/ink/line/accent), which flip light↔dark with
 * the shared `theme` toggle — so the band matches the parent in BOTH modes.
 *
 * Cross-zone links (brand → umbrella home, Studio, Stack) are plain root-relative
 * `<a>` so they resolve against the shared glasskit.app origin and hard-navigate
 * out of this zone. UI is this zone, so its pill is always active.
 *
 * TODO(clerk): extract into a shared package + add the Clerk profile (top-right)
 * when auth lands. Session is shared via the same-domain cookie, so each zone
 * renders its own copy against the same session — see the deploy notes.
 */

const DISCORD_URL = "https://discord.gg/DRe5SmSjyE";
const X_URL = "https://x.com/JarJarMadeIt";

const pill =
  "rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors";

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="currentColor">
    <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.029zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="size-[15px]" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function ProductNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1280px] items-center gap-3 px-5 sm:px-7">
        {/* Brand → umbrella home (cross-zone) */}
        <a
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="GlassKit home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BASE_PATH}/avatar.png`}
            alt=""
            className="size-6 rounded-[5px]"
          />
          <span className="font-display text-[15px] font-bold tracking-[-0.02em] text-ink">
            GlassKit
          </span>
        </a>

        {/* Product pills — UI is this zone (active); Studio/Stack are cross-zone */}
        <nav className="hidden flex-1 justify-center md:flex">
          <div className="flex items-center gap-1 rounded-full border border-line bg-bg-2/60 p-1">
            <a
              href="/ui"
              aria-current="page"
              className={`${pill} bg-accent/[0.12] text-ink`}
            >
              UI
            </a>
            <a href="/studio" className={`${pill} text-ink-3 hover:text-ink`}>
              Studio
            </a>
            <a href="/stack" className={`${pill} text-ink-3 hover:text-ink`}>
              Stack
            </a>
          </div>
        </nav>

        {/* Community */}
        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
            className="grid size-9 place-items-center rounded-full text-ink-3 transition-colors hover:bg-bg-2 hover:text-ink"
          >
            <DiscordIcon />
          </a>
          <a
            href={X_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="grid size-9 place-items-center rounded-full text-ink-3 transition-colors hover:bg-bg-2 hover:text-ink"
          >
            <XIcon />
          </a>
        </div>
      </div>
    </header>
  );
}
