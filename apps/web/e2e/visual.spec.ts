import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { test, expect, type Page } from "@playwright/test";

/**
 * One screenshot per glass app per direction: every /preview/<slug> 600×600
 * surface, LTR and RTL. Catches "the look broke" — behavior is Vitest's job.
 *
 * Determinism: the clock is frozen (Clock renders a fixed time, interval
 * demos hold their first frame, the sensor demos' simulated-sweep timer
 * never arms), `reducedMotion: "reduce"` collapses our CSS motion, and
 * `animations: "disabled"` freezes anything left.
 */

const registry = JSON.parse(
  readFileSync(
    join(
      dirname(fileURLToPath(import.meta.url)),
      "../../../registry/registry.json",
    ),
    "utf8",
  ),
) as { items: Array<{ name: string; type: string }> };

const slugs = registry.items
  .filter((i) => i.type === "registry:ui")
  .map((i) => i.name);

// Mid-morning, mid-week, UTC — what the frozen Clock shows everywhere.
const FROZEN_TIME = new Date("2026-06-11T09:41:00Z");

async function shoot(
  page: Page,
  slug: string,
  dir: "ltr" | "rtl",
  route: "preview" | "examples" = "preview",
) {
  // Install + pause: time stands still, so interval demos (Progress,
  // NowPlaying, Reticle…) hold their first frame forever. install() alone
  // keeps time flowing and those shots never stabilize.
  await page.clock.install({ time: FROZEN_TIME });
  await page.clock.pauseAt(FROZEN_TIME);
  if (dir === "rtl") {
    // The system writing direction — html[dir] cascades; world-anchored
    // components must visibly NOT mirror in these baselines.
    await page.addInitScript(() => {
      document.documentElement.dir = "rtl";
    });
  }
  // Full path incl. the /ui basePath — a leading-slash path would discard a
  // path suffix on baseURL.
  await page.goto(`/ui/${route}/${slug}`);
  const lens = page.locator(".glass-viewport");
  await expect(lens).toBeVisible();
  const name = route === "preview" ? slug : `${route}-${slug}`;
  await expect(lens).toHaveScreenshot(`${name}-${dir}.png`, {
    animations: "disabled",
  });
}

for (const slug of slugs) {
  test(`${slug} (ltr)`, async ({ page }) => shoot(page, slug, "ltr"));
  test(`${slug} (rtl)`, async ({ page }) => shoot(page, slug, "rtl"));
}

// Example apps (lib/examples.tsx) — multi-screen compositions at
// /examples/<slug>; the home screen is the deterministic first frame.
for (const slug of ["workout", "messages"]) {
  test(`example ${slug} (ltr)`, async ({ page }) =>
    shoot(page, slug, "ltr", "examples"));
  test(`example ${slug} (rtl)`, async ({ page }) =>
    shoot(page, slug, "rtl", "examples"));
}
