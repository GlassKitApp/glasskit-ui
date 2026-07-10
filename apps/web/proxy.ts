import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import { trackAICrawlerRequest } from "@datafast/ai-crawl";

/**
 * DataFast AI-crawler / bot-traffic tracking for the /ui zone.
 *
 * Auth is deliberately CLIENT-ONLY: ClerkProvider + the nav's Clerk
 * components (SignInButton / UserButton / useAuth) run on the publishable key
 * and the shared same-origin session, which ClerkJS refreshes itself. The
 * zone has no protected routes and never calls auth() server-side, so it
 * needs no clerkMiddleware — which keeps CLERK_SECRET_KEY out of this
 * separately-deployed zone and removes the "missing secret 500s every route"
 * failure class.
 *
 * The browser analytics script can't see server-rendered hits from AI
 * crawlers (GPTBot, ClaudeBot, …); this reports them to the same glasskit.app
 * property. Per DataFast's docs: call it, don't await it (event.waitUntil).
 * NOTE (Next.js 16): middleware is named proxy.ts.
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
