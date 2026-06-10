import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

/**
 * robots for the /ui zone (served at glasskit.app/ui/robots.txt). Crawlers read
 * the umbrella's root robots.txt as authoritative; this is supplementary and
 * points at the zone's sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
