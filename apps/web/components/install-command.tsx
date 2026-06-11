"use client";

import { useState } from "react";
import { CopyIcon, CheckIcon } from "@/components/icons";
import { useCopyToClipboard } from "@/lib/use-copy-to-clipboard";

const PMS = ["npm", "pnpm", "yarn", "bun"] as const;
type Pm = (typeof PMS)[number];

// `install` = add an npm dependency (the SDK); `exec` = run a package binary
// without installing it (the CLI), pm-aware like shadcn's docs.
const RUNNER: Record<"install" | "exec", Record<Pm, string>> = {
  install: { npm: "npm i", pnpm: "pnpm add", yarn: "yarn add", bun: "bun add" },
  exec: { npm: "npx", pnpm: "pnpm dlx", yarn: "yarn dlx", bun: "bunx" },
};

/**
 * Hard-bordered command block with a package-manager switch + copy.
 * Defaults to installing the SDK; pass `mode="exec"` for a CLI command
 * (e.g. `command="@glasskit/cli add button"` → `npx @glasskit/cli add button`).
 * Always the scoped package — the bare `glasskit` npm name is unrelated.
 */
export function InstallCommand({
  command = "@glasskit/glasses-ui",
  mode = "install",
  className,
}: {
  command?: string;
  mode?: "install" | "exec";
  className?: string;
}) {
  const [pm, setPm] = useState<Pm>("npm");
  const { copied, copy } = useCopyToClipboard();
  const cmd = `${RUNNER[mode][pm]} ${command}`;

  return (
    <div
      className={`w-full max-w-md border border-line-2 bg-bg ${className ?? ""}`}
    >
      <div className="flex border-b border-line-2">
        {PMS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPm(p)}
            aria-pressed={pm === p}
            className={`mono-label flex-1 border-r border-line-2 py-2.5 transition-colors last:border-r-0 ${
              pm === p
                ? "bg-ink text-bg"
                : "text-ink-3 hover:bg-bg-2 hover:text-ink"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <code className="truncate font-mono text-sm text-ink">{cmd}</code>
        <button
          type="button"
          onClick={() => void copy(cmd)}
          aria-label={copied ? "Copied" : "Copy command"}
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
