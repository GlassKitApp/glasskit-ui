#!/usr/bin/env node
/**
 * Generate registry/registry.json — a shadcn-format index of the GlassKit UI
 * registry. Single source of truth = the component files themselves: this reads
 * registry/ui/*.tsx + registry/lib/*.ts and derives each item's title
 * (PascalCase of the file name), description (first sentence of its component
 * JSDoc), registryDependencies (cross-component `./x` + shared `../lib/x`
 * imports), and npm dependencies (bare import specifiers; the SDK is pinned to
 * the version in packages/glasses-ui/package.json). Re-run after adding or
 * renaming a component:  node scripts/build-registry.mjs
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, basename } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const UI_DIR = join(ROOT, "registry", "ui");
const LIB_DIR = join(ROOT, "registry", "lib");

const SDK_NAME = "@glasskit-ui/react";
const SDK_VERSION = JSON.parse(
  readFileSync(join(ROOT, "packages", "glasses-ui", "package.json"), "utf8"),
).version;

const pascal = (name) =>
  name.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase());

/** First sentence of the `<Name> — …` component JSDoc (skips helper JSDocs). */
function description(src, name) {
  for (const block of src.matchAll(/\/\*\*([\s\S]*?)\*\//g)) {
    const text = block[1].replace(/^\s*\*\s?/gm, "").trim();
    const m = text.match(
      new RegExp(`<${name}>\\s*—\\s*([\\s\\S]*?\\.)(\\s|$)`),
    );
    if (m) return m[1].replace(/\s+/g, " ").trim();
  }
  return `${name} component.`;
}

/** First sentence of the first JSDoc block (for lib files, no <Name> form). */
function libDescription(src, name) {
  const block = src.match(/\/\*\*([\s\S]*?)\*\//);
  if (block) {
    const text = block[1].replace(/^\s*\*\s?/gm, "").trim();
    const m = text.match(/([\s\S]*?\.)(\s|$)/);
    if (m) return m[1].replace(/\s+/g, " ").trim();
  }
  return `${name} utility.`;
}

/**
 * npm dependencies = bare import specifiers, normalized to package names
 * (subpaths stripped, scoped names kept whole). react/react-dom are peer
 * assumptions of every React project, never emitted. The SDK carries a version
 * range synced to packages/glasses-ui so Changesets version bumps flow into
 * the registry via `pnpm build:registry`.
 */
function npmDependencies(src) {
  const deps = new Set();
  for (const m of src.matchAll(/from\s+["']([^."'][^"']*)["']/g)) {
    const spec = m[1];
    const pkg = spec.startsWith("@")
      ? spec.split("/").slice(0, 2).join("/")
      : spec.split("/")[0];
    if (pkg === "react" || pkg === "react-dom") continue;
    deps.add(pkg === SDK_NAME ? `${SDK_NAME}@^${SDK_VERSION}` : pkg);
  }
  return [...deps].sort();
}

const items = [];

for (const file of readdirSync(LIB_DIR)
  .filter((f) => f.endsWith(".ts"))
  .sort()) {
  const name = basename(file, ".ts");
  const src = readFileSync(join(LIB_DIR, file), "utf8");
  items.push({
    name,
    type: "registry:lib",
    title: name,
    description: libDescription(src, name),
    dependencies: npmDependencies(src),
    registryDependencies: [],
    // Target mirrors the registry's relative layout (ui/ siblings of lib/), so
    // the vendored components' `../lib/<name>` imports resolve with no rewriting.
    files: [
      {
        path: `registry/lib/${file}`,
        type: "registry:lib",
        target: `components/lib/${file}`,
      },
    ],
  });
}

// Tier (shadcn taxonomy): compositional, multi-region surfaces are blocks; the
// rest are single-purpose ui primitives. Drives the registry item `type` and
// the docs Primitives/Blocks split. Keep in sync with the docs tier field.
const BLOCKS = new Set([
  "now-playing",
  "call-card",
  "notification-card",
  "chat-bubble",
  "assistant-orb",
  "media-thumb",
]);

for (const file of readdirSync(UI_DIR)
  .filter((f) => f.endsWith(".tsx"))
  .sort()) {
  const name = basename(file, ".tsx");
  const src = readFileSync(join(UI_DIR, file), "utf8");

  const deps = new Set();
  for (const m of src.matchAll(/from\s+["']\.\.\/lib\/([a-z-]+)["']/g))
    deps.add(m[1]);
  for (const m of src.matchAll(/from\s+["']\.\/([a-z-]+)["']/g)) deps.add(m[1]);

  const type = BLOCKS.has(name) ? "registry:block" : "registry:ui";

  items.push({
    name,
    type,
    title: pascal(name),
    description: description(src, pascal(name)),
    dependencies: npmDependencies(src),
    registryDependencies: [...deps],
    files: [
      {
        path: `registry/ui/${file}`,
        type,
        target: `components/glasskit/${file}`,
      },
    ],
  });
}

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "glasskit",
  homepage: "https://glasskit.app/ui",
  items,
};

// The committed manifest (index only — no file content).
writeFileSync(
  join(ROOT, "registry", "registry.json"),
  JSON.stringify(registry, null, 2) + "\n",
);

// The served distribution under apps/web/public/r/ (gitignored, built on
// demand): the index plus one registry-item per component with file CONTENT
// inlined, so a shadcn-compatible client can fetch /r/<name>.json and write it.
const PUBLIC_R = join(ROOT, "apps", "web", "public", "r");
mkdirSync(PUBLIC_R, { recursive: true });
writeFileSync(
  join(PUBLIC_R, "registry.json"),
  JSON.stringify(registry, null, 2) + "\n",
);
for (const item of items) {
  const served = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    ...item,
    files: item.files.map((f) => ({
      ...f,
      content: readFileSync(join(ROOT, f.path), "utf8"),
    })),
  };
  writeFileSync(
    join(PUBLIC_R, `${item.name}.json`),
    JSON.stringify(served, null, 2) + "\n",
  );
}

// llms.txt — generated from a handwritten template + the live component
// inventory, so the LLM-facing reference can't drift from the registry the
// way a hand-maintained list does.
const ui = items.filter(
  (i) => i.type === "registry:ui" || i.type === "registry:block",
);
const componentLines = ui
  .map((i) => `- **${i.title}** (\`${i.name}\`) — ${i.description}`)
  .join("\n");
const llms = readFileSync(join(ROOT, "apps", "web", "llms-template.md"), "utf8")
  .replaceAll("{{COUNT}}", String(ui.length))
  .replace("{{COMPONENTS}}", componentLines);
writeFileSync(join(ROOT, "apps", "web", "public", "llms.txt"), llms);

// Size guard: a vendored component should read in one sitting. 12 KB of
// source is the smell threshold — split or simplify past it (Navigator,
// the largest legitimate component, sits under 10 KB).
const CAP = 12 * 1024;
const oversized = items
  .flatMap((i) => i.files)
  .map((f) => ({
    path: f.path,
    bytes: Buffer.byteLength(readFileSync(join(ROOT, f.path), "utf8")),
  }))
  .filter((f) => f.bytes > CAP);
if (oversized.length > 0) {
  for (const f of oversized) {
    console.error(`✖ ${f.path}: ${f.bytes} bytes (cap ${CAP})`);
  }
  process.exit(1);
}

console.log(
  `registry.json — ${items.length} items (manifest + served /r/*.json) + llms.txt (${ui.length} components)`,
);
