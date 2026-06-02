import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "GlassKit UI — the React layer for Meta Ray-Ban Display",
    template: "%s — GlassKit UI",
  },
  description:
    "The open-source SDK + component registry for Meta Ray-Ban Display apps: a glasses-tuned spatial focus engine, the Neural Band gesture vocabulary, a live in-browser emulator, and an npx registry. The ergonomic React layer Meta does not ship.",
  metadataBase: new URL("https://ui.glasskit.app"),
  openGraph: {
    title: "GlassKit UI — the React layer for Meta Ray-Ban Display",
    description:
      "The open-source SDK + component registry for Meta Ray-Ban Display apps.",
    url: "https://ui.glasskit.app",
    siteName: "GlassKit UI",
    type: "website",
  },
};

export default function WebLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
