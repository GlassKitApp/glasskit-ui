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
      <body>{children}</body>
    </html>
  );
}
