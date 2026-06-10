import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Screen } from "@registry/ui/screen";
import { Readout } from "@registry/ui/readout";
import { Cue } from "@registry/ui/cue";
import { GlowIcon } from "@registry/ui/glow-icon";

describe("Screen", () => {
  it("renders the stage, and the status/cue regions only when given", () => {
    const { container, rerender } = render(<Screen>stage</Screen>);
    expect(container.querySelector(".gk-screen__stage")?.textContent).toBe(
      "stage",
    );
    expect(container.querySelector(".gk-screen__status")).toBeNull();
    expect(container.querySelector(".gk-screen__cue")).toBeNull();

    rerender(
      <Screen status={<i>s</i>} cue={<i>c</i>}>
        stage
      </Screen>,
    );
    expect(container.querySelector(".gk-screen__status")).not.toBeNull();
    expect(container.querySelector(".gk-screen__cue")).not.toBeNull();
  });
});

describe("Readout", () => {
  it("renders label, value, and an optional unit", () => {
    const { container } = render(
      <Readout label="Heart rate" value="128" unit="BPM" />,
    );
    expect(screen.getByText("Heart rate")).toBeTruthy();
    expect(screen.getByText("128")).toBeTruthy();
    expect(container.querySelector(".gk-readout__unit")?.textContent).toBe(
      "BPM",
    );
  });

  it("marks the secondary emphasis", () => {
    const { container } = render(
      <Readout label="x" value="1" emphasis="secondary" />,
    );
    expect(
      container
        .querySelector(".gk-readout")
        ?.classList.contains("gk-readout--secondary"),
    ).toBe(true);
  });
});

describe("Cue", () => {
  it("applies the accent tone", () => {
    const { container } = render(<Cue tone="accent">Listening</Cue>);
    expect(
      container.firstElementChild?.classList.contains("gk-cue--accent"),
    ).toBe(true);
  });
});

describe("GlowIcon", () => {
  it("toggles the active luminance tier", () => {
    const { container } = render(
      <GlowIcon active>
        <svg />
      </GlowIcon>,
    );
    expect(
      container.firstElementChild?.classList.contains("gk-icon--active"),
    ).toBe(true);
  });

  it("is decorative by default, labelled when given a label", () => {
    const { container, rerender } = render(
      <GlowIcon>
        <svg />
      </GlowIcon>,
    );
    expect(container.firstElementChild?.getAttribute("aria-hidden")).toBe(
      "true",
    );

    rerender(
      <GlowIcon label="Heart">
        <svg />
      </GlowIcon>,
    );
    expect(screen.getByRole("img", { name: "Heart" })).toBeTruthy();
  });
});
