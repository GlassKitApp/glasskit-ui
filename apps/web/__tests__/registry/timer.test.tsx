import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, render } from "@testing-library/react";
import { Timer } from "@registry/ui/timer";
import { EmptyState } from "@registry/ui/empty-state";

beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
});

const time = (container: HTMLElement) =>
  container.querySelector(".gk-timer__time")!.textContent;

describe("Timer self-ticking", () => {
  it("counts down from duration and fires onComplete once at zero", () => {
    const onComplete = vi.fn();
    const { container } = render(
      <Timer duration={3} onComplete={onComplete} showBar={false} />,
    );
    expect(time(container)).toBe("0:03");

    act(() => vi.advanceTimersByTime(1100));
    expect(time(container)).toBe("0:02");

    act(() => vi.advanceTimersByTime(2100));
    expect(time(container)).toBe("0:00");
    expect(onComplete).toHaveBeenCalledTimes(1);

    // No stray timers keep firing after completion.
    act(() => vi.advanceTimersByTime(5000));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("pauses when running flips false and resumes from the frozen value", () => {
    const { container, rerender } = render(<Timer duration={10} />);
    act(() => vi.advanceTimersByTime(2100));
    expect(time(container)).toBe("0:08");

    rerender(<Timer duration={10} running={false} />);
    act(() => vi.advanceTimersByTime(5000));
    expect(time(container)).toBe("0:08"); // frozen

    rerender(<Timer duration={10} running />);
    act(() => vi.advanceTimersByTime(1100));
    expect(time(container)).toBe("0:07");
  });

  it("resets when duration changes", () => {
    const { container, rerender } = render(<Timer duration={10} />);
    act(() => vi.advanceTimersByTime(3100));
    expect(time(container)).toBe("0:07");

    rerender(<Timer duration={60} />);
    expect(time(container)).toBe("1:00");
  });

  it("formats hours as h:mm:ss", () => {
    const { container } = render(
      <Timer remaining={3725} showBar={false} />, // 1h 2m 5s
    );
    expect(time(container)).toBe("1:02:05");
  });
});

describe("Timer controlled", () => {
  it("never ticks — the remaining prop wins", () => {
    const { container } = render(<Timer remaining={42} duration={60} />);
    expect(time(container)).toBe("0:42");
    act(() => vi.advanceTimersByTime(3000));
    expect(time(container)).toBe("0:42");
  });

  it("clamps negative remaining to zero", () => {
    const { container } = render(<Timer remaining={-5} showBar={false} />);
    expect(time(container)).toBe("0:00");
  });
});

describe("EmptyState", () => {
  it("renders title, hint, and an action only when onAction is set", () => {
    const onAction = vi.fn();
    const { container, getByRole, rerender } = render(
      <EmptyState title="No messages" hint="They land here." />,
    );
    expect(container.textContent).toContain("No messages");
    expect(container.textContent).toContain("They land here.");
    expect(container.querySelector("button")).toBeNull();

    rerender(
      <EmptyState
        title="No messages"
        onAction={onAction}
        actionLabel="Check"
      />,
    );
    const btn = getByRole("button");
    expect(btn.textContent).toBe("Check");
    expect(btn.classList.contains("focusable")).toBe(true);
    btn.click();
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
