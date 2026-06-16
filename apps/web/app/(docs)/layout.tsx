import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Hanken_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Analytics } from "@vercel/analytics/next";
import { SITE } from "@/lib/config";
import { SEO } from "@/lib/seo";
import { DataFast } from "@/components/analytics/datafast";
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
  title: { default: `${SEO.name} — Docs`, template: `%s — ${SEO.name}` },
  description:
    "Documentation for GlassKit UI — the React component library for Meta Ray-Ban Display apps.",
  // metadataBase includes /ui so og:image resolves correctly — see the note in
  // app/(web)/layout.tsx.
  metadataBase: new URL(SITE),
  alternates: { canonical: `${SITE}/docs` },
  keywords: [...SEO.keywords],
  openGraph: {
    type: "website",
    siteName: SEO.name,
    title: `${SEO.name} — Docs`,
    description:
      "Documentation for GlassKit UI — the React component library for Meta Ray-Ban Display apps.",
    url: `${SITE}/docs`,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
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
    },
  },
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
        <Analytics />
        <DataFast />
      </body>
    </html>
  );
}
