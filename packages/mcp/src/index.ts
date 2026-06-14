#!/usr/bin/env node
/**
 * @glasskit-ui/mcp — a Model Context Protocol server that exposes the GlassKit UI
 * registry to AI coding agents, so they can discover and pull additive-lens
 * components into a project. A thin client over the served registry (the same
 * /r/*.json the CLI uses), configured by GLASSKIT_REGISTRY.
 *
 * Tools: glasskit_guidelines, list_components, get_component,
 * get_component_example, get_add_command, search_components.
 * Run (stdio):  GLASSKIT_REGISTRY=http://localhost:3000/r glasskit-mcp
 * Published as @glasskit-ui/mcp (bin: glasskit-mcp).
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

/** Server identity version, read from this package's package.json so it never
 *  drifts from the published version. */
const VERSION = JSON.parse(
  readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "..", "package.json"),
    "utf8",
  ),
).version as string;

/** The glasses-first rules an agent must follow — returned by the
 *  glasskit_guidelines tool so an agent with only the MCP (no project files)
 *  still builds correctly. Kept in lockstep with the CLI's AGENTS.md skill. */
const GUIDELINES = `# Building Meta Ray-Ban Display apps with GlassKit UI

## Glasses-first — rules that override everything
1. Only ARROWS + ENTER + the back gesture exist. No clicks-as-primary, hover,
   draggable scrollbars, or typed text fields. Build for the D-pad only.
2. The focus engine is NOT optional. Every interactive element gets the
   \`focusable\` class and must be reachable by arrows alone, fired by Enter
   (\`useDpad()\` once at the app root does spatial nav + Enter-to-click). For
   custom content wrap it in \`<Pressable onPress={...}>\` (a real focusable
   button); never make a \`<div onClick>\` interactive.
3. One task per view (600×600 glanceable lens). More than one main thing →
   split into more screens and navigate between them.
4. NEVER generate APIs the platform lacks: no getUserMedia, SpeechRecognition,
   gaze, WebXR, or text input — they fail silently on-device. GPS + device
   orientation/motion DO work.
5. Vendor components from the registry (list_components / get_component); don't
   hand-roll a worse version.

## Navigation = a history router
The back gesture (middle pinch) pops browser history → \`popstate\`. So:
- Multi-screen apps use \`<Navigator screens initial>\` + \`useNavigator()\`
  (push/pop/popToTop/replace). Every push adds a history entry; the gesture
  pops it — you never wire "back" by hand.
- push(name, params) carries params; the stack rides history.state (reload
  restores the screen); \`paths\` mirrors to the URL for deep links;
  \`useBackHandler(fn)\` lets an overlay consume back (return true).
- One nav model per screen: hierarchy → Navigator (only it touches history),
  peers → Tabs, linear flow → Deck, front door → Launcher.

## Other essentials
- Text entry: ComposeFlow (a picker for enumerable answers); there is no
  on-device free-form text input. Never invent on-device typing/dictation.
- Wayfinding: DirectionArrow (point at a target) vs MapView (route context).
- Styling: Tailwind utilities + \`--gk-*\` tokens (shadcn model), no inline
  style. Re-theme by overriding \`--gk-*\` on \`.glass-viewport\` (one block
  reskins all). The filled accent (\`btn-primary\`) means "pinch me" — only
  actions wear it.
- Verify: every interactive element reachable + fired by arrows alone; no
  forbidden APIs; gzipped JS under 500 KB.

Full procedure: https://glasskit.app/ui/docs/conventions`;

const REGISTRY = (
  process.env.GLASSKIT_REGISTRY ?? "https://glasskit.app/ui/r"
).replace(/\/$/, "");

type RegistryFile = { target: string; content?: string };
type RegistryItem = {
  name: string;
  type: string;
  description?: string;
  registryDependencies?: string[];
  files: RegistryFile[];
  /** Optional usage example, surfaced by the served /r/<name>.json (built from
   *  the docs site). `usage` is the canonical spot; `meta.usage` is the served
   *  shape — get_component_example reads either. */
  usage?: string;
  meta?: { usage?: string };
};

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  return (await res.json()) as T;
}

const text = (s: string) => ({ content: [{ type: "text" as const, text: s }] });
const pascal = (name: string) =>
  name.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase());
const itemLines = (items: RegistryItem[]) =>
  items.map((i) => `- ${i.name}: ${i.description ?? ""}`).join("\n");

