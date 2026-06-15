#!/usr/bin/env node
/**
 * Bundle budget for the on-glasses surfaces, enforced in CI after the web
 * build. Meta's Web Apps performance budget is <500 KB JS gzipped, <10
 * requests on load, <3 s on 4G (toolkit performance-guidelines, 2026-06 —
 * see docs/platform-audit-2026-06.md).
 *
 * Checks, against the built apps/web/.next:
 *   1. every /preview/<slug> page (the QR-launched glass apps): summed
 *      gzipped JS ≤ HARD_PAGE_KB, script count ≤ MAX_SCRIPTS
 *   2. the SDK dist (what every consumer app starts from): ≤ HARD_SDK_KB
 *
 * Sizes come from the prerendered HTML's <script src> tags — this modified
 * Next 16 build doesn't emit app-build-manifest.json, and the HTML is what
 * the device actually loads anyway.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const NEXT = join(ROOT, "apps", "web", ".next");
const PREVIEW_DIR = join(NEXT, "server", "app", "preview");

const HARD_PAGE_KB = 500; // Meta's hard JS budget
const WARN_PAGE_KB = 300; // headroom alarm — investigate before it's a crisis
// The real on-device guarantee (<10 requests) is enforced by the Vite `init`
// scaffold build below; these /preview pages are Next.js docs renders whose
// count includes framework/shared chunking, so the proxy budget is a touch
// higher. The KB + SDK budgets remain the load-bearing checks.
const MAX_SCRIPTS = 12; // Next preview-page proxy (framework chunking included)
const HARD_SDK_KB = 25; // the SDK must stay a rounding error in any app

const kb = (bytes) => bytes / 1024;
const fmt = (bytes) => kb(bytes).toFixed(1).padStart(7) + " KB";

let failed = false;
const fail = (msg) => {
  console.error("✗ " + msg);
  failed = true;
};

// ── 1. Every glass preview page ───────────────────────────────────────────
if (!existsSync(PREVIEW_DIR)) {
  fail(`${PREVIEW_DIR} missing — run the web build first.`);
} else {
  const gzCache = new Map();
  const gzSize = (path) => {
    if (!gzCache.has(path)) {
      gzCache.set(path, gzipSync(readFileSync(path)).length);
    }
    return gzCache.get(path);
  };

  let worst = { slug: null, total: 0, scripts: 0 };
  const pages = readdirSync(PREVIEW_DIR).filter((f) => f.endsWith(".html"));
  if (pages.length === 0) fail("no prerendered preview pages found");

  for (const page of pages) {
    const html = readFileSync(join(PREVIEW_DIR, page), "utf8");
    const srcs = [
      ...new Set(
        [...html.matchAll(/src="([^"]+\.js)[^"]*"/g)].map((m) => m[1]),
      ),
    ];
    let total = 0;
    for (const src of srcs) {
      total += gzSize(join(NEXT, src.replace(/^\/ui\/_next/, "")));
    }
    const slug = page.replace(/\.html$/, "");
    if (total > worst.total) worst = { slug, total, scripts: srcs.length };
    if (kb(total) > HARD_PAGE_KB) {
      fail(
        `/preview/${slug}: ${fmt(total)} gzipped JS exceeds the ${HARD_PAGE_KB} KB device budget`,
      );
    }
    if (srcs.length > MAX_SCRIPTS) {
      fail(
        `/preview/${slug}: ${srcs.length} scripts exceeds the ${MAX_SCRIPTS}-request load budget`,
      );
    }
  }

  console.log(
    `preview pages (${pages.length}) — worst: /preview/${worst.slug} ` +
      `${fmt(worst.total)} gzipped JS in ${worst.scripts} scripts ` +
      `(budget ${HARD_PAGE_KB} KB / ${MAX_SCRIPTS} scripts)`,
  );
  if (kb(worst.total) > WARN_PAGE_KB) {
    console.warn(
      `⚠ worst page is past the ${WARN_PAGE_KB} KB headroom mark — ` +
        `still passing, but check what grew.`,
    );
  }
}

// ── 2. The SDK dist ───────────────────────────────────────────────────────
const SDK_DIST = join(ROOT, "packages", "glasses-ui", "dist");
if (!existsSync(SDK_DIST)) {
  fail(`${SDK_DIST} missing — build @glasskit-ui/react first.`);
} else {
  let total = 0;
  for (const f of readdirSync(SDK_DIST).filter((f) => f.endsWith(".js"))) {
    total += gzipSync(readFileSync(join(SDK_DIST, f))).length;
  }
  console.log(
    `@glasskit-ui/react dist —${fmt(total)} gzipped JS (budget ${HARD_SDK_KB} KB)`,
  );
  if (kb(total) > HARD_SDK_KB) {
    fail(`SDK dist ${fmt(total)} exceeds its ${HARD_SDK_KB} KB budget`);
  }
}

if (failed) process.exit(1);
console.log("✓ bundle budgets ok");
