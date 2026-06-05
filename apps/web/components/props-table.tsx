import type { PropRow } from "@/lib/component-docs";

/** Blueprint-style props reference table. */
export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="overflow-x-auto border border-line-2">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line-2 bg-bg-2">
            <th className="mono-label px-4 py-2.5 font-medium">Prop</th>
            <th className="mono-label px-4 py-2.5 font-medium">Type</th>
            <th className="mono-label px-4 py-2.5 font-medium">Default</th>
            <th className="mono-label px-4 py-2.5 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-b border-line last:border-b-0">
              <td className="px-4 py-2.5 font-mono text-[13px] text-ink">
                {r.name}
              </td>
              <td className="px-4 py-2.5 font-mono text-[13px] text-accent-ink">
                {r.type}
              </td>
              <td className="px-4 py-2.5 font-mono text-[13px] text-ink-3">
                {r.default ?? "—"}
              </td>
              <td className="px-4 py-2.5 text-ink-2">{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
