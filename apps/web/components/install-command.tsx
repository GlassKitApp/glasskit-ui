"use client";

import { useState } from "react";
import { CopyIcon, CheckIcon } from "@/components/icons";

const PMS = [
  { id: "npm", cmd: "npm i @glasskit/glasses-ui" },
  { id: "pnpm", cmd: "pnpm add @glasskit/glasses-ui" },
  { id: "yarn", cmd: "yarn add @glasskit/glasses-ui" },
  { id: "bun", cmd: "bun add @glasskit/glasses-ui" },
] as const;

/** Hard-bordered install block with a package-manager switch + copy. */
export function InstallCommand({ className }: { className?: string }) {
  const [pm, setPm] = useState<(typeof PMS)[number]["id"]>("npm");
  const [copied, setCopied] = useState(false);
  const cmd = PMS.find((p) => p.id === pm)!.cmd;

  async function copy() {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div
      className={`w-full max-w-md border border-line-2 bg-bg ${className ?? ""}`}
    >
      <div className="flex border-b border-line-2">
        {PMS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPm(p.id)}
            aria-pressed={pm === p.id}
            className={`mono-label flex-1 border-r border-line-2 py-2.5 transition-colors last:border-r-0 ${
              pm === p.id
                ? "bg-ink text-bg"
                : "text-ink-3 hover:bg-bg-2 hover:text-ink"
            }`}
          >
            {p.id}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <code className="truncate font-mono text-sm text-ink">{cmd}</code>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy install command"}
          className="shrink-0 text-ink-3 transition-colors hover:text-ink"
        >
          {copied ? (
            <CheckIcon className="size-4 text-accent-ink" />
          ) : (
            <CopyIcon className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
}
