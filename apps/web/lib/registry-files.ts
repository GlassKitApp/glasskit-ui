import { readFileSync } from "node:fs";
import { join } from "node:path";
import registry from "@registry/registry.json";

/**
 * Resolve the files a component vendors — itself + its registryDependencies +
 * the shared `utils` — and read their source for the docs "Manual" tab. Runs at
 * build time (the component pages are statically generated), reading from the
 * repo's registry/ via the manifest. Mirrors what `glasskit add <slug>` writes.
 */
type RegItem = {
  name: string;
  registryDependencies?: string[];
  files: { path: string; target: string }[];
};

const ITEMS = registry.items as RegItem[];
const REPO_ROOT = join(process.cwd(), "..", "..");

function resolve(slug: string, seen: Set<string>, out: RegItem[]) {
  if (seen.has(slug)) return;
  seen.add(slug);
  const item = ITEMS.find((i) => i.name === slug);
  if (!item) return;
  for (const dep of item.registryDependencies ?? []) resolve(dep, seen, out);
  out.push(item);
}

export type ComponentFile = { target: string; content: string };

export function getComponentFiles(slug: string): ComponentFile[] {
  const items: RegItem[] = [];
  resolve(slug, new Set(), items);
  const byTarget = new Map<string, ComponentFile>();
  for (const item of items) {
    for (const f of item.files) {
      byTarget.set(f.target, {
        target: f.target,
        content: readFileSync(join(REPO_ROOT, f.path), "utf8"),
      });
    }
  }
  return [...byTarget.values()];
}
