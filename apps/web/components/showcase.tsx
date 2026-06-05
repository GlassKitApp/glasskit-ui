/**
 * PLACEHOLDER component previews — static mockups of the GlassKit additive
 * components (the real styled components land in Phase 4). They render the
 * on-device look (emitted green light on near-black) so we can visualize the
 * Radix-style showcase before the components exist.
 */

function Card({
  name,
  className,
  children,
}: {
  name: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`add-card p-5 ${className ?? ""}`}>
      <p className="add-label">{name}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export function ReadoutCard({ className }: { className?: string }) {
  return (
    <Card name="Readout" className={className}>
      <div className="flex items-end gap-7">
        <div>
          <p className="add-label add-dim">Heading</p>
          <p className="mt-1 text-3xl font-semibold tabular-nums">124°</p>
        </div>
        <div>
          <p className="add-label add-dim">Pace</p>
          <p className="add-accent add-glow mt-1 text-3xl font-semibold tabular-nums">
            5:20
          </p>
        </div>
      </div>
    </Card>
  );
}

export function ButtonCard({ className }: { className?: string }) {
  return (
    <Card name="Button · focus ring" className={className}>
      <div className="flex flex-col gap-2.5">
        <button
          type="button"
          className="add-focus rounded-xl border border-add-line px-4 py-2.5 text-left text-sm font-medium text-white"
        >
          Get directions
        </button>
        <button
          type="button"
          className="rounded-xl border border-add-line px-4 py-2.5 text-left text-sm text-add-ink"
        >
          Dismiss
        </button>
      </div>
    </Card>
  );
}

export function ProgressCard({ className }: { className?: string }) {
  return (
    <Card name="Progress" className={className}>
      <div className="flex justify-between text-xs">
        <span className="add-dim">Syncing route</span>
        <span className="add-accent tabular-nums">62%</span>
      </div>
      <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-[62%] rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
      </div>
      <div className="mt-4 flex gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={
              i < 3
                ? "size-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]"
                : "size-1.5 rounded-full bg-white/15"
            }
          />
        ))}
      </div>
    </Card>
  );
}

export function CueCard({ className }: { className?: string }) {
  return (
    <Card name="Cue · caption" className={className}>
      <p className="text-[15px] leading-snug text-add-ink">
        &ldquo;Take the next left, then it&rsquo;s the second door on your
        right.&rdquo;
      </p>
    </Card>
  );
}

export function LauncherCard({ className }: { className?: string }) {
  const tiles = ["Monitor", "Choose", "Cue", "Notify"];
  return (
    <Card name="Launcher" className={className}>
      <div className="grid grid-cols-2 gap-2">
        {tiles.map((t, i) => (
          <div
            key={t}
            className={`rounded-lg border px-3 py-2.5 text-xs ${
              i === 0
                ? "add-focus font-medium text-white"
                : "border-add-line text-add-ink"
            }`}
          >
            {t}
          </div>
        ))}
      </div>
    </Card>
  );
}

export function DirectionCard({ className }: { className?: string }) {
  return (
    <Card name="Direction" className={className}>
      <div className="flex items-center gap-4">
        <svg
          viewBox="0 0 100 100"
          className="size-12 add-accent drop-shadow-[0_0_12px_var(--accent)]"
          aria-hidden
        >
          <path
            d="M50 8 L82 78 L50 60 L18 78 Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
        <div>
          <p className="text-2xl font-semibold tabular-nums">120 m</p>
          <p className="add-label add-dim mt-0.5">Market St</p>
        </div>
      </div>
    </Card>
  );
}

export function StatusBarCard({ className }: { className?: string }) {
  return (
    <div
      className={`add-card flex items-center justify-between px-5 py-3.5 ${className ?? ""}`}
    >
      <div className="flex items-center gap-4 text-xs">
        <span className="add-accent flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
          GPS
        </span>
        <span className="add-dim">Connected</span>
      </div>
      <span className="tabular-nums text-sm font-medium">12:42</span>
    </div>
  );
}

export function ChipsCard({ className }: { className?: string }) {
  return (
    <Card name="Badge · Toggle" className={className}>
      <div className="flex items-center gap-2.5">
        <span className="add-accent rounded-full border border-add-line px-2.5 py-1 text-xs">
          ● Live
        </span>
        <span className="add-dim rounded-full border border-add-line px-2.5 py-1 text-xs">
          Idle
        </span>
        <span className="ml-auto inline-flex h-6 w-11 items-center rounded-full bg-accent/25 px-0.5">
          <span className="size-5 translate-x-5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
        </span>
      </div>
    </Card>
  );
}
