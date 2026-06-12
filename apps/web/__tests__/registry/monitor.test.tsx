import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusDot } from "@registry/ui/status-dot";
import { Meter } from "@registry/ui/meter";
import { StatGrid } from "@registry/ui/stat-grid";
import { Toast } from "@registry/ui/toast";
import { ErrorState } from "@registry/ui/error-state";

describe("StatusDot", () => {
  it("reflects the tone and renders the label", () => {
    const { container } = render(<StatusDot status="live" label="GPS" />);
    expect(
      container.firstElementChild?.classList.contains("gk-statusdot--live"),
    ).toBe(true);
    expect(screen.getByText("GPS")).toBeTruthy();
  });
});

describe("Meter", () => {
  it("clamps value and exposes meter semantics", () => {
    render(<Meter value={150} max={100} label="Effort" />);
    const m = screen.getByRole("meter");
    expect(m.getAttribute("aria-valuenow")).toBe("100");
    expect(m.getAttribute("aria-valuemax")).toBe("100");
  });

  it("takes its accessible name from a string label", () => {
    render(<Meter value={80} label="Battery" />);
    expect(screen.getByRole("meter", { name: "Battery" })).toBeTruthy();
  });

  it("reveals the arc via a stroke-dashoffset attribute (not inline style)", () => {
    const { container } = render(<Meter value={50} max={100} />);
    const fill = container.querySelector(".gk-meter__fill");
    const off = Number(fill?.getAttribute("stroke-dashoffset"));
    const circ = 2 * Math.PI * 42;
    expect(off).toBeCloseTo(circ * 0.5, 1); // 50% → half the circumference
  });
});

describe("StatGrid", () => {
  it("renders a cell per item with value + label", () => {
    const { container } = render(
      <StatGrid
        items={[
          { label: "Pace", value: "8'42", unit: "/mi" },
          { label: "Heart", value: 128, unit: "bpm" },
        ]}
      />,
    );
    expect(container.querySelectorAll(".gk-statgrid__cell")).toHaveLength(2);
    expect(screen.getByText("Pace")).toBeTruthy();
    expect(screen.getByText("128")).toBeTruthy();
  });
});

describe("Toast", () => {
  it("renders only when open", () => {
    const { rerender, container } = render(<Toast open={false}>Saved</Toast>);
    expect(container.firstChild).toBeNull();
    rerender(
      <Toast open emphasis="accent">
        Saved
      </Toast>,
    );
    expect(screen.getByRole("status").textContent).toBe("Saved");
    expect(
      screen.getByRole("status").classList.contains("gk-toast--accent"),
    ).toBe(true);
  });
});

describe("ErrorState", () => {
  it("shows a retry button only when onRetry is given, and fires it", () => {
    const onRetry = vi.fn();
    const { rerender } = render(
      <ErrorState title="No signal" message="Try again." />,
    );
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.getByText("No signal")).toBeTruthy();

    rerender(
      <ErrorState title="No signal" onRetry={onRetry} retryLabel="Retry" />,
    );
    screen.getByRole("button", { name: "Retry" }).click();
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
