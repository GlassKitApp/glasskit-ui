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
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), resetMs);
      } catch {
        /* clipboard unavailable */
      }
    },
    [resetMs],
  );

  return { copied, copy };
}
