import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Progress } from "@registry/ui/progress";

describe("Progress", () => {
  it("renders N step dots with `value` filled", () => {
    const { container } = render(<Progress variant="step" value={3} max={5} />);
    expect(container.querySelectorAll(".gk-step")).toHaveLength(5);
    expect(container.querySelectorAll(".gk-step--on")).toHaveLength(3);
    const bar = screen.getByRole("progressbar");
    expect(bar.getAttribute("aria-valuenow")).toBe("3");
    expect(bar.getAttribute("aria-valuemax")).toBe("5");
  });

  it("clamps an out-of-range value", () => {
    const { container: over } = render(
      <Progress variant="step" value={99} max={5} />,
    );
    expect(over.querySelectorAll(".gk-step--on")).toHaveLength(5);
    const { container: under } = render(
      <Progress variant="step" value={-3} max={5} />,
    );
    expect(under.querySelectorAll(".gk-step--on")).toHaveLength(0);
  });

  it("renders a native <progress> for the linear variant", () => {
    const { container } = render(<Progress value={40} />);
    const el = container.querySelector("progress");
    expect(el).not.toBeNull();
    expect(el?.value).toBe(40);
    expect(el?.max).toBe(100);
  });

  it("shows an optional label", () => {
    render(<Progress value={2} max={5} label="2 of 5" />);
    expect(screen.getByText("2 of 5")).toBeTruthy();
  });
});
