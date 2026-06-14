import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@registry/ui/button";

describe("Button", () => {
  it("renders a focusable button so useDpad includes it", () => {
    render(<Button>Log</Button>);
    const btn = screen.getByRole("button", { name: "Log" });
    expect(btn.tagName).toBe("BUTTON");
    expect(btn.classList.contains("focusable")).toBe(true);
    expect(btn.getAttribute("type")).toBe("button");
  });

  it("fires onClick when activated (useDpad calls .click() on Enter/Space)", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);
    screen.getByRole("button", { name: "Go" }).click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("reflects disabled so the D-pad selector skips it", () => {
    render(<Button disabled>Off</Button>);
    const btn = screen.getByRole("button", {
      name: "Off",
    }) as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
  });

  it("marks the primary variant", () => {
    render(<Button variant="primary">Primary</Button>);
    expect(
      screen.getByRole("button").classList.contains("btn-primary"),
    ).toBe(true);
  });

  it("renders a leading icon slot", () => {
    render(<Button icon={<span data-testid="ic" />}>Labeled</Button>);
    expect(screen.getByTestId("ic")).toBeTruthy();
  });
});
