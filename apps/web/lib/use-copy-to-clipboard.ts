import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Copy text to the clipboard and flag `copied` for a moment. Shared by the
 * install block and the playground code panel so the copy/reset behavior
 * lives in one place. The reset timer is cleared on re-copy and on unmount.
 */
export function useCopyToClipboard(resetMs = 1400) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = useCallback(
    async (text: string) => {
      const flag = () => {
        setCopied(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), resetMs);
      };
      // Async Clipboard API first (needs a secure context + focus).
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          flag();
          return;
        }
      } catch {
        /* fall through to the legacy path */
      }
      // Legacy fallback: works without the Clipboard API (older/locked-down
      // webviews) so copy still succeeds and the user still gets feedback.
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        if (ok) flag();
      } catch {
        /* clipboard genuinely unavailable */
      }
    },
    [resetMs],
  );

  return { copied, copy };
}
