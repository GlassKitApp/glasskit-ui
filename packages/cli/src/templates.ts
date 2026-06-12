/**
 * The `glasskit init` scaffold — a complete Vite + React + TS web app for the
 * Meta Ray-Ban Display, embedded as strings so the CLI stays zero-dependency
 * and works offline after download. Kept deliberately small: the required
 * 600×600 + mrbd meta tags, GlassViewport + useDpad wired, a Navigator
 * starter flow, and a README covering the deploy → QR → glasses loop.
 *
 * `__NAME__` is replaced with the project name.
 */

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
    "@glasskit-ui/react": "^0.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "~5.7.2",
    "vite": "^6.0.0"
  }
}
`;

const VITE_CONFIG = `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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
import "@glasskit-ui/react/styles.css";
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
      <div className="gk-screen">
        <div className="gk-screen__stage">
          <h2 className="t-title">__NAME__</h2>
          <p className="t-body">Arrow keys move focus · Enter activates</p>
          <button type="button" className="focusable gk-btn gk-btn--primary">
            Get started
          </button>
        </div>
        <div className="gk-screen__cue t-caption">
          Add components: glasskit add list button readout
        </div>
      </div>
    </GlassViewport>
  );
}
`;

const INDEX_CSS = `/* App-level styles. The lens design system ships with
 * @glasskit-ui/react/styles.css (imported in main.tsx) and is scoped under
 * .glass-viewport, so nothing here can break it. */
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

export function scaffoldFiles(
  name: string,
  template: TemplateName = "default",
): Record<string, string> {
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
  if (template === "relay") {
    files["src/App.tsx"] = RELAY_APP_TSX;
    files["src/use-relay-text.ts"] = RELAY_HOOK;
    files["relay/server.mjs"] = RELAY_SERVER;
    files["package.json"] = PACKAGE_JSON.replace(
      '"dev": "vite"',
      '"dev": "vite",\n    "relay": "node relay/server.mjs"',
    );
    files["README.md"] = README.replace(
      "## Add components",
      `## The text relay

No keyboard or mic reaches Display web apps — free-form text comes from
your phone. Run \`npm run relay\` next to \`npm run dev\`; the lens shows a
6-char code, your phone opens the relay URL, enters it, and types. Deploy
\`relay/server.mjs\` anywhere a Node process stays alive and set
\`VITE_RELAY_URL\`. The day Meta ships system dictation, swap
\`useRelayText\` at the same seam.

## Add components`,
    );
  }
  return Object.fromEntries(
    Object.entries(files).map(([path, content]) => [
      path,
      content.replaceAll("__NAME__", name),
    ]),
  );
}

/* ── relay template — free-form text via TV-style phone pairing ─────────
 * No keyboard or mic reaches Display web apps, so free-form text comes
 * from the wearer's phone: the lens shows a 6-char code, the phone opens
 * the relay page, enters the code, and types; the lens polls the value.
 * (See https://glasskit.app/ui/docs/wishlist — system dictation would
 * replace this at the same seam.) */

