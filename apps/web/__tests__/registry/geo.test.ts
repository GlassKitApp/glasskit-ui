import { describe, it, expect } from "vitest";
import {
  bearingBetween,
  normalizeDeg,
  relativeBearing,
} from "@registry/lib/geo";

describe("normalizeDeg", () => {
  it("maps any angle into [0, 360)", () => {
    expect(normalizeDeg(0)).toBe(0);
    expect(normalizeDeg(360)).toBe(0);
    expect(normalizeDeg(370)).toBe(10);
    expect(normalizeDeg(-10)).toBe(350);
    expect(normalizeDeg(-725)).toBe(355);
  });
});

describe("bearingBetween", () => {
  it("points along the cardinal directions on the equator/meridian", () => {
    expect(bearingBetween({ lat: 0, lon: 0 }, { lat: 0, lon: 10 })).toBeCloseTo(
      90,
    );
    expect(
      bearingBetween({ lat: 0, lon: 0 }, { lat: 0, lon: -10 }),
    ).toBeCloseTo(270);
    expect(bearingBetween({ lat: 0, lon: 0 }, { lat: 10, lon: 0 })).toBeCloseTo(
      0,
    );
    expect(
      bearingBetween({ lat: 0, lon: 0 }, { lat: -10, lon: 0 }),
    ).toBeCloseTo(180);
  });

  it("computes the SF → LA initial bearing (~136°)", () => {
    const b = bearingBetween(
      { lat: 37.7749, lon: -122.4194 },
      { lat: 34.0522, lon: -118.2437 },
    );
    expect(b).toBeGreaterThan(135);
    expect(b).toBeLessThan(138);
  });

  it("crosses the antimeridian the short way", () => {
    // 179°E → 179°W is a short hop east, not a trip around the globe.
    expect(
      bearingBetween({ lat: 0, lon: 179 }, { lat: 0, lon: -179 }),
    ).toBeCloseTo(90);
  });
});

describe("relativeBearing", () => {
  it("subtracts the wearer's heading", () => {
    expect(relativeBearing(90, 90)).toBe(0); // facing the target → straight up
    expect(relativeBearing(10, 350)).toBe(20); // wraps across north
    expect(relativeBearing(0, 90)).toBe(270); // target is to the left
  });
});
