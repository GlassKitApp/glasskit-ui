#!/usr/bin/env node
/**
 * @glasskit-ui/cli (bin: glasskit) — the GlassKit UI CLI. Scaffolds glasses
 * apps and vendors lens components from the registry (the branded
 * `npx shadcn` equivalent). The bare `glasskit` npm name belongs to an
 * unrelated package — always document the scoped form.
 *
 *   npx @glasskit-ui/cli init my-app        # scaffold a Vite glasses app
 *   npx @glasskit-ui/cli add button readout # add components (+ their deps)
 *   npx @glasskit-ui/cli list               # list available components
 *
 * Flags: --registry <url> (default https://glasskit.app/ui/r), --cwd <dir>,
 *        --overwrite, --no-install, --help. Zero runtime deps — Node 18+
 *        (global fetch).
 *
 * Local dev against a built registry:
 *   pnpm build:registry && (serve apps/web) && glasskit add button --registry http://localhost:3000/ui/r
 */
import { mkdir, writeFile, readFile, readdir, access } from "node:fs/promises";
import {
  basename,
  dirname,
  join,
  resolve,
  relative,
  isAbsolute,
} from "node:path";
import { spawnSync } from "node:child_process";
import { scaffoldFiles, TEMPLATES, type TemplateName } from "./templates";
import { agentFiles } from "./agents";

const DEFAULT_REGISTRY = "https://glasskit.app/ui/r";

// The served registry-item shape (shadcn-format), emitted by
// scripts/build-registry.mjs. Keep in sync if that schema changes.
type RegistryFile = { path: string; target: string; content?: string };
type RegistryItem = {
  name: string;
  description?: string;
  type: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
};
type Options = {
  registry: string;
  cwd: string;
  overwrite: boolean;
  install: boolean;
  template: TemplateName;
};

const c = {
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  dim: (s: string) => `\x1b[2m${s}\x1b[0m`,
  bold: (s: string) => `\x1b[1m${s}\x1b[0m`,
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
};

function parse(argv: string[]) {
  const positionals: string[] = [];
  const opts: Options = {
    registry: process.env.GLASSKIT_REGISTRY ?? DEFAULT_REGISTRY,
    cwd: process.cwd(),
    overwrite: false,
    install: true,
    template: "default",
  };
  let help = false;
  const value = (flag: string, i: number) => {
    const v = argv[i];
    if (v == null) {
      console.error(c.red(`${flag} needs a value`));
      process.exit(1);
    }
    return v;
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--registry") opts.registry = value(a, ++i);
    else if (a === "--cwd") opts.cwd = resolve(value(a, ++i));
    else if (a === "--overwrite") opts.overwrite = true;
    else if (a === "--no-install") opts.install = false;
    else if (a === "--template" || a === "-t") {
      const t = value(a, ++i);
      if (!(TEMPLATES as readonly string[]).includes(t)) {
        console.error(
          c.red(`unknown template "${t}" — available: ${TEMPLATES.join(", ")}`),
        );
        process.exit(1);
      }
      opts.template = t as TemplateName;
    } else if (a === "--help" || a === "-h") help = true;
    else positionals.push(a!);
  }
  opts.registry = opts.registry.replace(/\/$/, "");
  return { command: positionals[0], names: positionals.slice(1), opts, help };
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  return (await res.json()) as T;
}

const exists = (p: string) =>
  access(p).then(
    () => true,
    () => false,
  );

/** Bare package name of an npm dep spec ("@scope/pkg@^1.0.0" → "@scope/pkg"). */
function depName(spec: string): string {
  const at = spec.indexOf("@", spec.startsWith("@") ? 1 : 0);
  return at === -1 ? spec : spec.slice(0, at);
}

/** Detect the consumer's package manager from its lockfile (default npm). */
async function packageManager(cwd: string): Promise<string> {
  const lockfiles: Array<[string, string]> = [
    ["pnpm-lock.yaml", "pnpm"],
    ["yarn.lock", "yarn"],
    ["bun.lockb", "bun"],
    ["bun.lock", "bun"],
    ["package-lock.json", "npm"],
  ];
  for (const [file, pm] of lockfiles) {
    if (await exists(join(cwd, file))) return pm;
  }
  return "npm";
}

/**
 * Install the npm dependencies declared by the resolved registry items,
 * skipping any already present in the consumer's package.json. With
 * --no-install (or when no package.json exists), prints the command instead.
 */
