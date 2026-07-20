import {
  SITE,
  ORIGIN,
  GITHUB,
  GITHUB_ORG,
  DISCORD_URL,
  X_URL,
} from "@/lib/config";

/**
 * Shared SEO copy + schema.org structured-data builders. Structured data is
 * consumed by both Google (rich results) and AI agents (which parse JSON-LD to
 * understand what a page *is*), so it's worth keeping accurate and centralized.
 */
export const SEO = {
  name: "GlassKit UI",
  tagline: "React components for Meta Ray-Ban Display web apps",
  description:
    "The open-source React component library for Meta Ray-Ban Display apps: a glasses-tuned focus engine, the Neural Band gesture vocabulary, and premium HUD components for the 600×600 lens. The building blocks Meta does not ship.",
  shortDescription:
    "Open-source React component library for Meta Ray-Ban Display apps.",
  author: "Jeries Nasrawi",
  twitterHandle: "@JarJarMadeIt",
  keywords: [
    "Meta Ray-Ban Display",
    "smart glasses",
    "React component library",
    "HUD components",
    "glasses app development",
    "Neural Band",
    "wearable UI",
    "spatial UI",
    "heads-up display",
    "open source",
    "GlassKit",
  ],
} as const;

/** Wrap one or more schema.org nodes in a single linked-data graph. */
export function jsonLdGraph(...nodes: Record<string, unknown>[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE}#organization`,
    name: "GlassKit",
    url: ORIGIN,
    logo: `${SITE}/avatar.png`,
    sameAs: [GITHUB_ORG, X_URL, DISCORD_URL],
  };
}

export function webSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE}#website`,
    url: SITE,
    name: SEO.name,
    description: SEO.description,
    inLanguage: "en",
    publisher: { "@id": `${SITE}#organization` },
  };
}

export function softwareSchema() {
  return {
    "@type": "SoftwareApplication",
    "@id": `${SITE}#software`,
    name: SEO.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description: SEO.description,
    url: SITE,
    softwareRequirements: "React 19",
    isAccessibleForFree: true,
    license: "https://opensource.org/license/mit",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    author: { "@type": "Person", name: SEO.author, url: X_URL },
    codeRepository: GITHUB,
    installUrl: "https://www.npmjs.com/package/@glasskit-ui/react",
    sameAs: [GITHUB, "https://www.npmjs.com/package/@glasskit-ui/react"],
  };
}

/**
 * A docs page as a TechArticle — docs are what AI answer engines cite, and
 * without this node they carry only a breadcrumb. dateModified comes from
 * git (fumadocs lastModified plugin), absent on files with no history yet.
 */
export function techArticleSchema(page: {
  title: string;
  description?: string;
  url: string;
  lastModified?: Date | string | number;
}) {
  return {
    "@type": "TechArticle",
    "@id": `${page.url}#article`,
    headline: page.title,
    ...(page.description ? { description: page.description } : {}),
    url: page.url,
    mainEntityOfPage: page.url,
    inLanguage: "en",
    author: { "@type": "Person", name: SEO.author, url: X_URL },
    publisher: { "@id": `${SITE}#organization` },
    ...(page.lastModified
      ? { dateModified: new Date(page.lastModified).toISOString() }
      : {}),
  };
}

/** BreadcrumbList from an ordered list of {name, url} crumbs. */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
