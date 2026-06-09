import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Hanken_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import Script from "next/script";
import "../globals.css";

// No-flash theme init — runs before paint, outside React's tree. Reads the
// SAME `theme` localStorage key the parent glasskit app uses (shared across the
// glasskit.app ↔ /ui zones, same origin) and applies `.dark` accordingly.
// Default is light; only adds `dark` when the user chose it.
const THEME_INIT =
  "try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}";

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
  metadataBase: new URL("https://glasskit.app/ui"),
  openGraph: {
    title: "GlassKit UI — building blocks for Meta Ray-Ban Display",
    description:
      "The open-source React component library for Meta Ray-Ban Display apps.",
    url: "https://glasskit.app/ui",
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
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT}
        </Script>
        {children}
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
