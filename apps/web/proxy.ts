import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import { trackAICrawlerRequest } from "@datafast/ai-crawl";

/**
 * DataFast AI-crawler / bot-traffic tracking for the /ui zone.
 *
 * The browser analytics script can't see server-rendered hits from AI
 * crawlers (GPTBot, ClaudeBot, PerplexityBot, …). This server-side proxy
 * reports those to the same DataFast property as the client script
 * (`dfid_E92UlmE44RbHThkiHoKWy`), so /ui crawler traffic rolls up into the
 * single glasskit.app property. Per DataFast's docs: call it, don't await
 * it (it uses `event.waitUntil`), then return the response.
 *
 * NOTE (Next.js 16): middleware is named `proxy.ts`.
 */
export function proxy(request: NextRequest, event: NextFetchEvent) {
  trackAICrawlerRequest(request, event, {
    websiteId: "dfid_E92UlmE44RbHThkiHoKWy",
  });

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
