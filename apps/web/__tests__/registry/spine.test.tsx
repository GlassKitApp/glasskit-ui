import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Screen } from "@registry/ui/screen";
import { Readout } from "@registry/ui/readout";
import { Icon } from "@registry/ui/icon";

describe("Screen", () => {
  it("renders the stage, and the status/cue regions only when given", () => {
    const { container, rerender } = render(<Screen>stage</Screen>);
    expect(container.querySelector("[data-screen-stage]")?.textContent).toBe(
      "stage",
    );
    expect(container.querySelector("[data-screen-status]")).toBeNull();
    expect(container.querySelector("[data-screen-cue]")).toBeNull();

    rerender(
      <Screen status={<i>s</i>} cue={<i>c</i>}>
        stage
      </Screen>,
    );
    expect(container.querySelector("[data-screen-status]")).not.toBeNull();
    expect(container.querySelector("[data-screen-cue]")).not.toBeNull();
  });

  it("renders the cue as a polite live region, accented when live", () => {
    const { container, rerender } = render(
      <Screen cue="Listening">stage</Screen>,
    );
    const cue = container.querySelector("[data-screen-cue]");
    expect(cue?.getAttribute("role")).toBe("status");
    expect(cue?.textContent).toBe("Listening");
    // Default cue is the faint tier, not the accent tone.
    expect(cue?.classList.contains("text-foreground-faint")).toBe(true);
    expect(cue?.classList.contains("text-primary")).toBe(false);

    rerender(
      <Screen cue="Listening" cueLive>
        stage
      </Screen>,
    );
    const live = container.querySelector("[data-screen-cue]");
    expect(live?.classList.contains("text-primary")).toBe(true);
  });
});

describe("Readout", () => {
  it("renders label, value, and an optional unit", () => {
    const { container } = render(
      <Readout label="Heart rate" value="128" unit="BPM" />,
    );
    expect(screen.getByText("Heart rate")).toBeTruthy();
    expect(screen.getByText("128")).toBeTruthy();
    // The unit ("BPM") renders as its own text node beside the value.
    expect(container.textContent).toContain("BPM");
    expect(screen.getByText("BPM")).toBeTruthy();
  });

  it("marks the secondary emphasis", () => {
    const { container } = render(
      <Readout label="x" value="1" emphasis="secondary" />,
    );
    // Secondary readouts render in the muted (dimmer) tier; primary uses the
    // bright title type. Assert the value carries the muted treatment.
    const value = screen.getByText("1");
    expect(value.classList.contains("text-muted-foreground")).toBe(true);
  });
});

describe("Icon", () => {
  it("toggles the active luminance tier", () => {
    const { container } = render(
      <Icon active>
        <svg />
      </Icon>,
    );
    expect(
      container.firstElementChild?.classList.contains("gk-icon--active"),
    ).toBe(true);
  });

  it("is decorative by default, labelled when given a label", () => {
    const { container, rerender } = render(
      <Icon>
        <svg />
      </Icon>,
    );
    expect(container.firstElementChild?.getAttribute("aria-hidden")).toBe(
      "true",
    );

    rerender(
      <Icon label="Heart">
        <svg />
      </Icon>,
    );
    expect(screen.getByRole("img", { name: "Heart" })).toBeTruthy();
  });
});
