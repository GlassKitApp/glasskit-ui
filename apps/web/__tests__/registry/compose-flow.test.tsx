import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { useState } from "react";
import { ComposeFlow } from "@registry/ui/compose-flow";

/** jsdom's async history traversal — same settle as the navigator suite. */
const settle = () => act(() => new Promise((r) => setTimeout(r, 20)));

// Give every element a box so the focus engine's zero-size filter sees the
// tree (FocusScope seeds into the picker; close refocuses the field).
let origRect: typeof Element.prototype.getBoundingClientRect;
beforeEach(() => {
  history.replaceState(null, "");
  origRect = Element.prototype.getBoundingClientRect;
  Element.prototype.getBoundingClientRect = function () {
    return {
      left: 0,
      top: 0,
      width: 200,
      height: 40,
      right: 200,
      bottom: 40,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect;
  };
});
afterEach(() => {
  Element.prototype.getBoundingClientRect = origRect;
});

function Harness() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <ComposeFlow
      label="Reply"
      value={value}
      placeholder="Pinch to enter text"
      options={["On my way", "5 min", "Call me"]}
      pickerTitle="Quick replies"
      onChange={setValue}
    />
  );
}

describe("ComposeFlow", () => {
  it("activating the field opens the picker, seeded on the first option", async () => {
    render(<Harness />);
    act(() => screen.getByText("Pinch to enter text").click());
    expect(screen.getByText("Quick replies")).toBeTruthy();
    expect(document.activeElement?.textContent).toBe("On my way");
  });

  it("choosing writes the value back, closes, and refocuses the field", async () => {
    render(<Harness />);
    act(() => screen.getByText("Pinch to enter text").click());
    act(() => screen.getByText("5 min").click());
    await settle();
    // Back on the field view with the chosen value shown.
    expect(screen.getByText("5 min")).toBeTruthy();
    expect(screen.queryByText("Quick replies")).toBeNull();
    expect(
      (document.activeElement as HTMLElement)?.classList.contains(
        "gk-composefield",
      ),
    ).toBe(true);
  });

  it("the system back gesture closes the picker without choosing", async () => {
    const onChange = vi.fn();
    render(
      <ComposeFlow
        options={["A", "B"]}
        onChange={onChange}
        placeholder="Field"
      />,
    );
    act(() => screen.getByText("Field").click());
    expect(screen.getByText("A")).toBeTruthy();

    act(() => history.back()); // middle pinch
    await settle();
    expect(screen.queryByText("A")).toBeNull();
    expect(screen.getByText("Field")).toBeTruthy();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("Escape (desktop back) closes the picker and pops exactly one entry", async () => {
    render(<Harness />);
    const before = history.length;
    act(() => screen.getByText("Pinch to enter text").click());
    expect(history.state?.gkCompose).toBe(true);

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
      );
    });
    await settle();
    expect(screen.queryByText("Quick replies")).toBeNull();
    expect(history.state?.gkCompose).toBeUndefined();
    void before;
  });
});
