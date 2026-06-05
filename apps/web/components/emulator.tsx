"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  SelectDot,
  GestureIcon,
} from "@/components/icons";

/**
 * The in-browser glasses emulator, staged as a floating product: the 600×600
 * lens runs in an iframe (its own additive stylesheet, isolated from this clean
 * site chrome) above a slim frosted control bar. The controls dispatch the
 * exact events the SDK listens for — arrow `keydown` for the D-pad, a
 * `neuralband` CustomEvent for a pinch — into the iframe's window, which is how
 * the real Neural Band reaches a Web App.
 */
export function Emulator() {
  const frameRef = useRef<HTMLIFrameElement>(null);

  const sendKey = useCallback((key: string) => {
    frameRef.current?.contentWindow?.dispatchEvent(
      new KeyboardEvent("keydown", { key }),
    );
  }, []);

  const sendPinch = useCallback(() => {
    frameRef.current?.contentWindow?.dispatchEvent(
      new CustomEvent("neuralband", { detail: { gesture: "pinch" } }),
    );
  }, []);

  // Forward the physical keyboard to the lens so arrow keys + Enter "just work"
  // on the page (the wristband emits these same keys on-device).
  useEffect(() => {
    const keys = new Set([
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "Enter",
      " ",
    ]);
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      ) {
        return;
      }
      if (!keys.has(e.key)) return;
      e.preventDefault();
      sendKey(e.key === " " ? "Enter" : e.key);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sendKey]);

  return (
    <div className="flex flex-col items-center gap-7">
      <div className="lens-stage">
        <iframe
          ref={frameRef}
          src="/lens"
          title="GlassKit glasses emulator — a live 600×600 demo running the SDK"
          width={600}
          height={600}
          loading="eager"
          className="product-shadow block size-[600px] rounded-[40px] bg-black"
        />
      </div>

      <div className="ctrl-bar flex items-center gap-1 p-1.5">
        <GhostKey label="Move focus up" onClick={() => sendKey("ArrowUp")}>
          <ChevronUp className="size-5" />
        </GhostKey>
        <GhostKey label="Move focus left" onClick={() => sendKey("ArrowLeft")}>
          <ChevronLeft className="size-5" />
        </GhostKey>
        <GhostKey label="Select" accent onClick={() => sendKey("Enter")}>
          <SelectDot className="size-3.5" />
        </GhostKey>
        <GhostKey
          label="Move focus right"
          onClick={() => sendKey("ArrowRight")}
        >
          <ChevronRight className="size-5" />
        </GhostKey>
        <GhostKey label="Move focus down" onClick={() => sendKey("ArrowDown")}>
          <ChevronDown className="size-5" />
        </GhostKey>
        <span className="mx-1 h-6 w-px bg-line" />
        <button
          type="button"
          onClick={sendPinch}
          className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-[15px] font-medium text-accent-ink transition-colors hover:bg-accent/12"
        >
          <GestureIcon className="size-5" /> Pinch
        </button>
      </div>

      <p className="text-[13px] text-ink-3">
        Arrow keys + Enter drive it too — the wristband just emits those.
      </p>
    </div>
  );
}

function GhostKey({
  label,
  onClick,
  accent,
  children,
}: {
  label: string;
  onClick: () => void;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "flex size-11 items-center justify-center rounded-full transition-colors active:scale-95",
        accent
          ? "text-accent-ink hover:bg-accent/12"
          : "text-ink hover:bg-ink/[0.06]",
      )}
    >
      {children}
    </button>
  );
}
