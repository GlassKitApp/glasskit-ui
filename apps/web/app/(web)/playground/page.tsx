import type { Metadata } from "next";
import Link from "next/link";
import { ProductNav } from "@/components/product-nav";
import { ProductFooter } from "@/components/product-footer";
import {
  PlaygroundClient,
  type DemoDevice,
} from "@/components/playground-client";
import { PLAYGROUND_DEMOS } from "@/lib/playground-demos";
import { qrSvg } from "@/lib/qr";
import { mrbdDeepLink } from "@/lib/meta-deeplink";
import { SITE } from "@/lib/config";

const DESCRIPTION =
  "Live playground for GlassKit UI — pick a component, recolor the accent token, drive the focus ring with the keyboard or Neural Band, and copy the JSX.";

export const metadata: Metadata = {
  title: "Playground",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE}/playground` },
  openGraph: {
    title: "Playground — GlassKit UI",
    description: DESCRIPTION,
    url: `${SITE}/playground`,
  },
};

export default async function Playground() {
  // Per-demo "run on glasses" payload — the QR points at the full-screen
  // /play/<id> glass route (always the public origin; glasses need HTTPS).
  const devices: Record<string, DemoDevice> = Object.fromEntries(
    await Promise.all(
      PLAYGROUND_DEMOS.map(async (d) => {
        const url = `${SITE}/play/${d.id}`;
        const deepLink = mrbdDeepLink(`GlassKit ${d.label}`, url);
        return [d.id, { qr: await qrSvg(deepLink), deepLink, url }];
      }),
    ),
  );

  return (
    <>
      <ProductNav />
      {/* Bleeds up under the transparent nav (-mt-14 = nav height) so the grid
          shows behind it; pt-14 keeps content below the nav. */}
      <main className="blueprint -mt-14 min-h-dvh pt-14">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="text-center">
            <p className="mono-label">Playground</p>
            <h1 className="font-display mt-4 text-[clamp(2.25rem,6vw,4rem)] leading-[0.96]">
              Drive it like the glasses.
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-ink-2">
              Pick a component, recolor the accent token, and copy the JSX. Use
              the <kbd className="font-mono text-sm text-ink">arrow keys</kbd>{" "}
              to move the focus ring and{" "}
              <kbd className="font-mono text-sm text-ink">Enter</kbd> to
              activate &mdash; that&rsquo;s the Neural Band on the glasses.
            </p>
          </div>

          <PlaygroundClient devices={devices} />

          <div className="mt-16 flex justify-center gap-3">
            <Link href="/docs" className="btn btn-solid">
              Get started <span aria-hidden>→</span>
            </Link>
            <Link href="/" className="btn btn-outline">
              Back home
            </Link>
          </div>
        </div>
      </main>
      <ProductFooter />
    </>
  );
}
