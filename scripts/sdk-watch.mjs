#!/usr/bin/env node
/**
 * Meta Display SDK watcher — diffs the platform surfaces GlassKit depends on
 * and posts changes to Discord. Run daily by .github/workflows/sdk-watch.yml.
 *
 * Sources:
 *   - the official toolkit repo (commits + releases via the GitHub API)
 *   - the Web Apps docs, wearables FAQ, DAT llms.txt (carries the SDK
 *     version string), and the glasses-OS release notes — fetched as clean
 *     markdown via Firecrawl when FIRECRAWL_API_KEY is set, raw-fetch +
 *     tag-strip otherwise
 *
 * State = snapshot files in STATE_DIR (a checkout of the sdk-watch-state
 * branch); the workflow commits it back, so every day's diff is a real,
 * reviewable git diff. First run snapshots everything and just says hello.
 *
 * Env: DISCORD_SDK_WEBHOOK (required to post), FIRECRAWL_API_KEY (optional),
 *      GITHUB_TOKEN (optional, raises API rate limits), STATE_DIR.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const STATE_DIR = process.env.STATE_DIR ?? ".sdk-watch-state";
const WEBHOOK = process.env.DISCORD_SDK_WEBHOOK;
const FIRECRAWL = process.env.FIRECRAWL_API_KEY;
const GH_TOKEN = process.env.GITHUB_TOKEN;

const TOOLKIT_REPO = "facebookincubator/meta-wearables-webapp";

const PAGES = [
  {
    id: "webapps-setup",
    name: "Web Apps · setup",
    url: "https://wearables.developer.meta.com/docs/develop/webapps",
  },
  {
    id: "webapps-build",
    name: "Web Apps · build reference",
    url: "https://wearables.developer.meta.com/docs/develop/webapps/build",
  },
  {
    id: "webapps-test",
    name: "Web Apps · test & share",
    url: "https://wearables.developer.meta.com/docs/develop/webapps/test",
  },
  {
    id: "webapps-troubleshooting",
    name: "Web Apps · troubleshooting",
    url: "https://wearables.developer.meta.com/docs/develop/webapps/troubleshooting",
  },
  {
    id: "wearables-faq",
    name: "Wearables FAQ",
    url: "https://developers.meta.com/wearables/faq/",
  },
  {
    id: "dat-llms",
    name: "DAT llms.txt (SDK version)",
    url: "https://wearables.developer.meta.com/llms.txt?full=true",
  },
  {
    id: "glasses-release-notes",
    name: "Glasses OS release notes",
    url: "https://www.meta.com/help/ai-glasses/1809764829519902/",
  },
];

if (!existsSync(STATE_DIR)) mkdirSync(STATE_DIR, { recursive: true });
const firstRun = !existsSync(join(STATE_DIR, "repo.json"));

// ── fetch helpers ───────────────────────────────────────────────────────────

async function fetchMarkdown(url) {
  if (FIRECRAWL) {
    const res = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FIRECRAWL}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        formats: ["markdown"],
        onlyMainContent: true,
      }),
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.data?.markdown) return json.data.markdown;
    }
    console.warn(
      `firecrawl failed for ${url} (${res.status}) — falling back to raw fetch`,
    );
  }
  const res = await fetch(url, {
    headers: { "User-Agent": "glasskit-sdk-watch" },
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const body = await res.text();
  // Crude but stable html→text for diffing purposes.
  return body
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&[a-z#0-9]+;/gi, " ");
}

/** Normalize so cosmetic churn (whitespace, cache-busted asset URLs) is quiet. */
function normalize(text) {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .filter((l) => !/^[a-f0-9]{16,}$/.test(l)) // bare build hashes
    .join("\n")
    .replace(/\/[a-z0-9_-]+\.[a-f0-9]{8,}\.(js|css|png|webp)/gi, "/asset");
}

