import { STUDIO_URL } from "@/lib/config";

/**
 * Sidebar banner cross-selling GlassKit Studio from the docs (the site's
 * highest-traffic surface). Cross-zone, so it must be a plain <a> (hard nav —
 * see next.config.ts). `ref` attributes the visit in DataFast's Campaign tab;
 * `data-fast-goal` counts the click as a `ui_to_studio` goal.
 */
export function StudioCta() {
  return (
    <a
      href={`${STUDIO_URL}?ref=ui-docs`}
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
        Try GlassKit Studio →
      </span>
    </a>
  );
}
