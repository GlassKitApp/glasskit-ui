import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Progress } from "@registry/ui/progress";

describe("Progress", () => {
  it("renders N step dots with `value` filled", () => {
    render(<Progress variant="step" value={3} max={5} />);
    const bar = screen.getByRole("progressbar");
    // Every dot is a direct child of the bar; filled dots take `bg-primary`.
    expect(bar.children).toHaveLength(5);
    expect(bar.querySelectorAll(".bg-primary")).toHaveLength(3);
    expect(bar.getAttribute("aria-valuenow")).toBe("3");
    expect(bar.getAttribute("aria-valuemax")).toBe("5");
  });

  it("clamps an out-of-range value", () => {
    const { container: over } = render(
      <Progress variant="step" value={99} max={5} />,
    );
    expect(
      over.querySelector('[role="progressbar"]')!.querySelectorAll(".bg-primary"),
    ).toHaveLength(5);
    const { container: under } = render(
      <Progress variant="step" value={-3} max={5} />,
    );
    expect(
      under
        .querySelector('[role="progressbar"]')!
        .querySelectorAll(".bg-primary"),
    ).toHaveLength(0);
  });

  it("floors a fractional max to a sane dot count", () => {
    render(<Progress variant="step" value={1} max={3.7} />);
    expect(screen.getByRole("progressbar").children).toHaveLength(3);
  });

  it("names the bar from a string label", () => {
    render(<Progress value={40} label="Download" />);
    expect(screen.getByRole("progressbar", { name: "Download" })).toBeTruthy();
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
