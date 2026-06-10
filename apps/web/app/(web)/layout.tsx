import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Hanken_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import Script from "next/script";
import { SITE } from "@/lib/config";
import { SEO } from "@/lib/seo";
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

const TITLE = `${SEO.name} — ${SEO.tagline}`;

export const metadata: Metadata = {
  title: { default: TITLE, template: `%s — ${SEO.name}` },
  description: SEO.description,
  // metadataBase MUST include the /ui basePath: Next composes file-based image
  // routes (opengraph-image) from metadataBase + the *bare* route path (no
  // basePath), so an origin-only base would drop /ui from og:image. With SITE,
  // Next resolves the image path relative to the end of the base → correct
  // /ui/opengraph-image. Canonical + OG URLs are absolute SITE strings, so the
  // base is moot for them.
  metadataBase: new URL(SITE),
  applicationName: SEO.name,
  authors: [{ name: SEO.author, url: "https://x.com/JarJarMadeIt" }],
  creator: SEO.author,
  publisher: "GlassKit",
  keywords: [...SEO.keywords],
  category: "technology",
  alternates: { canonical: SITE },
  openGraph: {
    type: "website",
    siteName: SEO.name,
    title: TITLE,
    description: SEO.description,
    url: SITE,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SEO.shortDescription,
    creator: SEO.twitterHandle,
    site: SEO.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
