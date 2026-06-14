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

## Glasses-first — the rules that override everything

1. **Only arrows + Enter + the back gesture exist.** Build every interaction
   for that input and nothing else. No clicks-as-primary, no hover, no
   scrollbars-you-drag, no text fields you type into.
2. **The focus engine is not optional.** Every interactive element carries the
   \`focusable\` class and must be reachable by arrow keys alone, activated by
   Enter. If a control can't be reached and fired with the D-pad, it doesn't
   work on the glasses — full stop.
3. **One task per view.** A 600×600 lens is glanceable, not a dashboard. More
   than one "main thing" on a screen → split it into more screens and
   **navigate** between them (see Navigation & history).
4. **Never generate APIs the platform doesn't have** — no \`getUserMedia\`,
   \`SpeechRecognition\`, gaze, WebXR, or text-input. They fail silently
   on-device. (GPS and device orientation/motion DO work.)
5. **Vendor components, don't hand-roll them.** The registry covers the HUD
   jobs; discover and add them (below) instead of rebuilding a worse List.

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
- **Building something custom?** Wrap it in \`<Pressable onPress={...}>\`
  (add it from the registry). It renders a real focusable \`<button>\` and fires
  on Enter/pinch, so your card/tile/row works on the D-pad. Never make a
  \`<div onClick>\` interactive: a div is not focusable, so the glasses can't
  reach it.
- \`data-autofocus\` on a focusable picks where a screen's ring starts.
  \`<FocusScope>\` contains the ring for modal surfaces.
- A focused slider owns ArrowLeft/Right (value adjust); vertical arrows
  navigate away.

## Navigation & history (the back gesture is a history router)

The system back gesture (middle pinch) **pops browser history** → your page
gets \`popstate\`. So real back behavior comes from putting screens on the
history stack. Use the **\`navigator\`** component for any multi-screen app:

- \`<Navigator screens={{…}} initial="home" />\` renders one screen at a time.
  \`useNavigator()\` gives \`push / pop / popToTop / replace\`; **every \`push\`
  adds a real history entry**, so the back gesture (and Escape in desktop dev)
  pops it automatically — you don't wire back by hand.
- \`push(name, params)\` carries params to the screen. The stack rides in
  \`history.state\`, so a mid-flow reload restores the screen the wearer was on.
  Opt-in \`paths={{ name: segment }}\` mirrors the stack into the URL for
  deep-linkable screens.
- \`useBackHandler(fn)\` lets an overlay/sheet **consume** the back gesture
  (return \`true\` to keep the screen, e.g. close a sheet instead of leaving).
- At the root screen the gesture falls through to the OS (app switcher) — like
  Android's back contract. Don't trap it there.
- **Pick one nav model per screen.** Hierarchy ("back means up a level") →
  **navigator** (only it touches history). Peer views → **tabs** (in Screen's
  \`status\` slot, at the top). Linear wizard/flow → **deck**. App front door →
  **launcher**. Tabs and Deck do NOT touch history — back exits the app from
  them, so use Navigator when the wearer needs to go "back."

## Building screens

- **Text entry**: \`compose-flow\` (picker) for enumerable answers. There is no
  on-device keyboard or microphone API, so never invent typing or dictation.
- **Wayfinding**: \`direction-arrow\` to point at one target (find a friend, a
  car, an off-screen pin); \`map-view\` (real Leaflet map) when you need route
  context. Don't reach for a heavy map when an arrow will do.
- Theming: re-declare the accent ramp tokens on \`.glass-viewport\` — never
  hardcode accent colors (generator: https://glasskit.app/ui/playground).

## Finding components (don't guess — look them up)

The registry is the source of truth. Discover what exists before building:

- **MCP server** (best for agents): \`npx @glasskit-ui/mcp\` exposes
  \`list_components\`, \`search_components\`, \`get_component\` as tools — search
  by job, read the real source.
- **Catalog**: https://glasskit.app/ui/llms.txt (every component + description)
  · docs: https://glasskit.app/ui/docs/components · decision guide:
  https://glasskit.app/ui/docs/conventions
- **Add one**: \`npx @glasskit-ui/cli add <name>\` (vendors the source + installs
  its deps into your project — you own the file).

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

The registry covers the HUD jobs. **Discover what exists before building** —
don't guess a component's name or props:

- MCP (best): \`npx @glasskit-ui/mcp\` → \`list_components\` /
  \`search_components\` / \`get_component\`.
- Catalog: https://glasskit.app/ui/llms.txt · sources + deps:
  https://glasskit.app/ui/r/registry.json

Then vendor what you need (installs deps, you own the source):

\`\`\`sh
npx @glasskit-ui/cli add navigator list timer confirm compose-flow map-view
\`\`\`

Whole-app starting points exist too: \`npx @glasskit-ui/cli add workout\`
(Navigator + Timer + a destructive Confirm) or \`messages\` (thread +
ComposeFlow) vendor a full multi-screen example you can adapt.

Decision rules (full guide: https://glasskit.app/ui/docs/conventions):

- **Navigation** — hierarchy ("back means up") → **navigator** (puts screens on
  history so the back gesture works). Peer views → **tabs** (Screen's \`status\`
  slot). Linear flow → **deck**. App front door → **launcher**. One nav model
  per screen; only Navigator touches history.
- **Wayfinding** — point at one target → **direction-arrow**; route context →
  **map-view** (a real Leaflet map).
- Wearer must act on it → **notification-card**. Already happened →
  **toast** / **toaster** (top-anchored, never put focusables inside).
- Task completion → **progress** · a level → **meter** · time left → **timer**.
- Nothing yet → **empty-state** · failed + retry → **error-state**, both as
  **async-view** slots.
- Text entry → **compose-flow** (a picker for enumerable answers). There is no
  on-device free-form text input. NEVER invent dictation/keyboard.

## 2. Compose the screen

\`\`\`tsx
<Screen
  status={/* glanceable context: Tabs, a live StatusDot */}
  cue="what the wearer can do right now"
>
  {/* ONE main thing */}
</Screen>
\`\`\`

- \`cue\` is Screen's own prop (a polite live region, one narration line per
  screen); pass \`cueLive\` to accent it for an active state. Rapidly-changing
  values (Readout, StatGrid) are deliberately not live — narrate milestones via
  \`cue\`.
- Confirm with irreversible consequences → \`<Confirm destructive …>\` (seeds
  the ring on cancel and reads red). Accept/decline on a call → Button
  \`variant="positive"\` / \`"danger"\`.
- World-anchored components (Compass, Pin, DirectionArrow, MapView) never
  mirror in RTL; everything else uses logical CSS.

## 3. Wire behavior

- Sensor components self-connect when their data prop is omitted
  (\`<Compass />\` is live; \`<Compass heading={290} />\` is controlled — the
  prop always wins).
- Navigation = a **history router**: the back gesture pops browser history, so
  \`<Navigator screens initial>\` + \`useNavigator()\` (\`push/pop/popToTop/replace\`)
  is how back works — every \`push\` adds a history entry, the gesture pops it,
  no manual wiring. \`push(name, params)\` carries params; the stack rides
  \`history.state\` (reload restores the screen); \`paths\` mirrors to the URL for
  deep links; \`useBackHandler(fn)\` lets an overlay consume back (return true);
  pop restores focus to the row that pushed. At the root, let the gesture fall
  through to the OS.
- Haptics seam: \`buzz("tap" | "success" | "warning")\` at interaction points
  (no-op today, lights up when the platform ships haptics).
- Prop vocabulary: \`variant\` = visual style · \`status\` = semantic state ·
  \`tone\` = gradient palette. Use these words with these meanings.

## 4. Style

- Components are Tailwind utilities + the \`--gk-*\` design tokens (the shadcn
  model). No inline \`style={{}}\`. Use token utilities (\`text-foreground\`,
  \`text-muted-foreground\`, \`border-border\`, \`bg-primary\`, \`ring-ring\`,
  \`rounded-lens\`) + the \`surface\` / \`btn-primary\` / \`press-scale\`
  recipes; layout is logical utilities only (\`ps/pe\`, \`ms/me\`, \`text-start\`,
  \`size-*\` — never \`pl/pr/ml/mr/text-left\`). Keep the \`focusable\` class
  and the \`t-title/t-readout/t-body/t-caption\` type classes.
- Re-theme by overriding the \`--gk-*\` tokens on \`.glass-viewport\` — one block
  reskins everything, so any DESIGN.md applies (https://glasskit.app/ui/docs/theming).
- The filled accent gradient (\`btn-primary\`) means "pinch me" — only actions
  wear it.

## 5. Verify before declaring done

1. \`npm run dev\` — reach EVERY interactive element with arrows alone;
   Enter activates; Escape backs out without dead-ends.
2. No console errors; no forbidden APIs (getUserMedia, SpeechRecognition).
3. \`npm run build\` — gzipped JS under 500 KB.

## Honesty list (UI that must not overpromise)

The platform has no camera, microphone, gaze, or text-input APIs, so never
let a component imply otherwise. ComposeFlow is a picker for enumerable
answers, not free-form typing or dictation. NowPlaying displays playback your
app tracks. There is no on-device free-form text input. See the "Free-form
text" notes at https://glasskit.app/ui/docs/conventions
`;

