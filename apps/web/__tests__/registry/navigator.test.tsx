import { describe, it, expect, vi, beforeEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import {
  Navigator,
  useBackHandler,
  useNavigator,
} from "@registry/ui/navigator";
import { Button } from "@registry/ui/button";

/**
 * jsdom implements the History API including async traversal: history.back()
 * resolves across queued tasks and fires popstate — the same path the glasses
 * system back gesture takes (OS v125.1 pops history → popstate). The 20ms
 * settle outlasts jsdom's multi-task traversal queue.
 */
const settle = () => act(() => new Promise((r) => setTimeout(r, 20)));

function Home() {
  const nav = useNavigator();
  return (
    <>
      <h2>Home</h2>
      <Button onClick={() => nav.push("detail", { id: 42 })}>Open</Button>
    </>
  );
}

function Detail({ id }: { id?: number }) {
  const nav = useNavigator();
  return (
    <>
      <h2>Detail {id}</h2>
      <Button onClick={() => nav.push("deeper")}>Deeper</Button>
      <Button onClick={() => nav.pop()}>Back</Button>
    </>
  );
}

function GuardedScreen() {
  useBackHandler(() => true); // always consumes back
  return <h2>Guarded</h2>;
}

const SCREENS = {
  home: () => <Home />,
  detail: (params?: unknown) => <Detail {...(params as { id: number })} />,
  deeper: () => <h2>Deeper</h2>,
  guarded: () => <GuardedScreen />,
};

function renderNav() {
  return render(<Navigator screens={SCREENS} initial="home" />);
}

beforeEach(async () => {
  // Unwind any history entries a previous test pushed.
  history.replaceState(null, "");
});

describe("Navigator", () => {
  it("renders the root screen and pushes with params", () => {
    renderNav();
    expect(screen.getByText("Home")).toBeTruthy();
    act(() => screen.getByRole("button", { name: "Open" }).click());
    expect(screen.getByText("Detail 42")).toBeTruthy();
    expect(screen.queryByText("Home")).toBeNull(); // one screen at a time
  });

  it("pop() goes back through history (popstate path)", async () => {
    renderNav();
    act(() => screen.getByRole("button", { name: "Open" }).click());
    act(() => screen.getByRole("button", { name: "Back" }).click());
    await settle();
    expect(screen.getByText("Home")).toBeTruthy();
  });

  it("system back (history.back → popstate) pops one screen", async () => {
    renderNav();
    act(() => screen.getByRole("button", { name: "Open" }).click());
    act(() => screen.getByRole("button", { name: "Deeper" }).click());
    expect(screen.getByText("Deeper")).toBeTruthy();

    act(() => history.back());
    await settle();
    expect(screen.getByText("Detail 42")).toBeTruthy();

    act(() => history.back());
    await settle();
    expect(screen.getByText("Home")).toBeTruthy();
  });

  it("Escape (desktop simulator BACK) pops, and is inert at the root", async () => {
    renderNav();
    act(() => screen.getByRole("button", { name: "Open" }).click());

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });
    await settle();
    expect(screen.getByText("Home")).toBeTruthy();

    // At the root, Escape must NOT call history.back() — on-device the
    // gesture falls through to the system menu.
    const back = vi.spyOn(history, "back");
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });
    expect(back).not.toHaveBeenCalled();
    back.mockRestore();
  });

  it("a consuming back handler keeps the screen on system back", async () => {
    function GuardedHome() {
      const nav = useNavigator();
      return <Button onClick={() => nav.push("guarded")}>Guard</Button>;
    }
    render(
      <Navigator
        screens={{ ...SCREENS, home: () => <GuardedHome /> }}
        initial="home"
      />,
    );
    act(() => screen.getByRole("button", { name: "Guard" }).click());
    expect(screen.getByText("Guarded")).toBeTruthy();

    act(() => history.back());
    await settle();
    // Handler returned true → still on the guarded screen.
    expect(screen.getByText("Guarded")).toBeTruthy();
  });

  it("popToTop unwinds a deep stack to the root", async () => {
    function DeepRoot() {
      const nav = useNavigator();
      return (
        <>
          <h2>Root</h2>
          <Button onClick={() => nav.push("detail", { id: 1 })}>Open</Button>
        </>
      );
    }
    function PopAll() {
      const nav = useNavigator();
      return (
        <>
          <h2>Leaf</h2>
          <Button onClick={() => nav.popToTop()}>Top</Button>
        </>
      );
    }
    render(
      <Navigator
        screens={{
          home: () => <DeepRoot />,
          detail: () => <Detail id={1} />,
          deeper: () => <PopAll />,
        }}
        initial="home"
      />,
    );
    act(() => screen.getByRole("button", { name: "Open" }).click());
    act(() => screen.getByRole("button", { name: "Deeper" }).click());
    act(() => screen.getByRole("button", { name: "Top" }).click());
    await settle();
    expect(screen.getByText("Root")).toBeTruthy();
  });

  it("replace swaps the top without growing the stack", async () => {
    function Swapper() {
      const nav = useNavigator();
      return (
        <>
          <h2>Swapper</h2>
          <Button onClick={() => nav.replace("deeper")}>Swap</Button>
        </>
      );
    }
    render(
      <Navigator
        screens={{ ...SCREENS, detail: () => <Swapper /> }}
        initial="home"
      />,
    );
    act(() => screen.getByRole("button", { name: "Open" }).click());
    act(() => screen.getByRole("button", { name: "Swap" }).click());
    expect(screen.getByText("Deeper")).toBeTruthy();

    // One back lands on home — the swapped screen did not add an entry.
    act(() => history.back());
    await settle();
    expect(screen.getByText("Home")).toBeTruthy();
  });
});
