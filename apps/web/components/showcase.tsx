/**
 * PLACEHOLDER component previews — static mockups of the GlassKit additive
 * components (the real styled components land in Phase 4). Each is a dark
 * "building block" with a hard border and a monospace label, the way you'd
 * snap a part into the blueprint. The content shows the on-device look
 * (emitted green light on near-black).
 */

function Block({
  name,
  tag,
  className,
  children,
}: {
  name: string;
  tag?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`add-block ${className ?? ""}`}>
      <div className="flex items-center justify-between border-b border-add-line px-4 py-2.5">
        <span className="add-label">{name}</span>
        {tag ? <span className="add-label add-dim">{tag}</span> : null}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export function ReadoutCard({ className }: { className?: string }) {
  return (
    <Block name="Readout" tag="ui" className={className}>
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
    </Block>
  );
}

export function ButtonCard({ className }: { className?: string }) {
  return (
    <Block name="Button" tag="focus" className={className}>
      <div className="flex flex-col gap-2">
        <button
          type="button"
          className="add-focus border border-add-line px-4 py-2.5 text-left text-sm font-medium text-white"
        >
          Get directions
        </button>
        <button
          type="button"
          className="border border-add-line px-4 py-2.5 text-left text-sm text-add-ink"
        >
          Dismiss
        </button>
      </div>
    </Block>
  );
}

export function ProgressCard({ className }: { className?: string }) {
  return (
    <Block name="Progress" tag="ui" className={className}>
      <div className="flex justify-between text-xs">
        <span className="add-dim">Syncing route</span>
        <span className="add-accent tabular-nums">62%</span>
      </div>
      <div className="mt-2.5 h-1.5 w-full overflow-hidden bg-white/10">
        <div className="h-full w-[62%] bg-accent shadow-[0_0_12px_var(--accent)]" />
      </div>
      <div className="mt-4 flex gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={
              i < 3
                ? "h-1.5 w-5 bg-accent shadow-[0_0_8px_var(--accent)]"
                : "h-1.5 w-5 bg-white/15"
            }
          />
        ))}
      </div>
    </Block>
  );
}

export function CueCard({ className }: { className?: string }) {
  return (
    <Block name="Cue" tag="caption" className={className}>
      <p className="text-[15px] leading-snug text-add-ink">
        &ldquo;Take the next left, then it&rsquo;s the second door on your
        right.&rdquo;
      </p>
    </Block>
  );
}

export function LauncherCard({ className }: { className?: string }) {
  const tiles = ["Monitor", "Choose", "Cue", "Notify"];
  return (
    <Block name="Launcher" tag="block" className={className}>
      <div className="grid grid-cols-2 gap-2">
        {tiles.map((t, i) => (
          <div
            key={t}
            className={`border px-3 py-2.5 text-xs ${
              i === 0
                ? "add-focus font-medium text-white"
                : "border-add-line text-add-ink"
            }`}
          >
            {t}
          </div>
        ))}
      </div>
    </Block>
  );
}

export function DirectionCard({ className }: { className?: string }) {
  return (
    <Block name="Direction" tag="spatial" className={className}>
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
    </Block>
  );
}

export function StatusBarCard({ className }: { className?: string }) {
  return (
    <Block name="StatusBar" tag="ui" className={className}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs">
          <span className="add-accent flex items-center gap-1.5">
            <span className="size-1.5 bg-accent shadow-[0_0_8px_var(--accent)]" />
            GPS
          </span>
          <span className="add-dim">Connected</span>
        </div>
        <span className="tabular-nums text-sm font-medium">12:42</span>
      </div>
    </Block>
  );
}

export function ChipsCard({ className }: { className?: string }) {
  return (
    <Block name="Badge · Toggle" tag="ui" className={className}>
      <div className="flex items-center gap-2.5">
        <span className="add-accent border border-add-line px-2.5 py-1 text-xs">
          ● Live
        </span>
        <span className="add-dim border border-add-line px-2.5 py-1 text-xs">
          Idle
        </span>
        <span className="ml-auto inline-flex h-6 w-11 items-center bg-accent/25 px-0.5">
          <span className="size-5 translate-x-5 bg-accent shadow-[0_0_10px_var(--accent)]" />
        </span>
      </div>
    </Block>
  );
}
