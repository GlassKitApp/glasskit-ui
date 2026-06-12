import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
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

describe("focus memory", () => {
  // The engine's zero-size filter hides everything in jsdom; give every
  // element a real box so focusables() sees the tree. Focus memory restores
  // by index in D-pad order, so a uniform rect is enough.
  let origRect: typeof Element.prototype.getBoundingClientRect;
  beforeEach(() => {
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

  function MemHome() {
    const nav = useNavigator();
    return (
      <>
        <Button onClick={() => nav.push("detail")}>Row one</Button>
        <Button onClick={() => nav.push("detail")}>Row two</Button>
        <Button onClick={() => nav.push("detail")}>Row three</Button>
      </>
    );
  }

  it("pop returns the ring to the row that pushed, not the first row", async () => {
    const { getByText } = render(
      <Navigator
        screens={{
          home: () => <MemHome />,
          detail: () => <Button>Close</Button>,
        }}
        initial="home"
      />,
    );
    const rowTwo = getByText("Row two");
    act(() => rowTwo.focus());
    act(() => rowTwo.click()); // push records the focused index (1)
    await settle();
    expect(getByText("Close")).toBeTruthy();

    act(() => history.back()); // system back → pop → restore
    await settle();
    expect(document.activeElement?.textContent).toBe("Row two");
  });

  it("a fresh push still seeds the new screen's first focusable", async () => {
    const { getByText } = render(
      <Navigator
        screens={{
          home: () => <MemHome />,
          detail: () => <Button>Close</Button>,
        }}
        initial="home"
      />,
    );
    const rowThree = getByText("Row three");
    act(() => rowThree.focus());
    act(() => rowThree.click());
    await settle();
    expect(document.activeElement?.textContent).toBe("Close");
  });
});

describe("state restoration + URL paths", () => {
  it("restores a mid-flow stack from history.state after a remount (reload)", async () => {
    const screens = {
      home: () => <Home />,
      detail: (p?: unknown) => <Detail id={(p as { id?: number })?.id} />,
    };
    const first = render(<Navigator screens={screens} initial="home" />);
    act(() => screen.getByText("Open").click());
    await settle();
    expect(screen.getByText("Detail 42")).toBeTruthy();

    // "Reload": unmount the app; the history entry keeps gkStack.
    first.unmount();
    render(<Navigator screens={screens} initial="home" />);
    await settle();
    // Restored straight to the screen the wearer was on — params included.
    expect(screen.getByText("Detail 42")).toBeTruthy();

    act(() => history.back()); // and back still pops to home
    await settle();
    expect(screen.getByText("Home")).toBeTruthy();
  });

  it("mirrors pushes into the pathname when paths is set, and back restores it", async () => {
    const orig = location.pathname;
    const base = orig.replace(/\/$/, "");
    render(
      <Navigator
        screens={{
          home: () => <Home />,
          detail: () => <h2>Detail</h2>,
        }}
        initial="home"
        paths={{ detail: "detail" }}
      />,
    );
    act(() => screen.getByText("Open").click());
    await settle();
    expect(location.pathname).toBe(`${base}/detail`);

    act(() => history.back());
    await settle();
    expect(location.pathname).toBe(orig);
    expect(screen.getByText("Home")).toBeTruthy();
  });

  it("drops non-cloneable params from history.state but keeps the flow alive", async () => {
    function PushWithCallback() {
      const nav = useNavigator();
      return (
        <Button onClick={() => nav.push("detail", { onDone: () => {} })}>
          Open
        </Button>
      );
    }
    render(
      <Navigator
        screens={{
          home: () => <PushWithCallback />,
          detail: () => <h2>Detail</h2>,
        }}
        initial="home"
      />,
    );
    act(() => screen.getByText("Open").click());
    await settle();
    // The push itself works (params flow through React state)…
    expect(screen.getByText("Detail")).toBeTruthy();
    // …and history.state degraded to names-only instead of throwing.
    expect(history.state.gkStack).toEqual([
      { name: "home" },
      { name: "detail" },
    ]);
  });
});
