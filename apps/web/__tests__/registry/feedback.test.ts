import { describe, it, expect, vi, afterEach } from "vitest";
import { buzz, useFeedback } from "@glasskit-ui/react";
import { renderHook } from "@testing-library/react";

afterEach(() => vi.restoreAllMocks());

describe("useFeedback / buzz", () => {
  it("dispatches the glasskitfeedback event with the pattern", () => {
    const seen: string[] = [];
    const onBuzz = (e: Event) =>
      seen.push((e as CustomEvent<{ pattern: string }>).detail.pattern);
    window.addEventListener("glasskitfeedback", onBuzz);
    buzz();
    buzz("success");
    window.removeEventListener("glasskitfeedback", onBuzz);
    expect(seen).toEqual(["tap", "success"]);
  });

  it("vibrates when the UA supports it, and survives when it doesn't", () => {
    const vibrate = vi.fn();
    Object.defineProperty(navigator, "vibrate", {
      value: vibrate,
      configurable: true,
    });
    buzz("warning");
    expect(vibrate).toHaveBeenCalledWith([40, 80, 40]);

    // jsdom default: no vibrate — must not throw.
    Object.defineProperty(navigator, "vibrate", {
      value: undefined,
      configurable: true,
    });
    expect(() => buzz()).not.toThrow();
  });

  it("the hook hands back the same stable function", () => {
    const { result, rerender } = renderHook(() => useFeedback());
    const first = result.current.buzz;
    rerender();
    expect(result.current.buzz).toBe(first);
    expect(first).toBe(buzz);
  });
});
