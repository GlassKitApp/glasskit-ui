"use client";

import { useEffect, useRef, useState } from "react";
import { IconBrandMeta, IconCopy, IconCheck } from "@tabler/icons-react";
import { useCopyToClipboard } from "@/lib/use-copy-to-clipboard";

/**
 * The Meta-logo badge on a demo tile. Click it to open an "add to your glasses"
 * popover: a QR to scan with a phone + the raw `fb-viewapp://` deep link to copy
 * or open on a device with the Meta AI companion installed.
 */
export function DevicePreview({
  qr,
  deepLink,
  url,
  appName,
}: {
  /** Inline QR SVG (encodes the deep link), generated server-side. */
  qr: string;
  /** The fb-viewapp:// deep link string. */
  deepLink: string;
  /** A plain https preview URL ("open install link"). */
  url: string;
  appName?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { copied, copy } = useCopyToClipboard();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-center gap-2.5 bg-[linear-gradient(135deg,#0099ff_0%,#0064e0_100%)] px-3 py-3 font-mono text-[11px] tracking-[0.14em] text-white uppercase transition-[filter] hover:brightness-110"
      >
        <IconBrandMeta className="size-[18px]" />
        Run on glasses
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="Add to your glasses"
          className="absolute end-0 bottom-full z-40 mb-2.5 w-[460px] max-w-[84vw] rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,#14171f_0%,#0c0f15_100%)] p-[22px] text-start text-[#e9ebf0] shadow-[0_30px_70px_-24px_rgba(0,0,0,0.85)]"
        >
          {/* auto QR column + a min-w-0 link column so the long deep link can
              truncate instead of forcing the popover wider (minmax(0,1fr)). */}
          <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-[22px] max-[560px]:grid-cols-1">
            <div>
              <p className="font-mono text-[11px] font-medium tracking-[0.16em] text-[#868c98] uppercase">
                Scan to install
              </p>
              <div
                className="mt-2.5 w-[134px] rounded-xl bg-white p-[9px] [&_svg]:block [&_svg]:h-auto [&_svg]:w-full"
                dangerouslySetInnerHTML={{ __html: qr }}
              />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[11px] font-medium tracking-[0.16em] text-[#868c98] uppercase">
                Direct link
              </p>
              <p className="mt-[9px] text-[13.5px] leading-[1.5] text-[#b6bcc8]">
                Scan the QR with your phone, or open this link on a device with
                the Meta AI companion installed. It opens{" "}
                {appName ?? "this preview"} ready to add to your glasses.
              </p>
              <div className="mt-3.5 flex items-center gap-1.5 rounded-[10px] border border-white/10 bg-white/5 py-1 pe-1 ps-3">
                <code className="min-w-0 flex-1 truncate font-mono text-[11.5px] leading-[1.45] text-[#c9ced8]">
                  {deepLink}
                </code>
                <button
                  type="button"
                  onClick={() => void copy(deepLink)}
                  aria-label={copied ? "Copied" : "Copy link"}
                  title={copied ? "Copied" : "Copy link"}
                  className={`inline-flex size-[30px] flex-none items-center justify-center rounded-[7px] border transition-colors ${
                    copied
                      ? "border-[#7ee2a8]/40 text-[#7ee2a8]"
                      : "border-white/10 bg-white/[0.06] text-[#c9ced8] hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {copied ? (
                    <IconCheck className="size-4" />
                  ) : (
                    <IconCopy className="size-4" />
                  )}
                </button>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="mt-3.5 inline-block text-[13px] font-medium text-[#9fb6e8] no-underline hover:text-white"
              >
                Open install link ↗
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
