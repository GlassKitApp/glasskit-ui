"use client";

import { useEffect, useRef, useState } from "react";
import { IconBrandMeta } from "@tabler/icons-react";
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
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
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
        aria-label="Add to your glasses"
        className="device-badge"
      >
        <IconBrandMeta className="size-5" />
      </button>

      {open ? (
        <div role="dialog" aria-label="Add to your glasses" className="device-popover">
          <div className="device-popover__grid">
            <div className="device-popover__scan">
              <p className="device-popover__label">Scan to install</p>
              <div
                className="device-popover__qr"
                dangerouslySetInnerHTML={{ __html: qr }}
              />
            </div>
            <div>
              <p className="device-popover__label">Direct link</p>
              <p className="device-popover__desc">
                Scan the QR with your phone, or open this link on a device with
                the Meta AI companion installed. It opens{" "}
                {appName ?? "this preview"} ready to add to your glasses.
              </p>
              <div className="device-popover__linkrow">
                <code className="device-popover__link">{deepLink}</code>
                <button
                  type="button"
                  onClick={() => void copy(deepLink)}
                  className="device-popover__copy"
                >
                  {copied ? "Copied ✓" : "Copy link"}
                </button>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="device-popover__open"
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
