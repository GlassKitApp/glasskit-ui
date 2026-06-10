import { describe, it, expect, vi } from "vitest";
import { act, render } from "@testing-library/react";
import { Deck } from "@registry/ui/deck";

async function swipe() {
  // Sync act commits the "swipe" render (and runs Deck's effect) BEFORE the
  // one-shot microtask clears it — an async act would batch set+clear into
  // one commit and the gesture would never be observable.
  act(() => {
    window.dispatchEvent(
      new CustomEvent("neuralband", { detail: { gesture: "swipe" } }),
    );
  });
  await act(async () => {}); // flush the one-shot clear
}

const pages = [<p key="1">one</p>, <p key="2">two</p>, <p key="3">three</p>];

describe("Deck uncontrolled (Neural Band)", () => {
  it("advances on swipe and clamps at the last page", async () => {
    const { container } = render(<Deck>{pages}</Deck>);
    const stage = container.querySelector(".gk-deck__stage")!;
    expect(stage.textContent).toBe("one");

    await swipe();
    expect(stage.textContent).toBe("two");

    await swipe(); // consecutive identical gestures both land (one-shot)
    expect(stage.textContent).toBe("three");

    await swipe(); // clamped — no wrap
    expect(stage.textContent).toBe("three");
  });

  it("starts at defaultIndex and reports advances", async () => {
    const onIndexChange = vi.fn();
    const { container } = render(
      <Deck defaultIndex={1} onIndexChange={onIndexChange}>
        {pages}
      </Deck>,
    );
    expect(container.querySelector(".gk-deck__stage")?.textContent).toBe("two");
    await swipe();
    expect(onIndexChange).toHaveBeenCalledWith(2);
  });

  it("ignores non-swipe gestures", async () => {
    const { container } = render(<Deck>{pages}</Deck>);
    act(() => {
      window.dispatchEvent(
        new CustomEvent("neuralband", { detail: { gesture: "pinch" } }),
      );
    });
    await act(async () => {});
    expect(container.querySelector(".gk-deck__stage")?.textContent).toBe("one");
  });
});

describe("Deck controlled", () => {
  it("never self-advances; swipes surface via onIndexChange", async () => {
    const onIndexChange = vi.fn();
    const { container } = render(
      <Deck index={0} onIndexChange={onIndexChange}>
        {pages}
      </Deck>,
    );
    const stage = container.querySelector(".gk-deck__stage")!;
    await swipe();
    expect(stage.textContent).toBe("one"); // parent owns the page
    expect(onIndexChange).toHaveBeenCalledWith(1);
  });

  it("labels the stage with the current page for AT", () => {
    const { container } = render(<Deck index={1}>{pages}</Deck>);
    expect(
      container.querySelector(".gk-deck__stage")?.getAttribute("aria-label"),
    ).toBe("Page 2 of 3");
  });
});
