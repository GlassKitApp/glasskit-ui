import Script from "next/script";

/**
 * DataFast analytics for the /ui zone. glasskit-ui is served as the `/ui` zone
 * of glasskit.app (its own deployment with `basePath: "/ui"`), so the parent's
 * scripts never reach these pages — this loads DataFast directly here. Same
 * website-id / domain as the parent glasskit app, so /ui traffic rolls up into
 * the single glasskit.app property. Rendered in the (web) + (docs) root layouts
 * (each owns its own <html>); deliberately NOT in (glass), the on-device lens.
 */
export function DataFast() {
  return (
    <Script
      src="https://datafa.st/js/script.js"
      data-website-id="dfid_E92UlmE44RbHThkiHoKWy"
      data-domain="glasskit.app"
      strategy="afterInteractive"
    />
  );
}
