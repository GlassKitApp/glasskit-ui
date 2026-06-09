import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Hanken_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./docs-theme.css";

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
  title: { default: "GlassKit UI — Docs", template: "%s — GlassKit UI" },
  description:
    "Documentation for GlassKit UI — the React component library for Meta Ray-Ban Display apps.",
  metadataBase: new URL("https://ui.glasskit.app"),
};

export default function DocsRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${hanken.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