const server = new McpServer({ name: "glasskit-ui", version: VERSION });

server.tool(
  "glasskit_guidelines",
  "How to build Meta Ray-Ban Display apps with GlassKit UI — the glasses-first rules, the focus engine, and the navigation/history model. Read this BEFORE generating screens.",
  {},
  async () => text(GUIDELINES),
);

server.tool(
  "list_components",
  "List every GlassKit UI additive-lens component (name + one-line description).",
  {},
  async () => {
    const reg = await fetchJson<{ items: RegistryItem[] }>(
      `${REGISTRY}/registry.json`,
    );
    const ui = reg.items.filter(
      (i) => i.type === "registry:ui" || i.type === "registry:block",
    );
    return text(`GlassKit UI — ${ui.length} components\n\n${itemLines(ui)}`);
  },
);

server.tool(
  "get_component",
  "Get a GlassKit UI component's source, dependencies, and install command.",
  { name: z.string().describe('component name, e.g. "button"') },
  async ({ name }) => {
    const item = await fetchJson<RegistryItem>(`${REGISTRY}/${name}.json`);
    const deps = (item.registryDependencies ?? []).join(", ") || "none";
    const files = item.files
      .map((f) => `// ${f.target}\n${f.content ?? "(no content)"}`)
      .join("\n\n");
    return text(
      `# ${item.name}\n${item.description ?? ""}\n\n` +
        `Install:  npx @glasskit-ui/cli add ${name}\nDependencies: ${deps}\n\n${files}`,
    );
  },
);

server.tool(
  "get_add_command",
  "Get the single CLI command that installs ALL the named GlassKit UI components at once, plus each one's registry dependencies (what else gets pulled in).",
  {
    names: z
      .array(z.string())
      .describe('component names, e.g. ["button", "list"]'),
  },
  async ({ names }) => {
    if (names.length === 0)
      return text("Provide at least one component name.");
    const items = await Promise.all(
      names.map((name) =>
        fetchJson<RegistryItem>(`${REGISTRY}/${name}.json`).then(
          (item) => ({ name, item }),
          (err: unknown) => ({
            name,
            error: err instanceof Error ? err.message : String(err),
          }),
        ),
      ),
    );
    const command = `npx @glasskit-ui/cli add ${names.join(" ")}`;
    const lines = items.map((r) =>
      "error" in r
        ? `- ${r.name}: (not found — ${r.error})`
        : `- ${r.name}: pulls in ${
            (r.item.registryDependencies ?? []).join(", ") || "no extra components"
          }`,
    );
    return text(`Install all of them at once:\n\n${command}\n\n${lines.join("\n")}`);
  },
);

server.tool(
  "get_component_example",
  "Get a concise USAGE example for a GlassKit UI component (the shape to copy, not its full source). Use get_component when you need the implementation.",
  { name: z.string().describe('component name, e.g. "button"') },
  async ({ name }) => {
    const item = await fetchJson<RegistryItem>(`${REGISTRY}/${name}.json`);
    const deps = (item.registryDependencies ?? []).join(", ") || "none";
    const install = `npx @glasskit-ui/cli add ${name}`;
    // Prefer a real, authored example; otherwise synthesize a minimal one and
    // label it as a starting point so the agent knows to refine it.
    const real = item.usage ?? item.meta?.usage;
    const example = real
      ? `\`\`\`tsx\n${real}\n\`\`\``
      : `\`\`\`tsx\n// starting point — refine against get_component\n<${pascal(
          name,
        )} />\n\`\`\``;
    return text(
      `# ${pascal(name)}\n${item.description ?? ""}\n\n` +
        `Install:  ${install}\nDependencies: ${deps}\n\n` +
        `Usage:\n${example}`,
    );
  },
);

server.tool(
  "search_components",
  "Search GlassKit UI components by name or description.",
  { query: z.string().describe('a keyword, e.g. "progress" or "gauge"') },
  async ({ query }) => {
    const reg = await fetchJson<{ items: RegistryItem[] }>(
      `${REGISTRY}/registry.json`,
    );
    const q = query.toLowerCase();
    const hits = reg.items.filter(
      (i) =>
        (i.type === "registry:ui" || i.type === "registry:block") &&
        (i.name.includes(q) || (i.description ?? "").toLowerCase().includes(q)),
    );
    if (hits.length === 0) return text(`No components match "${query}".`);
    return text(itemLines(hits));
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
