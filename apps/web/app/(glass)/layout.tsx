import type { Metadata, Viewport } from "next";
import "../globals.css";

/**
 * Root layout for the glass-app routes (/preview/*) — the chrome-free surfaces
 * a Ray-Ban Display opens via the "add to your glasses" QR. Deliberately
 * minimal: no nav/footer, no grain overlay, no theme-init script (the lens is
 * always dark) — only the stylesheet the 600×600 surface needs.
 */
export const metadata: Metadata = {
  title: "GlassKit live preview",
  // Chrome-free duplicates of docs content — keep them out of search.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function GlassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black">{children}</body>
    </html>
  );
}
