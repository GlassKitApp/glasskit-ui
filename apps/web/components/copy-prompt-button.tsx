"use client";

import { CopyIcon, CheckIcon } from "@/components/icons";
import { useCopyToClipboard } from "@/lib/use-copy-to-clipboard";

/**
 * Landing-page secondary CTA — copies the complete "Add GlassKit UI" agent
 * recipe (a self-contained, procedural setup playbook) so a vibe coder can paste
 * it straight into ChatGPT/Claude and have it scaffold correctly. The recipe is
 * built server-side (`setupRecipe()`) and passed in. Matches `.btn btn-outline`.
 */
export function CopyPromptButton({ recipe }: { recipe: string }) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <button
      type="button"
      onClick={() => void copy(recipe)}
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
