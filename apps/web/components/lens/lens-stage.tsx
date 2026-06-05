import type { ReactNode } from "react";

/**
 * Site-chrome frame that holds a 600×600 lens preview: a dark device-like
 * mat (so the additive black surface reads as a screen) inside the
 * blueprint's hard 1px border. The mat is website chrome — the additive
 * rules stop at the bezel.
 */
export function LensStage({
  children,
  caption,
}: {
  children: ReactNode;
  caption?: ReactNode;
}) {
  return (
    <figure className="flex flex-col items-center gap-4">
      <div className="max-w-full overflow-x-auto border border-line-2 bg-[#050507] p-5">
        {children}
      </div>
      {caption ? (
        <figcaption className="mono-label">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
