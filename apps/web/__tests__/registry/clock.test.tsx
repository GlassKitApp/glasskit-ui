import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, render } from "@testing-library/react";
import { Clock } from "@registry/ui/clock";

describe("Clock live mode", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 5, 10, 9, 41, 30));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("ticks live and re-renders across the minute boundary", () => {
    const { container } = render(<Clock locale="en-US" />);
    const time = container.querySelector("[data-clock-time]");
    expect(time?.textContent).toContain("9:41");

    // 30s to the boundary (+50ms slack) — advance past it.
    act(() => {
      vi.advanceTimersByTime(30_100);
    });
    expect(time?.textContent).toContain("9:42");
  });

  it("auto-formats the date line when omitted", () => {
    const { container } = render(<Clock locale="en-US" />);
    expect(container.querySelector("[data-clock-date]")?.textContent).toContain(
      "June 10",
    );
  });

  it("honors hour12=false", () => {
    vi.setSystemTime(new Date(2026, 5, 10, 21, 5, 0));
    const { container } = render(<Clock locale="en-US" hour12={false} />);
    expect(container.querySelector("[data-clock-time]")?.textContent).toContain(
      "21:05",
    );
  });

  it("cleans up its timer on unmount", () => {
    const { unmount } = render(<Clock locale="en-US" />);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});

describe("Clock controlled mode", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 5, 10, 9, 41, 30));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the prop verbatim and never ticks", () => {
    const { container } = render(<Clock time="9:41" date="Tuesday, June 9" />);
    expect(vi.getTimerCount()).toBe(0);
    const time = container.querySelector("[data-clock-time]");
    expect(time?.textContent).toBe("9:41");
    act(() => {
      vi.advanceTimersByTime(120_000);
    });
    expect(time?.textContent).toBe("9:41");
  });

  it("does not invent a date line in controlled mode", () => {
    const { container } = render(<Clock time="9:41" />);
    expect(container.querySelector("[data-clock-date]")).toBeNull();
  });
});
