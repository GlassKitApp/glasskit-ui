"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/** CLI / Manual installation tabs (the content is rendered server-side). */
export function InstallTabs({
  cli,
  manual,
}: {
  cli: React.ReactNode;
  manual: React.ReactNode;
}) {
  const [tab, setTab] = useState<"cli" | "manual">("cli");
  const tabs = [
    { id: "cli", label: "CLI" },
    { id: "manual", label: "Manual" },
  ] as const;

  return (
    <div className="mt-4">
      <div className="flex gap-1 border-b border-line-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            aria-pressed={tab === t.id}
            className={cn(
              "mono-label -mb-px border-b-2 px-3 py-2 transition-colors",
              tab === t.id
                ? "border-ink text-ink"
                : "border-transparent text-ink-3 hover:text-ink",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{tab === "cli" ? cli : manual}</div>
    </div>
  );
}
