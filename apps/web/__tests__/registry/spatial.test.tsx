import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DirectionArrow } from "@registry/ui/direction-arrow";
import { Compass, cardinal } from "@registry/ui/compass";
import { Reticle } from "@registry/ui/reticle";

describe("DirectionArrow", () => {
  it("rotates the needle to the bearing via an SVG transform attribute", () => {
    const { container } = render(<DirectionArrow bearing={35} />);
    const g = container.querySelector("g");
    expect(g?.getAttribute("transform")).toBe("rotate(35 50 50)");
  });

  it("normalizes out-of-range bearings (world-anchored, never NaN)", () => {
    const { container: a } = render(<DirectionArrow bearing={395} />);
    expect(a.querySelector("g")?.getAttribute("transform")).toBe(
      "rotate(35 50 50)",
    );
    const { container: b } = render(<DirectionArrow bearing={-10} />);
    expect(b.querySelector("g")?.getAttribute("transform")).toBe(
      "rotate(350 50 50)",
    );
  });

  it("exposes the bearing to assistive tech", () => {
    render(<DirectionArrow bearing={90} />);
    expect(screen.getByRole("img", { name: /90 degrees/ })).toBeTruthy();
  });
});

describe("Compass", () => {
  it("cardinal() maps degrees to the nearest compass point", () => {
    expect(cardinal(0)).toBe("N");
    expect(cardinal(45)).toBe("NE");
    expect(cardinal(90)).toBe("E");
    expect(cardinal(180)).toBe("S");
    expect(cardinal(270)).toBe("W");
    expect(cardinal(359)).toBe("N"); // wraps
    expect(cardinal(-90)).toBe("W"); // negative normalizes
  });

  it("counter-rotates the rose so North stays world-aligned", () => {
    const { container } = render(<Compass heading={290} />);
    const g = container.querySelector("g");
    expect(g?.getAttribute("transform")).toBe("rotate(-290 50 50)");
  });
});

describe("Reticle", () => {
  it("renders four corner brackets", () => {
    const { container } = render(<Reticle />);
    expect(container.querySelectorAll(".gk-reticle__corner")).toHaveLength(4);
  });

  it("toggles the active state", () => {
    const { container } = render(<Reticle active />);
    expect(
      container.firstElementChild?.classList.contains("gk-reticle--active"),
    ).toBe(true);
  });
});
