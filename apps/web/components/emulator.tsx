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
 * The in-browser glasses emulator. The 600×600 lens runs in an iframe (its own
 * additive stylesheet, isolated from this Liquid-Glass chrome). The control
 * panel dispatches the exact events the SDK listens for — arrow `keydown` for
 * the D-pad, a `neuralband` CustomEvent for a pinch — into the iframe's window,
 * which is precisely how the real Neural Band reaches a Web App.
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
    <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
      <div className="lens-stage">
        <div className="lens-bezel specular">
          <iframe
            ref={frameRef}
            src="/lens"
            title="GlassKit glasses emulator — a live 600×600 demo running the SDK"
            width={600}
            height={600}
            loading="eager"
            className="block rounded-[1.4rem] bg-black"
          />
        </div>
      </div>

      <div className="glass-panel specular flex w-full max-w-xs flex-col gap-5 p-6 text-left">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
            Neural Band
          </p>
          <p className="mt-1 text-sm text-ink-body">
            On-device this is your wristband. Here, drive it by hand.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <span />
          <CtrlButton label="Move focus up" onClick={() => sendKey("ArrowUp")}>
            <ChevronUp className="size-5" />
          </CtrlButton>
          <span />
          <CtrlButton
            label="Move focus left"
            onClick={() => sendKey("ArrowLeft")}
          >
            <ChevronLeft className="size-5" />
          </CtrlButton>
          <CtrlButton label="Select" accent onClick={() => sendKey("Enter")}>
            <SelectDot className="size-4" />
          </CtrlButton>
          <CtrlButton
            label="Move focus right"
            onClick={() => sendKey("ArrowRight")}
          >
            <ChevronRight className="size-5" />
          </CtrlButton>
          <span />
          <CtrlButton
            label="Move focus down"
            onClick={() => sendKey("ArrowDown")}
          >
            <ChevronDown className="size-5" />
          </CtrlButton>
          <span />
        </div>

        <button
          type="button"
          onClick={sendPinch}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-accent-bright transition ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-accent/20 active:scale-[0.98]"
        >
          <GestureIcon className="size-5" /> Pinch
        </button>

        <p className="text-xs text-ink-dim">
          Arrow keys + Enter work too — the wristband just emits those.
        </p>
      </div>
    </div>
  );
}

function CtrlButton({
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
        "flex aspect-square items-center justify-center rounded-xl border transition ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-95",
        accent
          ? "border-accent/50 bg-accent/15 text-accent-bright"
          : "border-white/10 bg-white/[0.04] text-ink hover:bg-white/[0.08]",
      )}
    >
      {children}
    </button>
  );
}
