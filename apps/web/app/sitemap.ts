import type { MetadataRoute } from "next";
import { source } from "@/lib/source";
import { SITE } from "@/lib/config";

/**
 * Sitemap for the /ui zone, served at glasskit.app/ui/sitemap.xml. Lists the
 * marketing routes + every docs page. Absolute SITE-based URLs so they resolve
 * under the basePath regardless of how Next composes metadataBase.
 *
 * Cross-zone: the umbrella's root robots.txt should also reference this sitemap
 * (Sitemap: https://glasskit.app/ui/sitemap.xml) so crawlers discover it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const marketing: MetadataRoute.Sitemap = [
    { url: SITE, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/playground`, changeFrequency: "monthly", priority: 0.8 },
  ];

  const docs: MetadataRoute.Sitemap = source.getPages().map((page) => ({
    url: `${SITE}${page.url}`,
    // Real content date (git, via the fumadocs lastModified plugin); absent
    // for files without history rather than a misleading build-time "now".
    ...(page.data.lastModified
      ? { lastModified: page.data.lastModified }
      : {}),
    changeFrequency: "weekly",
    priority: page.url === "/docs" ? 0.9 : 0.7,
  }));

  return [...marketing, ...docs];
}
