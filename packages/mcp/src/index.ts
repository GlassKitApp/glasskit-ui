#!/usr/bin/env node
/**
 * @glasskit-ui/mcp — a Model Context Protocol server that exposes the GlassKit UI
 * registry to AI coding agents, so they can discover and pull additive-lens
 * components into a project. A thin client over the served registry (the same
 * /r/*.json the CLI uses), configured by GLASSKIT_REGISTRY.
 *
 * Tools: list_components, get_component, search_components.
 * Run (stdio):  GLASSKIT_REGISTRY=http://localhost:3000/r glasskit-mcp
 * Published as @glasskit-ui/mcp (bin: glasskit-mcp).
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

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
};

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  return (await res.json()) as T;
}

const text = (s: string) => ({ content: [{ type: "text" as const, text: s }] });
const itemLines = (items: RegistryItem[]) =>
  items.map((i) => `- ${i.name}: ${i.description ?? ""}`).join("\n");

const server = new McpServer({ name: "glasskit-ui", version: "0.0.0" });

server.tool(
  "list_components",
  "List every GlassKit UI additive-lens component (name + one-line description).",
  {},
  async () => {
    const reg = await fetchJson<{ items: RegistryItem[] }>(
      `${REGISTRY}/registry.json`,
    );
    const ui = reg.items.filter((i) => i.type === "registry:ui");
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
        i.type === "registry:ui" &&
        (i.name.includes(q) || (i.description ?? "").toLowerCase().includes(q)),
    );
    if (hits.length === 0) return text(`No components match "${query}".`);
    return text(itemLines(hits));
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
