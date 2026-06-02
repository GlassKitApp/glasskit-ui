import type { ReactNode } from "react";

/**
 * <GlassViewport> — the 600×600 Meta Ray-Ban Display surface.
 *
 * The Display is an *additive* screen: pure black emits no light, so
 * black renders as transparent (the wearer sees the real world) and
 * everything you draw is light layered on top. Design rules that
 * follow from that:
 *
 *   - Background stays pure black (#000). Don't fill it.
 *   - Use few elements, high contrast, generous spacing.
 *   - Light is the ink. Green / white read best.
 *
 * On the device the surface IS 600×600. Locally this renders a fixed
 * 600×600 panel with a faint frame so you can see the bounds — pass
 * `frame={false}` to drop it.
 */
export function GlassViewport({
  children,
  frame = true,
}: {
  children: ReactNode;
  frame?: boolean;
}) {
  return (
    <div className={`glass-viewport${frame ? " glass-viewport--frame" : ""}`}>
      {children}
    </div>
  );
}
