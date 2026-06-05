import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Pin } from "@registry/ui/pin";
import { Callout } from "@registry/ui/callout";

describe("Pin", () => {
  it("projects x/y (0–100%) to a 600-unit SVG translate attribute", () => {
    const { container } = render(
      <Pin x={50} y={25} label="Café" distance="120 m" />,
    );
    const g = container.querySelector("g");
    expect(g?.getAttribute("transform")).toBe("translate(300 150)");
  });

  it("renders the name + distance and a label for AT", () => {
    render(<Pin x={10} y={10} label="Café" distance="120 m" />);
    expect(screen.getByText("Café")).toBeTruthy();
    expect(screen.getByText("120 m")).toBeTruthy();
    expect(screen.getByRole("img", { name: "Café" })).toBeTruthy();
  });
});

describe("Callout", () => {
  it("places the anchor via an SVG translate attribute and draws a leader", () => {
    const { container } = render(
      <Callout x={10} y={20} label="Powell St" detail="Muni · 3 min" />,
    );
    expect(container.querySelector("g")?.getAttribute("transform")).toBe(
      "translate(60 120)",
    );
    expect(container.querySelector(".gk-callout__leader")).not.toBeNull();
    expect(screen.getByText("Powell St")).toBeTruthy();
  });
});
