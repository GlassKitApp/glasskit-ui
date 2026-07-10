import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import { trackAICrawlerRequest } from "@datafast/ai-crawl";
import { clerkMiddleware } from "@clerk/nextjs/server";

/**
 * Proxy (Next.js 16 middleware) for the /ui zone: Clerk auth context + DataFast
 * AI-crawler tracking.
 *
 * Clerk: the zone shares glasskit.app's production Clerk instance so the nav's
 * profile/sign-in reflects the same session. The whole zone is public (no
 * protected routes), so we never call auth.protect(); clerkMiddleware just
 * establishes the auth context.
 *
 * DataFast: the browser script can't see server-rendered hits from AI crawlers
 * (GPTBot, ClaudeBot, …); this reports them to the same glasskit.app property.
 * Per DataFast's docs: call it, don't await it (it uses event.waitUntil).
 */
export default clerkMiddleware(
  (_auth, request: NextRequest, event: NextFetchEvent) => {
    trackAICrawlerRequest(request, event, {
      websiteId: "dfid_E92UlmE44RbHThkiHoKWy",
    });
    return NextResponse.next();
  },
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
