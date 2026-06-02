import { describe, expect, it } from "vitest";
import { orientationEqual, motionEqual } from "./sensors";

describe("orientationEqual", () => {
  it("treats identical orientations as equal", () => {
    const a = { alpha: 90, beta: 0, gamma: 0 };
    const b = { alpha: 90, beta: 0, gamma: 0 };
    expect(orientationEqual(a, b)).toBe(true);
  });

  it("treats all-null orientations as equal", () => {
    const a = { alpha: null, beta: null, gamma: null };
    const b = { alpha: null, beta: null, gamma: null };
    expect(orientationEqual(a, b)).toBe(true);
  });

  it("flags any single-field change as unequal", () => {
    const base = { alpha: 90, beta: 0, gamma: 0 };
    expect(orientationEqual(base, { ...base, alpha: 91 })).toBe(false);
    expect(orientationEqual(base, { ...base, beta: 1 })).toBe(false);
    expect(orientationEqual(base, { ...base, gamma: -1 })).toBe(false);
  });

  it("distinguishes null from 0 — they're different sensor states", () => {
    expect(
      orientationEqual(
        { alpha: 0, beta: 0, gamma: 0 },
        { alpha: null, beta: 0, gamma: 0 },
      ),
    ).toBe(false);
  });
});

describe("motionEqual", () => {
  it("treats identical motion as equal", () => {
    expect(motionEqual({ x: 1, y: 2, z: 3 }, { x: 1, y: 2, z: 3 })).toBe(true);
  });

  it("flags any single-axis change as unequal", () => {
    const base = { x: 1, y: 2, z: 3 };
    expect(motionEqual(base, { ...base, x: 1.001 })).toBe(false);
    expect(motionEqual(base, { ...base, y: 0 })).toBe(false);
    expect(motionEqual(base, { ...base, z: null })).toBe(false);
  });
});
