import { describe, expect, it } from "vitest";
import { scoreRect } from "./dpad";

// 50×50 rect at (100,100). Center: (125,125).
const CURRENT = { left: 100, top: 100, width: 50, height: 50 };

describe("scoreRect", () => {
  it("ignores candidates not in the direction of travel", () => {
    // Candidate well to the left of current — never wins on "right".
    const candidate = { left: 0, top: 100, width: 50, height: 50 };
    expect(scoreRect(CURRENT, candidate, "right")).toBeNull();
  });

  it("scores aligned candidates in direction", () => {
    // Directly to the right, same row.
    const candidate = { left: 200, top: 100, width: 50, height: 50 };
    const s = scoreRect(CURRENT, candidate, "right");
    expect(s).not.toBeNull();
    expect(s!).toBeGreaterThan(0);
  });

  it("penalises drift — closer-but-drifted loses to farther-but-aligned", () => {
    const aligned = { left: 300, top: 100, width: 50, height: 50 }; // dx=225, dy=0
    const drifted = { left: 200, top: 200, width: 50, height: 50 }; // dx=125, dy=100
    const sAligned = scoreRect(CURRENT, aligned, "right");
    const sDrifted = scoreRect(CURRENT, drifted, "right");
    expect(sAligned).not.toBeNull();
    expect(sDrifted).not.toBeNull();
    // Aligned (drift = 0) beats drifted (cross-axis penalty * 2).
    expect(sAligned!).toBeLessThan(sDrifted!);
  });

  it("handles all four cardinal directions", () => {
    const up = { left: 100, top: 0, width: 50, height: 50 };
    const down = { left: 100, top: 200, width: 50, height: 50 };
    const left = { left: 0, top: 100, width: 50, height: 50 };
    const right = { left: 200, top: 100, width: 50, height: 50 };

    expect(scoreRect(CURRENT, up, "up")).not.toBeNull();
    expect(scoreRect(CURRENT, down, "down")).not.toBeNull();
    expect(scoreRect(CURRENT, left, "left")).not.toBeNull();
    expect(scoreRect(CURRENT, right, "right")).not.toBeNull();

    // And the negative cases — each rect only registers in its
    // own direction, never the opposite one.
    expect(scoreRect(CURRENT, up, "down")).toBeNull();
    expect(scoreRect(CURRENT, down, "up")).toBeNull();
    expect(scoreRect(CURRENT, left, "right")).toBeNull();
    expect(scoreRect(CURRENT, right, "left")).toBeNull();
  });
});
