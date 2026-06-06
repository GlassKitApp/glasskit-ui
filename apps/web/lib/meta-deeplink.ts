/**
 * Build the Meta Ray-Ban Display "add Web App" deep link. Scanning a QR of this
 * string with a *phone* opens the Meta AI app and adds the web app to the
 * glasses (Developer Mode required; the app must be served over HTTPS from a
 * public URL).
 *
 * Format per Meta's official toolkit (facebookincubator/meta-wearables-webapp):
 *   fb-viewapp://web_app_deep_link?appName=<name>&appUrl=<url-encoded-https-url>
 *
 * Verified against wearables.developer.meta.com/docs/develop/webapps (2026-06).
 */
export function mrbdDeepLink(appName: string, appUrl: string): string {
  const name = encodeURIComponent(appName);
  const url = encodeURIComponent(appUrl);
  return `fb-viewapp://web_app_deep_link?appName=${name}&appUrl=${url}`;
}
