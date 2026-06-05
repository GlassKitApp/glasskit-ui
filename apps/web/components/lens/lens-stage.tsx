import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Site-chrome frame that holds a 600×600 lens preview: a dark device-like
 * mat (so the additive black surface reads as a screen) inside the
 * blueprint's hard 1px border. The mat is website chrome — the additive
 * rules stop at the bezel. `device` adds a toolbar affordance (e.g. the
 * "open on your glasses" QR button) beside the caption.
 */
export function LensStage({
  children,
  caption,
  device,
}: {
  children: ReactNode;
  caption?: ReactNode;
  device?: ReactNode;
}) {
  return (
    <figure className="flex flex-col items-center gap-4">
      <div className="max-w-full overflow-x-auto border border-line-2 bg-[#050507] p-5">
        {children}
      </div>
      {caption || device ? (
        <figcaption
          className={cn(
            "flex w-full items-center gap-3",
            device ? "justify-between" : "justify-center",
          )}
        >
          {caption ? <span className="mono-label">{caption}</span> : <span />}
          {device}
        </figcaption>
      ) : null}
    </figure>
  );
}
