"use client";

import { useEffect, useRef, useState } from "react";
import { GlassesIcon } from "@/components/icons";

/**
 * "Open on your glasses" — a glasses-icon button that opens a popover with a QR
 * code deep-linking to a full-screen live preview (Expo's "scan to open on your
 * phone", for the lens). The QR SVG is generated server-side and passed in.
 */
export function DevicePreview({ qr, url }: { qr: string; url: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Open on your glasses"
        className="inline-flex items-center gap-1.5 border border-line-2 bg-bg px-2.5 py-1.5 text-ink-2 transition-colors hover:text-ink"
      >
        <GlassesIcon className="size-4" />
        <span className="mono-label">On glasses</span>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="Open on your glasses"
          className="absolute end-0 z-20 mt-2 w-60 border border-line-2 bg-bg p-4 shadow-xl"
        >
          <p className="mono-label">Scan to open</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-2">
            Open the full-screen preview on your Ray-Ban Display — or any
            device.
          </p>
          <div
            className="mt-3 border border-line [&>svg]:block [&>svg]:h-auto [&>svg]:w-full"
            dangerouslySetInnerHTML={{ __html: qr }}
          />
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="mt-3 block truncate font-mono text-[11px] text-ink-3 hover:text-ink"
          >
            {url}
          </a>
        </div>
      ) : null}
    </div>
  );
}
