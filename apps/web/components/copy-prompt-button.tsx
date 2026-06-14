"use client";

import { CopyIcon, CheckIcon } from "@/components/icons";
import { useCopyToClipboard } from "@/lib/use-copy-to-clipboard";
import { SITE } from "@/lib/config";

/**
 * Landing-page secondary CTA — copies a ready "build with GlassKit UI" prompt
 * (pointing the AI at the generated `llms.txt` reference) so a vibe coder can
 * paste it straight into ChatGPT/Claude. Matches the hero's `.btn btn-outline`.
 */
export function CopyPromptButton() {
  const { copied, copy } = useCopyToClipboard();
  const prompt = `I'm building a Meta Ray-Ban Display app with GlassKit UI. Read the reference at ${SITE}/llms.txt, then help me scaffold my app and use its components.`;

  return (
    <button
      type="button"
      onClick={() => void copy(prompt)}
      className="btn btn-outline"
      aria-label={copied ? "Prompt copied" : "Copy AI prompt"}
    >
      {copied ? (
        <CheckIcon className="size-4 text-accent-ink" />
      ) : (
        <CopyIcon className="size-4" />
      )}
      {copied ? "Copied" : "Copy AI prompt"}
    </button>
  );
}
