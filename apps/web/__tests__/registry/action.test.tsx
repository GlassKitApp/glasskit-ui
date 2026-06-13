import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Toggle } from "@registry/ui/toggle";
import { Stepper } from "@registry/ui/stepper";
import { Segmented } from "@registry/ui/segmented";
import { Confirm } from "@registry/ui/confirm";
import { Badge } from "@registry/ui/badge";
import { Slider } from "@registry/ui/slider";

describe("Toggle", () => {
  it("is a focusable switch reflecting checked", () => {
    render(<Toggle checked label="Notifications" />);
    const sw = screen.getByRole("switch", { name: /Notifications/ });
    expect(sw.classList.contains("focusable")).toBe(true);
    expect(sw.getAttribute("aria-checked")).toBe("true");
    expect(sw.classList.contains("gk-toggle--on")).toBe(true);
  });

  it("emits the negated value on activation", () => {
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} label="X" />);
    screen.getByRole("switch").click();
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

describe("Stepper", () => {
  it("increments and decrements by step, clamped to bounds", () => {
    const onChange = vi.fn();
    render(
      <Stepper
        label="Brightness"
        value={3}
        min={1}
        max={5}
        step={1}
        onChange={onChange}
      />,
    );
    screen.getByRole("button", { name: /Increase/ }).click();
    screen.getByRole("button", { name: /Decrease/ }).click();
    expect(onChange).toHaveBeenNthCalledWith(1, 4);
    expect(onChange).toHaveBeenNthCalledWith(2, 2);
  });

  it("disables the ends at the bounds", () => {
    render(<Stepper label="V" value={5} min={1} max={5} onChange={() => {}} />);
    expect(
      (screen.getByRole("button", { name: /Increase/ }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
    expect(
      (screen.getByRole("button", { name: /Decrease/ }) as HTMLButtonElement)
        .disabled,
    ).toBe(false);
  });
});

describe("Segmented", () => {
  it("renders a radio per option and marks the selected one", () => {
    render(
      <Segmented
        value="map"
        options={[
          { value: "map", label: "Map" },
          { value: "list", label: "List" },
        ]}
      />,
    );
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(2);
    const map = screen.getByRole("radio", { name: "Map" });
    expect(map.getAttribute("aria-checked")).toBe("true");
    // The selected segment gets the filled accent ("on") treatment.
    expect(map.classList.contains("btn-primary")).toBe(true);
    // ...and the unselected one does not.
    expect(
      screen
        .getByRole("radio", { name: "List" })
        .classList.contains("btn-primary"),
    ).toBe(false);
  });

  it("emits the chosen value", () => {
    const onChange = vi.fn();
    render(
      <Segmented
        value="map"
        onChange={onChange}
        options={[
          { value: "map", label: "Map" },
          { value: "list", label: "List" },
        ]}
      />,
    );
    screen.getByRole("radio", { name: "List" }).click();
    expect(onChange).toHaveBeenCalledWith("list");
  });
});

describe("Confirm", () => {
  it("renders the prompt and fires the right handler", () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    render(
      <Confirm
        title="End workout?"
        message="Saved."
        confirmLabel="End"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />,
    );
    expect(screen.getByText("End workout?")).toBeTruthy();
    screen.getByRole("button", { name: "End" }).click();
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onCancel).not.toHaveBeenCalled();
  });
});

describe("read-only (no onChange)", () => {
  // The RSC-safety of the uncontrolled path (onClick must be omitted so a server
  // component can render the preview) is verified live by the docs pages, not
  // here — jsdom can't reproduce the server-serialization error. This just
  // guards that an uncontrolled control renders and is inert.
  it("renders an uncontrolled Toggle that is click-safe", () => {
    render(<Toggle checked label="X" />);
    const sw = screen.getByRole("switch", { name: "X" });
    expect(() => sw.click()).not.toThrow();
    expect(sw.getAttribute("aria-checked")).toBe("true");
  });

  it("removes a read-only Slider from the D-pad focus order", () => {
    render(<Slider value={60} label="Volume" />);
    const input = screen.getByLabelText("Volume");
    expect(input.classList.contains("focusable")).toBe(false);
    expect(input.getAttribute("tabindex")).toBe("-1");
    expect(input.getAttribute("aria-readonly")).toBe("true");
  });

  it("keeps an interactive Slider focusable", () => {
    render(<Slider value={60} label="Volume" onChange={() => {}} />);
    const input = screen.getByLabelText("Volume");
    expect(input.classList.contains("focusable")).toBe(true);
    expect(input.hasAttribute("tabindex")).toBe(false);
    expect(input.hasAttribute("aria-readonly")).toBe(false);
  });
});

describe("Badge", () => {
  it("renders content and the accent tone", () => {
    const { container } = render(<Badge emphasis="accent">LIVE</Badge>);
    expect(screen.getByText("LIVE")).toBeTruthy();
    // Accent badges get the filled accent treatment.
    expect(
      container.firstElementChild?.classList.contains("btn-primary"),
    ).toBe(true);
  });
});
