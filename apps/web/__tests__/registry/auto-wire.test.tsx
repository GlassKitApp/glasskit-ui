import { describe, it, expect, vi } from "vitest";
import { act, render, renderHook } from "@testing-library/react";
import { Compass } from "@registry/ui/compass";
import { DirectionArrow } from "@registry/ui/direction-arrow";
import { useNeuralBand } from "@glasskit/glasses-ui";
import { bearingBetween, relativeBearing } from "@registry/lib/geo";

/**
 * The auto-wire contract: sensor components self-connect when the prop is
 * omitted, the controlled prop always wins, and with no prop and no sensor
 * data the render is deterministic (SSR/hydration-safe fallback).
 */

function dispatchOrientation(alpha: number | null) {
  act(() => {
    window.dispatchEvent(
      Object.assign(new Event("deviceorientation"), {
        alpha,
        beta: 0,
        gamma: 0,
      }),
    );
  });
}

const SF = { lat: 37.7749, lon: -122.4194 };
const LA = { lat: 34.0522, lon: -118.2437 };

function mockGeolocation(coords: { lat: number; lon: number } | null) {
  const watchPosition = vi.fn(
    (ok: (p: { coords: GeolocationCoordinates }) => void) => {
      if (coords) {
        ok({
          coords: {
            latitude: coords.lat,
            longitude: coords.lon,
            accuracy: 5,
          } as GeolocationCoordinates,
        });
      }
      return 1;
    },
  );
  Object.defineProperty(navigator, "geolocation", {
    configurable: true,
    value: { watchPosition, clearWatch: vi.fn() },
  });
  return watchPosition;
}

// The mock stays in place for the rest of the file (vitest isolates per
// file) — deleting it in afterEach would crash the unmount cleanup's
// clearWatch, which runs after this hook.

describe("Compass auto-wiring", () => {
  it("renders a deterministic 0° before any sensor data (SSR fallback)", () => {
    const { container } = render(<Compass />);
    expect(container.querySelector("g")?.getAttribute("transform")).toBe(
      "rotate(0 50 50)",
    );
  });

  it("follows live head orientation when heading is omitted", () => {
    const { container } = render(<Compass />);
    dispatchOrientation(35);
    expect(container.querySelector("g")?.getAttribute("transform")).toBe(
      "rotate(-35 50 50)",
    );
  });

  it("controlled heading wins over the live sensor", () => {
    const { container } = render(<Compass heading={120} />);
    dispatchOrientation(35);
    expect(container.querySelector("g")?.getAttribute("transform")).toBe(
      "rotate(-120 50 50)",
    );
  });
});

describe("DirectionArrow auto-wiring", () => {
  it("renders a deterministic 0° with no bearing and no target", () => {
    const { container } = render(<DirectionArrow />);
    expect(container.querySelector("g")?.getAttribute("transform")).toBe(
      "rotate(0 50 50)",
    );
  });

  it("aims at a target from live position + head orientation", () => {
    mockGeolocation(SF);
    const { container } = render(<DirectionArrow target={LA} />);
    dispatchOrientation(35);
    // Same float math as the component → exact attribute equality.
    const expected = relativeBearing(bearingBetween(SF, LA), 35);
    expect(container.querySelector("g")?.getAttribute("transform")).toBe(
      `rotate(${expected} 50 50)`,
    );
  });

  it("treats heading as 0 until orientation arrives (absolute bearing)", () => {
    mockGeolocation(SF);
    const { container } = render(<DirectionArrow target={LA} />);
    const expected = Math.round(bearingBetween(SF, LA));
    const deg = Number(
      container
        .querySelector("g")
        ?.getAttribute("transform")
        ?.match(/rotate\(([\d.]+)/)?.[1],
    );
    expect(Math.round(deg)).toBe(expected);
  });

  it("controlled bearing wins over target mode", () => {
    mockGeolocation(SF);
    const { container } = render(<DirectionArrow bearing={10} target={LA} />);
    dispatchOrientation(35);
    expect(container.querySelector("g")?.getAttribute("transform")).toBe(
      "rotate(10 50 50)",
    );
  });
});

describe("useNeuralBand one-shot semantics", () => {
  it("exposes a gesture for one render, then clears on the next microtask", async () => {
    const { result } = renderHook(() => useNeuralBand());
    expect(result.current).toBeNull();

    act(() => {
      window.dispatchEvent(
        new CustomEvent("neuralband", { detail: { gesture: "pinch" } }),
      );
    });
    expect(result.current).toBe("pinch");

    await act(async () => {}); // flush the microtask clear
    expect(result.current).toBeNull();
  });

  it("re-fires for consecutive identical gestures", async () => {
    const seen: string[] = [];
    const { result } = renderHook(() => {
      const g = useNeuralBand();
      if (g) seen.push(g);
      return g;
    });
    for (let i = 0; i < 2; i++) {
      act(() => {
        window.dispatchEvent(
          new CustomEvent("neuralband", { detail: { gesture: "swipe" } }),
        );
      });
      await act(async () => {});
    }
    expect(result.current).toBeNull();
    expect(seen).toEqual(["swipe", "swipe"]);
  });
});
