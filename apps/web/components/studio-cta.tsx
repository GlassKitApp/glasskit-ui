import { STACK_URL, STUDIO_URL } from "@/lib/config";

/**
 * Cross-sell from the docs (the site's highest-traffic surface by far: /ui and
 * /ui/docs/** are ~78% of all visitors).
 *
 * Cross-zone, so every link must be a plain <a> (hard nav — see next.config.ts).
 *
 * ATTRIBUTION, precisely: `data-fast-goal` is what actually measures this
 * surface. The `?ref=` is a debugging/readability aid ONLY — DataFast attributes
 * a campaign at FIRST TOUCH per visitor and never overwrites it on a later
 * pageview, so a reader who arrived from Product Hunt stays attributed to
 * Product Hunt and this `ref` is ignored. (Verified Aug 2026: `ref=ui-docs`
 * had 0 visitors in the Campaign tab while the `ui_to_studio` goal had fired.)
 * Don't add machinery to forward campaign params across the zone hop — first
 * touch already handles it, and the goal is the real signal.
 *
 * Two variants:
 *  - `sidebar` — the original fumadocs sidebar banner. Note fumadocs hides the
 *    desktop sidebar container below 768px (`max-md:hidden`), so this variant has
 *    ZERO mobile impressions and is collapsible on desktop. It is a bonus
 *    surface, never the primary one.
 *  - `inline` — sits in the CONTENT column at the end of a docs page, which is
 *    where reading intent peaks and which renders on every breakpoint. This is
 *    the surface that actually gets seen.
 */
export function StudioCta({
  variant = "sidebar",
  campaign = "ui-docs",
}: {
  variant?: "sidebar" | "inline";
  /** DataFast campaign tag, so the sidebar and inline surfaces are separable.
   *  Deliberately NOT named `ref` — that's a reserved React prop. */
  campaign?: string;
}) {
  if (variant === "inline") {
    return (
      <aside className="not-prose mt-12 rounded-xl border border-fd-border bg-fd-card p-5">
        <p className="font-display text-base font-semibold text-fd-foreground">
          Not building it by hand?
        </p>
        <p className="mt-1.5 text-[14px] leading-relaxed text-fd-muted-foreground">
          These components are free and MIT licensed, forever. When you want the
          rest of the app, there are two shortcuts.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <a
            href={`${STUDIO_URL}?ref=${campaign}`}
            data-fast-goal="ui_to_studio"
            className="group block rounded-lg border border-fd-border p-3.5 no-underline transition-colors hover:border-fd-primary/50"
          >
            <span className="block text-[14px] font-semibold text-fd-foreground">
              GlassKit Studio
            </span>
            <span className="mt-1 block text-[13px] leading-snug text-fd-muted-foreground">
              Describe an app in plain English, get a working glasses app you can
              publish to a URL.
            </span>
            <span className="mt-2 block text-[13px] font-medium text-fd-primary group-hover:underline">
              Build one free &rarr;
            </span>
          </a>
          <a
            href={`${STACK_URL}?ref=${campaign}`}
            data-fast-goal="ui_to_stack"
            className="group block rounded-lg border border-fd-border p-3.5 no-underline transition-colors hover:border-fd-primary/50"
          >
            <span className="block text-[14px] font-semibold text-fd-foreground">
              GlassKit Stack
            </span>
            <span className="mt-1 block text-[13px] leading-snug text-fd-muted-foreground">
              The full boilerplate: auth, backend, payments, and a companion
              site. Buy once, own it.
            </span>
            <span className="mt-2 block text-[13px] font-medium text-fd-primary group-hover:underline">
              See what&rsquo;s inside &rarr;
            </span>
          </a>
        </div>
      </aside>
    );
  }

  return (
    <a
      href={`${STUDIO_URL}?ref=${campaign}`}
      data-fast-goal="ui_to_studio"
      className="group mb-2 block rounded-lg border border-fd-border bg-fd-card p-3 no-underline transition-colors hover:border-fd-primary/50"
    >
      <span className="font-display block text-sm font-semibold text-fd-foreground">
        Skip the boilerplate
      </span>
      <span className="mt-1 block text-[13px] leading-snug text-fd-muted-foreground">
        Studio turns a plain-English prompt into a working glasses app you can
        publish.
      </span>
      <span className="mt-1.5 block text-[13px] font-medium text-fd-primary group-hover:underline">
        Try GlassKit Studio &rarr;
      </span>
    </a>
  );
}
