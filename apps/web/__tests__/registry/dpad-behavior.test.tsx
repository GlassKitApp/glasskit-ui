import { describe, it, expect } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import {
  FocusScope,
  getFocusables,
  seedFocus,
  useDpad,
} from "@glasskit-ui/react";

/**
 * DOM-level focus-engine behavior. jsdom reports zero-size rects for
 * everything, so each element gets a hand-set getBoundingClientRect — which
 * also lets us lay out a real spatial scene.
 */

function setRect(
  el: Element,
  rect: { left: number; top: number; width: number; height: number },
) {
  (el as HTMLElement).getBoundingClientRect = () =>
    ({
      ...rect,
      right: rect.left + rect.width,
      bottom: rect.top + rect.height,
      x: rect.left,
      y: rect.top,
      toJSON: () => ({}),
    }) as DOMRect;
}

function Harness() {
  useDpad();
  return (
    <div>
      <button className="focusable" data-testid="above">
        Above
      </button>
      <input
        className="focusable"
        data-testid="range"
        type="range"
        min={0}
        max={100}
        defaultValue={50}
      />
      <button className="focusable" data-testid="below">
        Below
      </button>
    </div>
  );
}

function renderScene() {
  const utils = render(<Harness />);
  setRect(utils.getByTestId("above"), {
    left: 100,
    top: 100,
    width: 200,
    height: 40,
  });
  setRect(utils.getByTestId("range"), {
    left: 100,
    top: 200,
    width: 200,
    height: 40,
  });
  setRect(utils.getByTestId("below"), {
    left: 100,
    top: 300,
    width: 200,
    height: 40,
  });
  return utils;
}

describe("useDpad with a focused range input", () => {
  it("leaves ArrowLeft/Right to the range (no preventDefault, focus stays)", () => {
    const { getByTestId } = renderScene();
    const range = getByTestId("range") as HTMLInputElement;
    range.focus();

    // fireEvent returns false when preventDefault was called — the engine
    // must NOT consume the slider's own axis.
    expect(fireEvent.keyDown(window, { key: "ArrowRight" })).toBe(true);
    expect(document.activeElement).toBe(range);
    expect(fireEvent.keyDown(window, { key: "ArrowLeft" })).toBe(true);
    expect(document.activeElement).toBe(range);
  });

  it("still navigates away on ArrowUp/Down (the watch/TV convention)", () => {
    const { getByTestId } = renderScene();
    (getByTestId("range") as HTMLInputElement).focus();

    expect(fireEvent.keyDown(window, { key: "ArrowUp" })).toBe(false);
    expect(document.activeElement).toBe(getByTestId("above"));
  });

  it("consumes horizontal arrows on non-range elements as usual", () => {
    const { getByTestId } = renderScene();
    (getByTestId("above") as HTMLButtonElement).focus();

    // No candidate to the right → focus stays, but the key is still owned
    // by the engine (prevented), not leaked to the page.
    expect(fireEvent.keyDown(window, { key: "ArrowRight" })).toBe(false);
  });
});

describe("zero-size focusables", () => {
  it("seedFocus skips collapsed elements and lands on the first visible one", () => {
    const { getByTestId } = renderScene();
    // "above" collapses (e.g. a display:none page) — zero rect.
    setRect(getByTestId("above"), { left: 0, top: 0, width: 0, height: 0 });

    seedFocus();
    expect(document.activeElement).toBe(getByTestId("range"));
  });

  it("spatial navigation never routes focus to an invisible element", () => {
    const { getByTestId } = renderScene();
    setRect(getByTestId("below"), { left: 0, top: 0, width: 0, height: 0 });
    (getByTestId("range") as HTMLInputElement).focus();

    fireEvent.keyDown(window, { key: "ArrowDown" });
    // "below" is gone from the candidate set — focus stays put.
    expect(document.activeElement).toBe(getByTestId("range"));
  });
});

describe("data-autofocus", () => {
  it("seedFocus prefers the marked element over DOM order", () => {
    const { getByTestId } = render(
      <div>
        <button className="focusable" data-testid="first">
          First
        </button>
        <button className="focusable" data-autofocus data-testid="marked">
          Marked
        </button>
      </div>,
    );
    setRect(getByTestId("first"), { left: 0, top: 0, width: 100, height: 40 });
    setRect(getByTestId("marked"), {
      left: 0,
      top: 60,
      width: 100,
      height: 40,
    });

    seedFocus();
    expect(document.activeElement).toBe(getByTestId("marked"));
  });
});

describe("FocusScope", () => {
  it("contains navigation, then restores focus on unmount", () => {
    function Dpad() {
      useDpad();
      return null;
    }
    function App({ open }: { open: boolean }) {
      return (
        <div>
          <Dpad />
          <button className="focusable" data-testid="outside">
            Outside
          </button>
          {open ? (
            <FocusScope>
              <button className="focusable" data-testid="in-a">
                A
              </button>
              <button className="focusable" data-testid="in-b">
                B
              </button>
            </FocusScope>
          ) : null}
        </div>
      );
    }
    const { getByTestId, rerender } = render(<App open={false} />);
    const outside = getByTestId("outside");
    setRect(outside, { left: 0, top: 0, width: 100, height: 40 });
    outside.focus();

    rerender(<App open />);
    setRect(getByTestId("in-a"), { left: 0, top: 100, width: 100, height: 40 });
    setRect(getByTestId("in-b"), { left: 0, top: 160, width: 100, height: 40 });
    // Mounting the scope seeded focus inside it... but the seed ran before
    // rects were set (zero-size in jsdom), so seed explicitly now.
    seedFocus();
    expect(document.activeElement).toBe(getByTestId("in-a"));

    // getFocusables honors the scope: the outside button is invisible to it.
    expect(getFocusables()).toEqual([getByTestId("in-a"), getByTestId("in-b")]);

    // Arrows can't escape the scope: "outside" is above, but ArrowUp from A
    // finds no candidate inside the scope and stays put.
    fireEvent.keyDown(window, { key: "ArrowUp" });
    expect(document.activeElement).toBe(getByTestId("in-a"));
    fireEvent.keyDown(window, { key: "ArrowDown" });
    expect(document.activeElement).toBe(getByTestId("in-b"));

    // Unmounting the scope returns the ring to the opener.
    rerender(<App open={false} />);
    expect(document.activeElement).toBe(outside);
  });
});
