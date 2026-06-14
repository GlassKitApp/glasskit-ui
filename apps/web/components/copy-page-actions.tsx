"use client";

import { useEffect, useRef, useState } from "react";
import { CopyIcon, CheckIcon } from "@/components/icons";
import { useCopyToClipboard } from "@/lib/use-copy-to-clipboard";
import { SITE } from "@/lib/config";

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

/**
 * "Copy for LLM" dropdown — the Clerk/shadcn affordance that lets a vibe coder
 * hand any docs page to an AI in one click. "Copy prompt" copies a complete,
 * self-contained agent recipe (install + usage + the hard platform rules);
 * "Open in ChatGPT / Claude" launches the chat with a compact pointer prompt
 * (the full recipe is too long for a URL, so the model fetches the page +
 * llms.txt).
 *
 * Built on a real `<details>`/`<summary>` so it is keyboard-accessible and works
 * without JS; the effect below just closes it on outside-click / Escape.
 */
export function CopyPageActions({
  recipe,
  pageUrl,
  title,
}: {
  /** The full, self-contained agent recipe copied by "Copy prompt". */
  recipe: string;
  pageUrl: string;
  title: string;
}) {
  const { copied, copy } = useCopyToClipboard();
  const ref = useRef<HTMLDetailsElement>(null);

  // A compact prompt for the URL-launched chats (recipes are too long for ?q=).
  const chatPrompt = `I'm building a Meta Ray-Ban Display (smart-glasses) app with GlassKit UI. Read ${pageUrl} and the reference at ${SITE}/llms.txt, then help me use ${title}. Hard rules: D-pad + Enter + middle-pinch back only (no mouse/touch/keyboard/camera/mic); keep the "focusable" class on every interactive element; navigate with <Navigator> (history-based); wrap the app in <GlassViewport>.`;
  const encoded = encodeURIComponent(chatPrompt);
  const chatgptUrl = `https://chatgpt.com/?hints=search&q=${encoded}`;
  const claudeUrl = `https://claude.ai/new?q=${encoded}`;

  const close = () => ref.current?.removeAttribute("open");

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (ref.current?.open && !ref.current.contains(e.target as Node)) close();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && ref.current?.open) {
        close();
        ref.current
          ?.querySelector<HTMLElement>("summary")
          ?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const item =
    "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-start text-[13px] text-ink-2 transition-colors hover:bg-bg-2 hover:text-ink";

  return (
    <details ref={ref} className="group relative inline-block [&_summary]:list-none">
      <summary className="inline-flex cursor-pointer select-none items-center gap-1.5 rounded-full border border-line-2 bg-bg-2 px-3 py-1.5 text-[13px] font-medium text-ink-2 transition-colors hover:bg-bg hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        {copied ? (
          <CheckIcon className="size-3.5 text-accent-ink" />
        ) : (
          <CopyIcon className="size-3.5" />
        )}
        {copied ? "Copied" : "Copy for LLM"}
        <ChevronIcon className="size-3.5 text-ink-3 transition-transform group-open:rotate-180" />
      </summary>

      <div
        role="menu"
        className="absolute end-0 z-50 mt-2 w-60 rounded-xl border border-line-2 bg-bg p-1.5 shadow-xl shadow-black/20"
      >
        <button
          type="button"
          role="menuitem"
          onClick={() => {
            void copy(recipe);
            close();
          }}
          className={item}
        >
          <CopyIcon className="size-4 shrink-0 text-ink-3" />
          Copy prompt
        </button>

        <div className="my-1 border-t border-line" />

        <a
          role="menuitem"
          href={chatgptUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          className={item}
        >
          <ExternalIcon className="size-4 shrink-0 text-ink-3" />
          Open in ChatGPT
        </a>
        <a
          role="menuitem"
          href={claudeUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          className={item}
        >
          <ExternalIcon className="size-4 shrink-0 text-ink-3" />
          Open in Claude
        </a>
      </div>
    </details>
  );
}
