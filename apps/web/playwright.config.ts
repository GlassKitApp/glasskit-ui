import { defineConfig, devices } from "@playwright/test";

/**
 * Visual regression for the glass apps — screenshots of every
 * /preview/<slug> 600×600 surface, LTR + RTL ("the look broke" detector
 * PLAN.md's testing strategy calls for; behavior is covered by Vitest).
 *
 * Baselines are generated ON CI (ubuntu) via the visual-baselines workflow so
 * font rendering matches the comparing platform — don't `--update-snapshots`
 * from a Mac; dispatch the workflow instead (see .github/workflows/
 * visual-baselines.yml).
 *
 * Requires a production build first: `pnpm --filter @glasskit-ui/web build`.
 */
export default defineConfig({
  testDir: "./e2e",
  // Platform-agnostic snapshot names — the CI workflow owns the platform.
  snapshotPathTemplate: "{testDir}/__screenshots__/{arg}{ext}",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  expect: {
    toHaveScreenshot: {
      // Absorb sub-pixel AA noise without masking real changes on a 600×600.
      maxDiffPixels: 150,
    },
  },
  use: {
    ...devices["Desktop Chrome"],
    baseURL: "http://localhost:4411",
    viewport: { width: 1280, height: 800 }, // ≥600² → --glass-scale stays 1
    // Deterministic rendering: no motion, fixed locale/zone for Clock & co.
    contextOptions: { reducedMotion: "reduce" },
    timezoneId: "UTC",
    locale: "en-US",
  },
  webServer: {
    command: "pnpm exec next start -p 4411",
    url: "http://localhost:4411/ui",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
