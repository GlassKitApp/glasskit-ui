/**
 * Agent files — the GlassKit skill for AI coding agents, in every format the
 * ecosystem reads. One canonical body (AGENTS_MD: ambient rules every agent
 * should always know) + one deep procedure (SKILL_MD: the Claude
 * Code/Agent-SDK skill, loaded on demand) + thin pointers for Cursor and
 * Copilot. Written into every `init` scaffold and into existing projects via
 * `glasskit agents`.
 */

export const AGENTS_MD = `# __NAME__ — agent guide

A **Meta Ray-Ban Display** web app built with
[GlassKit UI](https://glasskit.app/ui). Everything below is platform truth —
do not assume more than it grants.

## Platform (verified against Meta's docs)

- Input reaching the page: \`ArrowUp/Down/Left/Right\` + \`Enter\` keydowns —
  nothing else. No cursor, touch, wheel, or text input. The Neural Band
  wristband produces these same events (swipe → arrows, pinch → Enter).
- The system **back gesture** (middle pinch) pops browser history → your page
  gets \`popstate\`. \`Escape\` is the desktop-simulator mapping only.
- Fixed **600×600** viewport. The required meta tags
  (\`width=600, height=600, user-scalable=no\` +
  \`<meta name="mrbd-web-app-capable" content="yes">\`) are already in
  \`index.html\` — keep them.
- **No camera, microphone, gaze, WebXR, or text-input APIs.** Never generate
  getUserMedia, SpeechRecognition, or dictation flows — they silently fail
  on-device. GPS works (proxied from the phone); orientation/motion work.
- Perf budget: under 500 KB gzipped JS and 10 requests. Apps must be served
  over public HTTPS to install on glasses.

## Focus contract

- Interactive elements carry the \`focusable\` class; \`useDpad()\` is called
  once at the root (already wired in \`src/App.tsx\`). Arrows move a spatial
  focus ring; Enter activates.
- \`data-autofocus\` on a focusable picks where a screen's ring starts.
  \`<FocusScope>\` contains the ring for modal surfaces.
- A focused slider owns ArrowLeft/Right (value adjust); vertical arrows
  navigate away.

## Building screens

- **One task per view.** If a screen needs three components fighting for
  attention, it's three screens.
- Hierarchy = the \`navigator\` component (every push is a history entry, so
  the back gesture just works). Peers = \`tabs\`. Linear flows = \`deck\`.
- **Text entry**: \`compose-flow\` (picker) for enumerable answers; the phone
  relay template for free-form. Never invent on-device typing or dictation.
- Vendor components — never hand-write what the registry has:
  \`npx @glasskit-ui/cli add <name>\`
  (catalog: https://glasskit.app/ui/llms.txt · docs:
  https://glasskit.app/ui/docs/components · patterns guide:
  https://glasskit.app/ui/docs/patterns)
- Theming: re-declare the accent ramp tokens on \`.glass-viewport\` — never
  hardcode accent colors (generator: https://glasskit.app/ui/playground).

## Verify

- \`npm run dev\` → drive with arrow keys, Enter, Escape. Every interactive
  element must be reachable by arrows alone.
- \`npm run build\` and check the gzipped JS stays under the budget.

Full build procedure for capable agents: \`.claude/skills/glasskit-ui/SKILL.md\`.
`;