async function installDependencies(items: RegistryItem[], opts: Options) {
  const specs = new Map<string, string>();
  for (const item of items)
    for (const spec of item.dependencies ?? []) specs.set(depName(spec), spec);
  if (specs.size === 0) return;

  let declared: Record<string, string> = {};
  const pkgPath = join(opts.cwd, "package.json");
  const hasPkg = await exists(pkgPath);
  if (hasPkg) {
    const pkg = JSON.parse(await readFile(pkgPath, "utf8"));
    declared = {
      ...pkg.dependencies,
      ...pkg.devDependencies,
      ...pkg.peerDependencies,
    };
  }
  const missing = [...specs.entries()]
    .filter(([name]) => !(name in declared))
    .map(([, spec]) => spec);
  if (missing.length === 0) return;

  const pm = await packageManager(opts.cwd);
  const command = `${pm} add ${missing.join(" ")}`;
  if (!opts.install || !hasPkg) {
    console.log(`\nInstall the required dependencies:\n  ${c.bold(command)}`);
    return;
  }
  console.log(
    `\n${c.green("install")} ${missing.join(" ")} ${c.dim(`(${pm})`)}`,
  );
  const result = spawnSync(pm, ["add", ...missing], {
    cwd: opts.cwd,
    stdio: "inherit",
  });
  if (result.status !== 0) {
    console.error(
      c.red(`Dependency install failed — run it yourself:\n  ${command}`),
    );
    process.exitCode = 1;
  }
}

/** Resolve items + their registryDependencies (depth-first, deduped). */
async function resolve_(
  names: string[],
  base: string,
  seen = new Set<string>(),
  out: RegistryItem[] = [],
): Promise<RegistryItem[]> {
  for (const name of names) {
    if (seen.has(name)) continue;
    seen.add(name);
    const item = await fetchJson<RegistryItem>(`${base}/${name}.json`);
    await resolve_(item.registryDependencies ?? [], base, seen, out);
    out.push(item);
  }
  return out;
}

async function add(names: string[], opts: Options) {
  if (names.length === 0) {
    console.error(
      c.red("Specify at least one component, e.g. glasskit add button"),
    );
    process.exitCode = 1;
    return;
  }
  const items = await resolve_(names, opts.registry);
  // Dedupe by target — shared files (e.g. lib/utils) appear in several items.
  const files = new Map<string, RegistryFile>();
  for (const item of items) for (const f of item.files) files.set(f.target, f);

  let written = 0;
  let skipped = 0;
  for (const [target, f] of files) {
    const dest = resolve(opts.cwd, target);
    const rel = relative(opts.cwd, dest);
    if (rel.startsWith("..") || isAbsolute(rel)) {
      console.warn(c.dim(`skip  ${target} (escapes target dir)`));
      continue;
    }
    if (f.content == null) {
      console.warn(c.dim(`skip  ${target} (no content)`));
      continue;
    }
    if (!opts.overwrite && (await exists(dest))) {
      console.log(c.dim(`skip  ${target} (exists)`));
      skipped++;
      continue;
    }
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, f.content);
    console.log(`${c.green("add")}   ${target}`);
    written++;
  }
  console.log(
    `\n${c.green("✓")} ${written} file${written === 1 ? "" : "s"} written` +
      (skipped ? c.dim(` · ${skipped} skipped (use --overwrite)`) : ""),
  );
  await installDependencies(items, opts);
  if (written > 0) {
    console.log(
      c.dim("Make sure your CSS imports @glasskit-ui/react/styles.css."),
    );
  }
}

async function list(opts: Options) {
  const reg = await fetchJson<{ items: RegistryItem[] }>(
    `${opts.registry}/registry.json`,
  );
  const ui = reg.items.filter((i) => i.type === "registry:ui");
  console.log(c.bold(`\nGlassKit UI — ${ui.length} components\n`));
  for (const it of ui) {
    console.log(
      `  ${c.green(it.name.padEnd(20))} ${c.dim(it.description ?? "")}`,
    );
  }
  console.log(c.dim(`\nAdd one:  glasskit add <name>\n`));
}

/**
 * `glasskit agents` — write the AI-agent skill files into an existing
 * project. Never overwrites: existing files are skipped with a note, so a
 * project's own AGENTS.md is safe (append our block by hand from
 * https://glasskit.app/ui/docs/ai).
 */
async function agents(opts: Options) {
  const name = basename(opts.cwd) || "glasses-app";
  for (const [path, content] of Object.entries(agentFiles())) {
    const dest = join(opts.cwd, path);
    if (await exists(dest)) {
      console.log(`${c.dim("skip  ")} ${path} ${c.dim("(exists)")}`);
      continue;
    }
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, content.replaceAll("__NAME__", name));
    console.log(`${c.green("create")} ${path}`);
  }
  console.log(`
${c.bold("Agent skill installed.")} Claude Code, Cursor, Copilot, and any
AGENTS.md-reading agent now know the platform contract. Docs:
https://glasskit.app/ui/docs/ai`);
}

