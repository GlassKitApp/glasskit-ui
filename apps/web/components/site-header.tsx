import Link from "next/link";
import { GITHUB, BASE_PATH } from "@/lib/config";

/** Shared segmented, hard-bordered header — the brand lockup matches the
 *  sibling glasskit repo (avatar mark + GlassKit wordmark).
 *
 *  In-zone links use `next/link` (basePath-prefixed + soft nav); the external
 *  GitHub link stays a plain `<a>`. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line-2 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1320px] items-stretch">
        <Link
          href="/"
          className="flex items-center gap-2.5 border-r border-line-2 pl-6 pr-6 transition-colors hover:bg-bg-2 lg:pl-10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BASE_PATH}/avatar.png`}
            alt=""
            className="size-6 rounded-[5px]"
          />
          <span className="font-display text-[15px] font-bold tracking-tight">
            GlassKit <span className="font-medium text-ink-3">UI</span>
          </span>
        </Link>
        <nav className="hidden items-stretch md:flex">
          <Link
            href="/docs"
            className="mono-label flex items-center border-r border-line-2 px-5 transition-colors hover:bg-bg-2 hover:text-ink"
          >
            Docs
          </Link>
          <Link
            href="/playground"
            className="mono-label flex items-center border-r border-line-2 px-5 transition-colors hover:bg-bg-2 hover:text-ink"
          >
            Playground
          </Link>
          <a
            href={GITHUB}
            className="mono-label flex items-center border-r border-line-2 px-5 transition-colors hover:bg-bg-2 hover:text-ink"
          >
            GitHub
          </a>
        </nav>
        <Link
          href="/docs"
          className="mono-label ml-auto flex items-center border-l border-line-2 bg-ink px-6 text-bg transition-colors hover:bg-black lg:pr-10"
        >
          Get started
        </Link>
      </div>
    </header>
  );
}
