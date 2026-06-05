import { cn } from "@/lib/utils";

/** Static, hard-bordered code block in the blueprint style. */
export function CodeBlock({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <pre
      className={cn(
        "overflow-x-auto border border-line-2 bg-bg-2 p-4 font-mono text-[13px] leading-relaxed text-ink",
        className,
      )}
    >
      <code>{children}</code>
    </pre>
  );
}