/**
 * `glasskit init [dir]` — dual-mode like shadcn's init:
 *   - inside an existing project (package.json present): print setup steps
 *   - in an empty / new directory: scaffold a complete Vite + React glasses
 *     app (required 600×600 + mrbd meta tags, GlassViewport + useDpad wired)
 */
async function init(dir: string | undefined, opts: Options) {
  const target = resolve(opts.cwd, dir ?? ".");

  if (await exists(join(target, "package.json"))) {
    console.log(`
${c.bold("GlassKit UI — add to an existing project")}

  1. ${c.green("pnpm add @glasskit-ui/react")}   ${c.dim("# the SDK (hooks + GlassViewport)")}
  2. In your CSS, after Tailwind:
       ${c.dim('@import "tailwindcss";')}
       ${c.dim('@import "@glasskit-ui/react/styles.css";')}
  3. Add components:
       ${c.green("npx @glasskit-ui/cli add button readout")}

  Docs: https://glasskit.app/ui/docs
`);
    return;
  }

  const existing = (await exists(target)) ? await readdir(target) : [];
  if (existing.filter((f) => f !== ".git").length > 0) {
    console.error(
      c.red(`${relative(opts.cwd, target) || "."} is not empty and has no package.json.
Run init in an empty directory (or pass one: glasskit init my-app).`),
    );
    process.exitCode = 1;
    return;
  }

  // Valid npm name from the directory.
  const name =
    basename(target)
      .toLowerCase()
      .replace(/[^a-z0-9-_.]+/g, "-") || "glasses-app";
  for (const [path, content] of Object.entries(
    scaffoldFiles(name, opts.template),
  )) {
    const dest = join(target, path);
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, content);
    console.log(
      `${c.green("create")} ${join(relative(opts.cwd, target), path)}`,
    );
  }

  // Install with whichever package manager invoked us (npx → npm,
  // pnpm dlx → pnpm, …); a fresh scaffold has no lockfile to detect from.
  const pm = process.env.npm_config_user_agent?.split("/")[0] || "npm";
  if (opts.install) {
    console.log(`\n${c.green("install")} ${c.dim(`(${pm})`)}`);
    const result = spawnSync(pm, ["install"], {
      cwd: target,
      stdio: "inherit",
    });
    if (result.status !== 0) {
      console.error(
        c.red(`Install failed — run it yourself: cd ${name} && ${pm} install`),
      );
      process.exitCode = 1;
      return;
    }
  }

  const cd = relative(opts.cwd, target);
  console.log(`
${c.green("✓")} ${c.bold(name)} is ready — a 600×600 glasses app.

  ${cd && cd !== "." ? c.green(`cd ${cd}`) + "\n  " : ""}${opts.install ? "" : c.green(`${pm} install`) + "\n  "}${c.green(`${pm} run dev`)}        ${c.dim("# arrow keys = D-pad, Enter = pinch")}
  ${c.green("npx @glasskit-ui/cli add list button readout")}

  Ship it: build, deploy to any HTTPS host, add the URL in the Meta AI app.
`);
}

function help() {
  console.log(`
${c.bold("glasskit")} — vendor additive-lens components into your project

${c.bold("Usage")}
  glasskit agents            write the AI-agent skill files (AGENTS.md,
                             Claude skill, Cursor rule, Copilot instructions)
                             into an existing project — skips files that exist
  glasskit init [dir]        scaffold a Vite glasses app (or print setup
                             steps inside an existing project)
  glasskit add <name...>     add components (and their dependencies)
  glasskit list              list available components

${c.bold("Flags")}
  --registry <url>           registry base url (default ${DEFAULT_REGISTRY})
  --cwd <dir>                target project directory (default: cwd)
  --overwrite                overwrite files that already exist
  --no-install               print npm deps instead of installing them
  --template, -t <name>      init template: default | relay (phone text relay)
  -h, --help                 show this help
`);
}

async function main() {
  const { command, names, opts, help: wantHelp } = parse(process.argv.slice(2));
  if (wantHelp || !command || command === "help") return help();
  try {
    if (command === "add") await add(names, opts);
    else if (command === "list" || command === "ls") await list(opts);
    else if (command === "init") await init(names[0], opts);
    else if (command === "agents") await agents(opts);
    else {
      console.error(c.red(`Unknown command: ${command}`));
      help();
      process.exitCode = 1;
    }
  } catch (err) {
    console.error(c.red(`Error: ${(err as Error).message}`));
    process.exitCode = 1;
  }
}

void main();
