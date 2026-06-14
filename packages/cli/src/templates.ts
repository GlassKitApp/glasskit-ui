/**
 * The `glasskit init` scaffold — a complete Vite + React + TS web app for the
 * Meta Ray-Ban Display, embedded as strings so the CLI stays zero-dependency
 * and works offline after download. Kept deliberately small: the required
 * 600×600 + mrbd meta tags, GlassViewport + useDpad wired, a Navigator
 * starter flow, and a README covering the deploy → QR → glasses loop.
 *
 * `__NAME__` is replaced with the project name.
 */

import { agentFiles } from "./agents";

const PACKAGE_JSON = `{
  "name": "__NAME__",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@glasskit-ui/react": "^0.4.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.4",
    "tailwindcss": "^4.0.0",
    "typescript": "~5.7.2",
    "vite": "^6.0.0"
  }
}
`;

const VITE_CONFIG = `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
`;

const TSCONFIG = `{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "useDefineForClassFields": true
  },
  "include": ["src"]
}
`;

const INDEX_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- Meta's required Display web-app viewport: the glasses webview is a
         fixed 600×600 — not device-width. -->
    <meta
      name="viewport"
      content="width=600, height=600, initial-scale=1.0, user-scalable=no"
    />
    <!-- Identifies the page as Display-compatible to the glasses runtime. -->
    <meta name="mrbd-web-app-capable" content="yes" />
    <meta name="description" content="A Meta Ray-Ban Display web app." />
    <title>__NAME__</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

const MAIN_TSX = `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
`;

const APP_TSX = `import { GlassViewport, useDpad } from "@glasskit-ui/react";

/**
 * Your glasses app. The D-pad hook is wired once here: on the Display,
 * Neural Band swipes arrive as arrow keys and a pinch as Enter — in a
 * desktop browser, just use your keyboard. The system back gesture pops
 * browser history (popstate), so push an entry per screen if you add
 * navigation (or vendor the Navigator component: glasskit add navigator).
 */
export function App() {
  useDpad();
  return (
    <GlassViewport frame>
      <div className="flex h-full flex-col gap-[14px] p-[22px]">
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-5 text-center">
          <h2 className="t-title text-foreground">__NAME__</h2>
          <p className="t-body text-muted-foreground">
            Arrow keys move focus · Enter activates
          </p>
          <button
            type="button"
            className="focusable press-scale btn-primary t-body inline-flex items-center justify-center rounded-2xl px-6 py-4"
          >
            Get started
          </button>
        </div>
        <div className="t-caption flex flex-none justify-center text-foreground-faint">
          Add components: glasskit add list button readout
        </div>
      </div>
    </GlassViewport>
  );
}
`;

const INDEX_CSS = `@import "tailwindcss";
/* The lens design system: theme.css maps Tailwind utilities to the --gk-*
 * design tokens; styles.css defines the scoped token values + primitives.
 * Both are scoped under .glass-viewport, so nothing here can break the site.
 * Re-theme by overriding --gk-* on .glass-viewport (see the Theming docs). */
@import "@glasskit-ui/react/theme.css";
@import "@glasskit-ui/react/styles.css";

body {
  margin: 0;
  background: #000;
  display: grid;
  place-items: center;
  min-height: 100dvh;
}
`;

const GITIGNORE = `node_modules
dist
*.local
`;

const README = `# __NAME__

A [Meta Ray-Ban Display](https://wearables.developer.meta.com/docs/develop/webapps)
web app built with [GlassKit UI](https://glasskit.app/ui).

## Develop

\`\`\`sh
npm install
npm run dev
\`\`\`

Open the printed URL: arrow keys move focus, Enter activates (that's the
Neural Band), Escape goes back. Use Chrome DevTools' Sensors panel to
simulate orientation and location.

## Add components

\`\`\`sh
npx @glasskit-ui/cli add list button readout compass
\`\`\`

Components vendor into \`components/glasskit/\` — you own the source.

## Run it on your glasses

1. \`npm run build\`, then deploy \`dist/\` to any **HTTPS** host
   (Vercel, Netlify, Cloudflare Pages, GitHub Pages).
2. In the Meta AI app (Developer Mode on): App Settings → App Connections →
   Web Apps → Add a Web App → paste your URL.
3. The app appears in the glasses app grid. Middle-pinch goes back; swipe to
   move focus; pinch to select.
`;

export function scaffoldFiles(name: string): Record<string, string> {
  const files: Record<string, string> = {
    "package.json": PACKAGE_JSON,
    "vite.config.ts": VITE_CONFIG,
    "tsconfig.json": TSCONFIG,
    "index.html": INDEX_HTML,
    ".gitignore": GITIGNORE,
    "README.md": README,
    "src/main.tsx": MAIN_TSX,
    "src/App.tsx": APP_TSX,
    "src/index.css": INDEX_CSS,
  };
  // Every scaffold ships its agent skill: AGENTS.md (cross-agent contract),
  // CLAUDE.md pointer, the Claude Code skill, Cursor rule, and Copilot
  // instructions — a vibe-coded app starts with its agent already briefed.
  Object.assign(files, agentFiles());

  return Object.fromEntries(
    Object.entries(files).map(([path, content]) => [
      path,
      content.replaceAll("__NAME__", name),
    ]),
  );
}
