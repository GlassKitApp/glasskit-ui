import type { Metadata } from "next";
import "../lens.css";

/**
 * Root layout for the EMULATOR LENS — this document is what the homepage
 * iframe loads. It is a separate root layout (its own <html>/<body>) so the
 * additive `lens.css` never leaks into the Liquid-Glass site chrome. Not
 * indexed: it's a sub-surface of the real pages, not a destination.
 */
export const metadata: Metadata = {
  title: "GlassKit emulator — lens",
  robots: { index: false, follow: false },
};

export default function LensLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {/* The SDK seeds focus on mount (and on every D-pad move). Inside an
         * iframe, a default focus() scrolls the PARENT page to bring the iframe
         * into view — which would yank the homepage down past the hero. Default
         * focus() to preventScroll here (harmless inside a 600×600 lens that
         * never scrolls), so the host page stays put. Runs before hydration. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var f=HTMLElement.prototype.focus;HTMLElement.prototype.focus=function(o){return f.call(this,o||{preventScroll:true});};})();",
          }}
        />
        {children}
      </body>
    </html>
  );
}
