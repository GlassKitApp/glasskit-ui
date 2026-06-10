/**
 * Renders a schema.org JSON-LD `<script>`. Server component — emitted into the
 * static HTML so crawlers and AI agents read it without running JS. Pass a graph
 * built with the helpers in `lib/seo.ts`.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Structured data, not user input — the object is built from our own
      // constants in lib/seo.ts.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
