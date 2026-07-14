import { defineDocs, defineConfig } from "fumadocs-mdx/config";
import lastModified from "fumadocs-mdx/plugins/last-modified";

export const docs = defineDocs({
  dir: "content/docs",
});

export default defineConfig({
  // Real per-file modification dates (from git history) so the sitemap and
  // the docs TechArticle dateModified reflect content changes, not build
  // time. NOTE: on Vercel this needs VERCEL_DEEP_CLONE=true to see history.
  plugins: [lastModified()],
});
