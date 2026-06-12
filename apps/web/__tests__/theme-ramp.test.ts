import { describe, it, expect } from "vitest";
import { deriveRamp, hexToOklch, oklchToHex } from "@/lib/theme-ramp";

/** Max per-channel distance between two hexes. */
function dist(a: string, b: string): number {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  return Math.max(
    Math.abs(((pa >> 16) & 255) - ((pb >> 16) & 255)),
    Math.abs(((pa >> 8) & 255) - ((pb >> 8) & 255)),
    Math.abs((pa & 255) - (pb & 255)),
  );
}

describe("theme ramp derivation", () => {
  it("round-trips hex through OKLCH", () => {
    for (const hex of ["#4c8dff", "#f5a623", "#9b8cff", "#34c8e6"]) {
      expect(dist(oklchToHex(hexToOklch(hex)), hex)).toBeLessThanOrEqual(1);
    }
  });

  it("lands close to every hand-tuned preset (calibration guard)", () => {
    // The presets in globals.css are the ground truth the math was
    // calibrated against — drift past ~0x22/channel means the formula
    // regressed, not that the presets are wrong.
    const presets = {
      "#4c8dff": {
        active: "#8fb6ff",
        muted: "#2f5fb0",
        faint: "#1b3056",
        gradHi: "#5b9dff",
        gradLo: "#3567e6",
      },
      "#34c8e6": {
        active: "#82e1f2",
        muted: "#1f7d92",
        faint: "#133f4a",
        gradHi: "#48cde8",
        gradLo: "#2ba6c0",
      },
      "#f5a623": {
        active: "#ffca6b",
        muted: "#a06d12",
        faint: "#4d350a",
        gradHi: "#f6af39",
        gradLo: "#cf8c1b",
      },
      "#9b8cff": {
        active: "#c4baff",
        muted: "#5d52a6",
        faint: "#2f2a55",
        gradHi: "#a597ff",
        gradLo: "#7f72d7",
      },
    } as const;
    for (const [accent, want] of Object.entries(presets)) {
      const got = deriveRamp(accent);
      for (const [step, hex] of Object.entries(want)) {
        expect(
          dist(got[step as keyof typeof want], hex),
          `${accent} ${step}: ${got[step as keyof typeof want]} vs ${hex}`,
        ).toBeLessThanOrEqual(0x22);
      }
    }
  });

  it("keeps the accent verbatim and emits a 60% glow of the deep stop", () => {
    const r = deriveRamp("#4cd9a6");
    expect(r.accent).toBe("#4cd9a6");
    const n = parseInt(r.gradLo.slice(1), 16);
    expect(r.glow).toBe(
      `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, 0.6)`,
    );
  });

  it("monotonic lightness: active > gradHi > accent > gradLo > muted > faint", () => {
    const L = (hex: string) => hexToOklch(hex).L;
    const r = deriveRamp("#4c8dff");
    expect(L(r.active)).toBeGreaterThan(L(r.gradHi));
    expect(L(r.gradHi)).toBeGreaterThan(L(r.accent));
    expect(L(r.accent)).toBeGreaterThan(L(r.gradLo));
    expect(L(r.gradLo)).toBeGreaterThan(L(r.muted));
    expect(L(r.muted)).toBeGreaterThan(L(r.faint));
  });
});