const RELAY_SERVER = `/**
 * GlassKit text relay — a single-file reference server (Node 18+, no deps).
 *
 *   node relay/server.mjs          # http://localhost:8787
 *
 * Sessions are in-memory with a 10-minute TTL: deploy it anywhere a Node
 * process stays alive (Fly, Railway, a VPS). Serverless platforms recycle
 * memory between invocations — use a KV store there instead.
 */
import { createServer } from "node:http";
import { randomBytes } from "node:crypto";

const PORT = process.env.PORT ?? 8787;
const TTL = 10 * 60_000;
const sessions = new Map(); // code → { value, updatedAt }

setInterval(() => {
  const cutoff = Date.now() - TTL;
  for (const [code, s] of sessions) if (s.updatedAt < cutoff) sessions.delete(code);
}, 60_000).unref();

const newCode = () => {
  // Unambiguous alphabet (no 0/O, 1/I) — readable on a 600×600 lens.
  const abc = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
  let code = "";
  for (const b of randomBytes(6)) code += abc[b % abc.length];
  return code;
};

const json = (res, status, body) => {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(body));
};

const PAGE = \`<!doctype html>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Send text to your glasses</title>
<style>
  body { font: 17px/1.5 system-ui; max-width: 26rem; margin: 12vh auto; padding: 0 1.25rem; background: #0b0e16; color: #fff; }
  input, textarea, button { font: inherit; width: 100%; box-sizing: border-box; border-radius: 12px; border: 1px solid #2a2f37; background: #131a26; color: #fff; padding: 0.7rem 0.9rem; margin-block: 0.4rem; }
  input { text-transform: uppercase; letter-spacing: 0.2em; }
  button { background: linear-gradient(180deg, #5b9dff, #3567e6); border: 0; font-weight: 600; cursor: pointer; }
  .ok { color: #7ee2a8; min-height: 1.5em; }
</style>
<h2>Send text to your glasses</h2>
<p>Enter the code shown on the lens, type, send.</p>
<input id="code" placeholder="CODE" maxlength="6" autocomplete="off" />
<textarea id="text" rows="4" placeholder="Your message…"></textarea>
<button id="send">Send to glasses</button>
<p class="ok" id="status"></p>
<script>
  const $ = (id) => document.getElementById(id);
  $("send").onclick = async () => {
    const code = $("code").value.trim().toUpperCase();
    const value = $("text").value;
    if (!code || !value) return ($("status").textContent = "Code and text required.");
    const res = await fetch("/api/session/" + code, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
    });
    $("status").textContent = res.ok ? "Sent — check the lens ✓" : "Unknown or expired code.";
  };
</script>\`;

createServer((req, res) => {
  const url = new URL(req.url, \`http://\${req.headers.host}\`);
  const m = url.pathname.match(/^\\/api\\/session(?:\\/([A-Z2-9]{6}))?$/);

  if (req.method === "OPTIONS") return json(res, 204, {});
  if (m && req.method === "POST" && !m[1]) {
    const code = newCode();
    sessions.set(code, { value: "", updatedAt: Date.now() });
    return json(res, 201, { code });
  }
  if (m && m[1]) {
    const s = sessions.get(m[1]);
    if (!s) return json(res, 404, { error: "unknown code" });
    if (req.method === "GET") return json(res, 200, s);
    if (req.method === "POST") {
      let body = "";
      req.on("data", (c) => (body += c));
      req.on("end", () => {
        try {
          s.value = String(JSON.parse(body).value ?? "").slice(0, 2000);
          s.updatedAt = Date.now();
          json(res, 204, {});
        } catch {
          json(res, 400, { error: "bad json" });
        }
      });
      return;
    }
  }
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(PAGE);
}).listen(PORT, () => console.log(\`relay on http://localhost:\${PORT}\`));
`;

const RELAY_HOOK = `import { useEffect, useRef, useState } from "react";

const RELAY = import.meta.env.VITE_RELAY_URL ?? "http://localhost:8787";

/**
 * Pair with the relay server and receive phone-typed text. Creates a
 * session on mount (the 6-char code the wearer reads off the lens) and
 * polls for the value while mounted. Swap this hook for the system
 * text-input API the day Meta ships one — the consuming UI won't change.
 */
export function useRelayText(intervalMs = 1500) {
  const [code, setCode] = useState<string | null>(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const seen = useRef(0);

  useEffect(() => {
    let stop = false;
    let timer: ReturnType<typeof setTimeout>;

    (async () => {
      try {
        const res = await fetch(\`\${RELAY}/api/session\`, { method: "POST" });
        const { code } = await res.json();
        if (stop) return;
        setCode(code);
        const poll = async () => {
          try {
            const r = await fetch(\`\${RELAY}/api/session/\${code}\`);
            if (r.ok) {
              const s = await r.json();
              if (s.updatedAt > seen.current && s.value) {
                seen.current = s.updatedAt;
                setValue(s.value);
              }
            }
          } catch {
            /* transient — keep polling */
          }
          if (!stop) timer = setTimeout(poll, intervalMs);
        };
        poll();
      } catch {
        if (!stop) setError(true);
      }
    })();

    return () => {
      stop = true;
      clearTimeout(timer);
    };
  }, [intervalMs]);

  return { code, value, error };
}
`;

const RELAY_APP_TSX = `import { GlassViewport, useDpad } from "@glasskit-ui/react";
import { useRelayText } from "./use-relay-text";

/**
 * Free-form text on a platform with no keyboard or microphone: the lens
 * shows a pairing code, the wearer's phone opens the relay page, enters
 * the code, and types. \`useRelayText\` polls the value in.
 *
 * Run the relay alongside dev: \`npm run relay\` (see relay/server.mjs).
 */
export function App() {
  useDpad();
  const { code, value, error } = useRelayText();

  return (
    <GlassViewport frame>
      <div className="gk-screen">
        <div className="gk-screen__stage">
          <h2 className="t-title">__NAME__</h2>
          {error ? (
            <p className="t-body">Relay unreachable — npm run relay</p>
          ) : (
            <>
              <p className="t-caption">On your phone, open the relay and enter</p>
              <p className="t-readout">{code ?? "······"}</p>
              <div className="gk-textfield" aria-live="polite">
                <span className="gk-textfield__main">
                  <span className="gk-textfield__label t-caption">Message</span>
                  <span className="gk-textfield__value t-body">
                    {value || "Waiting for your phone…"}
                  </span>
                </span>
              </div>
            </>
          )}
        </div>
        <div className="gk-screen__cue t-caption">
          Typed on the phone · appears here
        </div>
      </div>
    </GlassViewport>
  );
}
`;

export const TEMPLATES = ["default", "relay"] as const;
export type TemplateName = (typeof TEMPLATES)[number];
