import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Heading } from "@registry/ui/heading";
import { Launcher } from "@registry/ui/launcher";
import { Deck } from "@registry/ui/deck";
import { QuickReplyChips } from "@registry/ui/quick-reply-chips";

describe("Heading", () => {
  it("renders the title and optional eyebrow", () => {
    render(<Heading eyebrow="Workout">Morning Run</Heading>);
    expect(screen.getByRole("heading", { name: "Morning Run" })).toBeTruthy();
    expect(screen.getByText("Workout")).toBeTruthy();
  });
});

describe("Launcher", () => {
  it("renders a focusable card per app and fires onSelect", () => {
    const onSelect = vi.fn();
    render(
      <Launcher
        apps={[
          { id: "a", label: "Navigate", tagline: "320 m", onSelect },
          { id: "b", label: "Messages" },
        ]}
      />,
    );
    const cards = screen.getAllByRole("button");
    expect(cards).toHaveLength(2);
    expect(cards[0]!.classList.contains("focusable")).toBe(true);
    expect(screen.getByText("320 m")).toBeTruthy();
    screen.getByRole("button", { name: /Navigate/ }).click();
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});

describe("Deck", () => {
  it("shows the page at index with step dots", () => {
    const { container } = render(
      <Deck index={1}>
        <p>Page A</p>
        <p>Page B</p>
        <p>Page C</p>
      </Deck>,
    );
    expect(screen.getByText("Page B")).toBeTruthy();
    expect(screen.queryByText("Page A")).toBeNull();
    expect(container.querySelectorAll(".gk-step")).toHaveLength(3);
    expect(container.querySelectorAll(".gk-step--on")).toHaveLength(2); // index+1
  });

  it("clamps an out-of-range index", () => {
    render(
      <Deck index={9}>
        <p>One</p>
        <p>Two</p>
      </Deck>,
    );
    expect(screen.getByText("Two")).toBeTruthy();
    expect(screen.queryByText("One")).toBeNull();
  });

  it("omits step dots for a single page", () => {
    const { container } = render(
      <Deck index={0}>
        <p>Only</p>
      </Deck>,
    );
    expect(container.querySelector(".gk-step")).toBeNull();
  });
});

describe("QuickReplyChips", () => {
  it("renders a focusable chip per option and emits the reply", () => {
    const onSelect = vi.fn();
    render(
      <QuickReplyChips
        options={["On my way", "5 min", "Call me"]}
        onSelect={onSelect}
      />,
    );
    const chips = screen.getAllByRole("button");
    expect(chips).toHaveLength(3);
    expect(chips[0]!.classList.contains("focusable")).toBe(true);
    screen.getByRole("button", { name: "5 min" }).click();
    expect(onSelect).toHaveBeenCalledWith("5 min");
  });
});
