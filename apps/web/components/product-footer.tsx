import { BASE_PATH } from "@/lib/config";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * Umbrella footer — replicated from the parent glasskit app's
 * `components/landing/footer.tsx` so the bottom of glasskit.app/ui matches the
 * rest of glasskit.app (same reasoning as ProductNav — the navbar/footer are a
 * design contract this zone replicates).
 *
 * Uses the site theme tokens (bg/ink/line/accent), which flip light↔dark with
 * the shared `theme` toggle. Product/About/Legal links are cross-zone
 * (parent-owned pages), so plain root-relative `<a>` that resolve against the
 * shared glasskit.app origin. The ThemeToggle in the bottom bar writes the same
 * `theme` key the parent's footer toggle uses.
 *
 * TODO(clerk): fold into the same shared package as ProductNav when extracted.
 */

const GITHUB_ORG = "https://github.com/GlassKitApp";
const DISCORD_URL = "https://discord.gg/DRe5SmSjyE";
const X_URL = "https://x.com/JarJarMadeIt";

type FooterLink = { label: string; href: string; external?: boolean };

const COLS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Products",
    links: [
      { label: "GlassKit UI", href: "/ui" },
      { label: "GlassKit Studio", href: "/studio" },
      { label: "GlassKit Stack", href: "/stack" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Discord", href: DISCORD_URL, external: true },
      { label: "Twitter / X", href: X_URL, external: true },
      { label: "GitHub", href: GITHUB_ORG, external: true },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "License", href: "/license" },
    ],
  },
];

const colTitle =
  "font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink-3";
const colLink =
  "text-[13px] text-ink-3 transition-colors hover:text-ink";

export function ProductFooter() {
  return (
    <footer className="bg-bg">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-7">
        <div className="grid gap-12 md:grid-cols-[2fr_3fr]">
          <div>
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE_PATH}/avatar.png`}
                alt=""
                className="size-6 rounded-[5px]"
              />
              <span className="font-display text-[15px] font-bold tracking-[-0.02em] text-ink">
                GlassKit
              </span>
            </div>
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-ink-3">
              Everything you need to build glasses apps.
            </p>
            <div className="mt-6 flex items-center gap-2 text-[13px] text-ink-3">
              <span>Built by</span>
              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE_PATH}/founder.jpg`}
                  alt="Jeries Nasrawi"
                  className="size-6 rounded-full"
                />
                <span className="font-medium text-ink transition-colors group-hover:text-accent">
                  Jeries Nasrawi
                </span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {COLS.map((col) => (
              <div key={col.title}>
                <div className={colTitle}>{col.title}</div>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        {...(l.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className={colLink}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink-3">
            © 2026 GlassKit · All rights reserved
          </span>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
