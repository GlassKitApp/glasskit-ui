import { SITE } from "@/lib/config";
import { getComponentDoc } from "@/lib/component-docs";
import { getExample } from "@/lib/examples";

/**
 * The "Copy for LLM" payloads — self-contained, procedural agent recipes (the
 * Clerk model), not a "go read the docs" pointer. The copied text alone is
 * enough for a coding agent to set GlassKit up correctly, so it embeds the hard
 * platform constraints inline instead of relying on the model to fetch them.
 */

const RULES = `## The platform rules (critical — this is NOT a phone)

- Fixed **600x600** viewport. **One task per view** — a glanceable HUD, not a dashboard.
- Input is a **D-pad only**: ArrowUp/Down/Left/Right + Enter. Plus a middle-pinch **back gesture that arrives as a \`popstate\`**. There is **no** mouse, touch, keyboard, camera, microphone, or gaze. Never generate \`getUserMedia\`, \`SpeechRecognition\`, WebXR, or text inputs — they fail silently on-device. GPS and device orientation/motion DO work.
- **Every interactive element carries the \`focusable\` class**; the focus engine moves a spatial ring (arrows move it, Enter activates). Custom content goes in \`<Pressable onPress>\`. Never make a \`<div onClick>\` interactive.
- **Navigation is history-based**: use \`<Navigator>\` so the back gesture works. Text entry uses \`<ComposeFlow>\` pickers (there is no keyboard).
- Calm dark base, popping surfaces, one blue accent reserved for "pinch me" actions.`;

/** The full "Add GlassKit UI" playbook — for the landing page and any non-component doc. */
export function setupRecipe(): string {
  return `# Add GlassKit UI

Build a Meta Ray-Ban Display (smart-glasses) web app with GlassKit UI — a shadcn-style React component library for the in-lens 600x600 display. Components vendor into your repo, so you own the source.

## Quick setup

Before running commands, show the user this checklist and wait for confirmation:

> Here's how I'll set you up with GlassKit UI:
> 1. Scaffold a glasses app (if this folder is empty) or add GlassKit to this project
> 2. Install the GlassKit agent rules + MCP so I build to the platform's hard constraints
> 3. Add the components you need and compose your first screen
>
> Shall I proceed?

## Step 1 — Project

Inspect the current directory.
- **Empty directory** -> scaffold a ready-to-run Vite glasses app (600x600 viewport, focus engine, Tailwind + GlassKit tokens preconfigured):
  \`\`\`bash
  npm create glasskit@latest my-app
  \`\`\`
- **Existing project** -> continue here; GlassKit vendors components shadcn-style into \`components/glasskit/\`.

## Step 2 — Teach your agent the platform rules

GlassKit ships an agent skill so your coding agent builds to the platform's hard constraints. From the project root:
\`\`\`bash
npx @glasskit-ui/cli agents
\`\`\`
This writes (never overwriting): \`AGENTS.md\`, \`CLAUDE.md\`, \`.claude/skills/glasskit-ui/SKILL.md\`, \`.cursor/rules/glasskit.mdc\`, \`.github/copilot-instructions.md\`.

Optionally add the MCP server (Claude Code):
\`\`\`bash
claude mcp add glasskit -- npx @glasskit-ui/mcp
\`\`\`
Tools: \`glasskit_guidelines\`, \`list_components\`, \`search_components\`, \`get_component\`, \`get_add_command\`, \`get_component_example\`.

${RULES}

Full machine-readable reference: ${SITE}/llms.txt

## Step 3 — Add components

\`\`\`bash
npx @glasskit-ui/cli add screen button list navigator
\`\`\`
List everything with \`npx @glasskit-ui/cli list\`. Whole-app starting points: \`npx @glasskit-ui/cli add workout\` or \`messages\`. Wrap your app in \`<GlassViewport>\` from \`@glasskit-ui/react\` and call \`useDpad()\` once at the root.

## Step 4 — Compose & verify

Build screens to the conventions: one task per view, seed the initial ring with \`data-autofocus\`, logical RTL utilities only. Then verify: every interactive element is reachable and fired with arrows + Enter alone; no forbidden APIs; gzipped JS under 500 KB.

Docs: ${SITE}/docs · Reference: ${SITE}/llms.txt`;
}

/** A component/block/template-specific recipe: real install + usage + the rules. */
function componentRecipe(opts: {
  title: string;
  slug: string;
  description: string;
  usage: string;
  pageUrl: string;
}): string {
  return `# Use GlassKit UI — ${opts.title}

${opts.description}

This is a component for a Meta Ray-Ban Display (smart-glasses) web app built with GlassKit UI. Vendor it shadcn-style (you own the source).

## Install
\`\`\`bash
npx @glasskit-ui/cli add ${opts.slug}
\`\`\`
The CLI pulls in its registry dependencies automatically.

## Usage
\`\`\`tsx
${opts.usage}
\`\`\`

${RULES}

Wrap your app in \`<GlassViewport>\` from \`@glasskit-ui/react\` and call \`useDpad()\` once at the root.

Component docs: ${opts.pageUrl} · Full reference: ${SITE}/llms.txt`;
}

/** Pick the right recipe for a docs page: component-specific when we have one,
 *  else the full setup playbook. */
export function recipeForPage(opts: {
  url: string;
  title: string;
  description?: string;
  pageUrl: string;
}): string {
  const slug = opts.url.split("/").filter(Boolean).pop() ?? "";
  const doc = getComponentDoc(slug);
  if (doc) {
    return componentRecipe({
      title: doc.name,
      slug,
      description: opts.description ?? doc.summary,
      usage: doc.usage,
      pageUrl: opts.pageUrl,
    });
  }
  const example = getExample(slug);
  if (example) {
    return componentRecipe({
      title: example.name,
      slug,
      description: opts.description ?? example.summary,
      usage: example.usage,
      pageUrl: opts.pageUrl,
    });
  }
  return setupRecipe();
}
