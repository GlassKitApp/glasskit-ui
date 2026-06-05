import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Hanken_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import "../globals.css";

// The GlassKit brand type system: Bricolage Grotesque (display), Hanken
// Grotesk (body), JetBrains Mono (instrument-grade technical labels).
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GlassKit UI — building blocks for Meta Ray-Ban Display",
    template: "%s — GlassKit UI",
  },
  description:
    "The open-source React component library for Meta Ray-Ban Display apps: a glasses-tuned focus engine, the Neural Band gesture vocabulary, and additive components. The building blocks Meta does not ship.",
  metadataBase: new URL("https://ui.glasskit.app"),
  openGraph: {
    title: "GlassKit UI — building blocks for Meta Ray-Ban Display",
    description:
      "The open-source React component library for Meta Ray-Ban Display apps.",
    url: "https://ui.glasskit.app",
    siteName: "GlassKit UI",
    type: "website",
  },
};

export default function WebLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${hanken.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