export const SKILL_MD = `---
name: glasskit-ui
description: Build Meta Ray-Ban Display (smart glasses) web app screens with GlassKit UI — component selection, D-pad focus rules, navigation, text entry, and theming for the 600×600 lens. Use when creating or modifying screens in this app.
---

# Building glasses-app screens with GlassKit UI

Read \`AGENTS.md\` first — it is the platform contract (input model, no
camera/mic/gaze, 600×600, perf budget). This skill is the build procedure.

## 1. Pick components — don't hand-write

The registry has 48 components covering the HUD jobs. Vendor them:

\`\`\`sh
npx @glasskit-ui/cli add navigator list timer confirm compose-flow
\`\`\`

Machine-readable catalog: https://glasskit.app/ui/llms.txt (descriptions),
https://glasskit.app/ui/r/registry.json (sources + deps). An MCP server
(\`npx @glasskit-ui/mcp\`) exposes search/get as tools.

Decision rules (full guide: https://glasskit.app/ui/docs/patterns):

- Hierarchy (list → detail, "back means up") → **navigator**.
  Peer views → **tabs** (in Screen's \`status\` slot, at the top).
  Linear flow → **deck**. App front door → **launcher**.
- Wearer must act on it → **notification-card**. Already happened →
  **toast** / **toaster** (top-anchored, never put focusables inside).
- Task completion → **progress** · a level → **meter** · time left → **timer**.
- Nothing yet → **empty-state** · failed + retry → **error-state**, both as
  **async-view** slots.
- Text entry → **compose-flow** (picker). Free-form → the phone relay
  (\`relay/\` if scaffolded with it). NEVER invent dictation/keyboard.

## 2. Compose the screen

\`\`\`tsx
<Screen
  status={/* glanceable context: Tabs, a live StatusDot Cue */}
  cue={<Cue>what the wearer can do right now</Cue>}
>
  {/* ONE main thing */}
</Screen>
\`\`\`

- One \`Cue\` per screen (it's a live region). Rapidly-changing values
  (Readout, StatGrid) are deliberately not live — narrate milestones via Cue.
- Confirm with irreversible consequences → \`<Confirm destructive …>\` (seeds
  the ring on cancel).
- World-anchored components (Compass, Pin, Callout, Reticle, DirectionArrow,
  Viewfinder) never mirror in RTL; everything else uses logical CSS.

## 3. Wire behavior

- Sensor components self-connect when their data prop is omitted
  (\`<Compass />\` is live; \`<Compass heading={290} />\` is controlled — the
  prop always wins).
- Navigation: \`useNavigator()\` → \`push/pop/popToTop/replace\`;
  \`useBackHandler(fn)\` for overlays that consume back. Params ride
  \`push(name, params)\`; the stack survives reload via history.state.
- Haptics seam: \`buzz("tap" | "success" | "warning")\` at interaction points
  (no-op today, lights up when the platform ships haptics).
- Prop vocabulary: \`emphasis\` = visual weight · \`status\` = semantic state ·
  \`tone\` = gradient palette. Use these words with these meanings.

## 4. Style

- No inline \`style={{}}\` — semantic \`gk-*\` classes + the token ramp.
  Re-theme by re-declaring the accent ramp on \`.glass-viewport\`
  (7 tokens; generator: https://glasskit.app/ui/playground).
- The filled accent gradient means "pinch me" — only actions wear it.

## 5. Verify before declaring done

1. \`npm run dev\` — reach EVERY interactive element with arrows alone;
   Enter activates; Escape backs out without dead-ends.
2. No console errors; no forbidden APIs (getUserMedia, SpeechRecognition).
3. \`npm run build\` — gzipped JS under 500 KB.

## Honesty list (UI that must not overpromise)

Viewfinder = camera-style chrome, nothing records. Reticle's \`active\` is
app state, not gaze. TextField's mic glyph opens YOUR capture flow.
NowPlaying displays playback your app tracks. The wishlist of missing
platform APIs: https://glasskit.app/ui/docs/wishlist
`;

export const CLAUDE_MD = `@AGENTS.md
`;

export const CURSOR_RULE = `---
description: GlassKit UI glasses-app rules (Meta Ray-Ban Display)
alwaysApply: true
---

Read AGENTS.md before changing code — it is the platform contract. Key
hard rules: only arrow/Enter input exists (no touch/cursor/text input/
camera/mic/gaze APIs); interactive elements need the \`focusable\` class;
one task per view; vendor components with \`npx @glasskit-ui/cli add\`
instead of hand-writing them; no inline style — theme via the accent ramp
tokens. Full procedure: .claude/skills/glasskit-ui/SKILL.md
`;

export const COPILOT_MD = `Read AGENTS.md before changing code — it is the platform contract for this
Meta Ray-Ban Display app (GlassKit UI). Only arrow/Enter input exists; no
camera/microphone/gaze/text-input APIs — never generate getUserMedia or
SpeechRecognition. Interactive elements need the \`focusable\` class. Vendor
components with \`npx @glasskit-ui/cli add <name>\` (catalog:
https://glasskit.app/ui/llms.txt). One task per view; no inline styles.
`;

/** path → content, __NAME__ substituted by the caller. */
export function agentFiles(): Record<string, string> {
  return {
    "AGENTS.md": AGENTS_MD,
    "CLAUDE.md": CLAUDE_MD,
    ".claude/skills/glasskit-ui/SKILL.md": SKILL_MD,
    ".cursor/rules/glasskit.mdc": CURSOR_RULE,
    ".github/copilot-instructions.md": COPILOT_MD,
  };
}