export const CLAUDE_MD = `@AGENTS.md
`;

export const CURSOR_RULE = `---
description: GlassKit UI glasses-app rules (Meta Ray-Ban Display)
alwaysApply: true
---

Read AGENTS.md before changing code — it is the platform contract. Key
hard rules: only arrow/Enter input + the back gesture exist (no touch/cursor/
text input/camera/mic/gaze APIs); every interactive element needs the
\`focusable\` class and must be reachable + fired by the D-pad alone (the focus
engine is not optional); multi-screen apps use \`<Navigator>\` so the back
gesture works (it's a history router); one task per view; vendor components
with \`npx @glasskit-ui/cli add\` instead of hand-writing them; no inline style
— theme via the accent ramp tokens. Full procedure:
.claude/skills/glasskit-ui/SKILL.md
`;

export const COPILOT_MD = `Read AGENTS.md before changing code — it is the platform contract for this
Meta Ray-Ban Display app (GlassKit UI). Only arrow/Enter input + the back
gesture exist; no camera/microphone/gaze/text-input APIs — never generate
getUserMedia or SpeechRecognition. Every interactive element needs the
\`focusable\` class and must be reachable by arrow keys alone (the focus engine
is not optional). Multi-screen apps use \`<Navigator>\` so the back gesture
works (it's a history router). Vendor components with
\`npx @glasskit-ui/cli add <name>\` (catalog: https://glasskit.app/ui/llms.txt).
One task per view; no inline styles.
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
