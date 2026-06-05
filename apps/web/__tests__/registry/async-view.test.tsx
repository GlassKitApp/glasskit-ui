import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AsyncView } from "@registry/ui/async-view";

describe("AsyncView", () => {
  it("renders only children on success (no wrapper)", () => {
    const { container } = render(
      <AsyncView status="success">
        <p>data</p>
      </AsyncView>,
    );
    expect(screen.getByText("data")).toBeTruthy();
    expect(container.querySelector(".gk-async")).toBeNull();
  });

  it("shows the default Spinner while loading and marks aria-busy", () => {
    const { container } = render(<AsyncView status="loading">x</AsyncView>);
    const status = screen.getByRole("status");
    expect(status.getAttribute("aria-busy")).toBe("true");
    expect(container.querySelector(".gk-spinner")).not.toBeNull();
  });

  it("renders the default error label on error", () => {
    render(
      <AsyncView status="error" errorLabel="Nope">
        x
      </AsyncView>,
    );
    expect(screen.getByText("Nope")).toBeTruthy();
  });

  it("prefers a custom slot over the default", () => {
    const { container } = render(
      <AsyncView status="loading" loading={<i data-testid="custom" />}>
        x
      </AsyncView>,
    );
    expect(screen.getByTestId("custom")).toBeTruthy();
    expect(container.querySelector(".gk-spinner")).toBeNull();
  });

  it("renders the placeholder when idle", () => {
    render(
      <AsyncView status="idle" placeholder={<p>waiting</p>}>
        x
      </AsyncView>,
    );
    expect(screen.getByText("waiting")).toBeTruthy();
  });
});