async function gh(path) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "glasskit-sdk-watch",
      ...(GH_TOKEN ? { Authorization: `Bearer ${GH_TOKEN}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`GitHub ${res.status} ${path}`);
  return res.json();
}

// ── collect changes ─────────────────────────────────────────────────────────

const findings = [];

// 1. Toolkit repo: commits + releases since the stored state.
const repoStatePath = join(STATE_DIR, "repo.json");
const repoState = existsSync(repoStatePath)
  ? JSON.parse(readFileSync(repoStatePath, "utf8"))
  : { sha: null, release: null };

const head = (await gh(`/repos/${TOOLKIT_REPO}/commits?per_page=15`)) ?? [];
if (head.length > 0) {
  const newSha = head[0].sha;
  if (repoState.sha && newSha !== repoState.sha) {
    const idx = head.findIndex((c) => c.sha === repoState.sha);
    const fresh = idx === -1 ? head : head.slice(0, idx);
    const lines = fresh.map(
      (c) => `• \`${c.sha.slice(0, 7)}\` ${c.commit.message.split("\n")[0]}`,
    );
    findings.push({
      title: `📦 Toolkit repo: ${fresh.length} new commit${fresh.length === 1 ? "" : "s"}`,
      url: `https://github.com/${TOOLKIT_REPO}/compare/${repoState.sha.slice(0, 7)}...${newSha.slice(0, 7)}`,
      body: lines.join("\n"),
    });
  }
  repoState.sha = newSha;
}

const releases = await gh(`/repos/${TOOLKIT_REPO}/releases?per_page=1`).catch(
  () => [],
);
if (releases.length > 0 && releases[0].tag_name !== repoState.release) {
  if (repoState.release !== null) {
    findings.push({
      title: `🏷️ Toolkit release: ${releases[0].tag_name}`,
      url: releases[0].html_url,
      body: (releases[0].body ?? "").slice(0, 600),
    });
  }
  repoState.release = releases[0].tag_name;
}
writeFileSync(repoStatePath, JSON.stringify(repoState, null, 2) + "\n");

// 2. Docs pages: snapshot + git-diff against the state branch.
for (const page of PAGES) {
  const file = join(STATE_DIR, `${page.id}.md`);
  try {
    const next = normalize(await fetchMarkdown(page.url));
    const prev = existsSync(file) ? readFileSync(file, "utf8") : null;
    writeFileSync(file, next);
    if (prev !== null && prev !== next) {
      // Real diff via git (the state dir is a git checkout).
      let diff = "";
      try {
        diff = execFileSync(
          "git",
          [
            "-C",
            STATE_DIR,
            "diff",
            "--no-color",
            "--unified=1",
            "--",
            `${page.id}.md`,
          ],
          { encoding: "utf8" },
        );
      } catch {
        diff = "(diff unavailable)";
      }
      const excerpt = diff
        .split("\n")
        .filter((l) => /^[+-][^+-]/.test(l))
        .slice(0, 20)
        .join("\n");
      findings.push({
        title: `📝 ${page.name} changed`,
        url: page.url,
        body:
          excerpt ||
          "(content changed — see the state branch for the full diff)",
      });
    }
  } catch (err) {
    console.warn(`skip ${page.id}: ${err.message}`);
  }
}

// ── report ──────────────────────────────────────────────────────────────────

async function postDiscord(content) {
  if (!WEBHOOK) {
    console.log("DISCORD_SDK_WEBHOOK not set — printing instead:\n" + content);
    return;
  }
  const res = await fetch(WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, allowed_mentions: { parse: [] } }),
  });
  if (!res.ok) throw new Error(`Discord webhook ${res.status}`);
}

if (firstRun) {
  await postDiscord(
    "👓 **GlassKit SDK watch is live.** Watching the Meta wearables toolkit repo, the Web Apps docs, the FAQ, the DAT llms.txt, and the glasses-OS release notes. Daily diffs will land here — quiet days stay quiet.",
  );
  console.log("first run: snapshots initialized");
} else if (findings.length === 0) {
  console.log("no changes");
} else {
  for (const f of findings) {
    const block = `**${f.title}**\n<${f.url}>\n\`\`\`diff\n${f.body.slice(0, 1500)}\n\`\`\``;
    await postDiscord(block);
  }
  console.log(`posted ${findings.length} finding(s)`);
}
