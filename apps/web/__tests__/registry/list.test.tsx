import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { List, ListRow } from "@registry/ui/list";

describe("List / ListRow", () => {
  it("renders rows as focusable buttons", () => {
    render(
      <List>
        <ListRow>Navigate</ListRow>
        <ListRow>Messages</ListRow>
      </List>,
    );
    const rows = screen.getAllByRole("button");
    expect(rows).toHaveLength(2);
    expect(rows[0]!.classList.contains("focusable")).toBe(true);
    expect(rows[0]!.classList.contains("gk-list-row")).toBe(true);
  });

  it("fires onClick and renders the trailing slot", () => {
    const onClick = vi.fn();
    render(
      <ListRow onClick={onClick} trailing="2">
        Messages
      </ListRow>,
    );
    const row = screen.getByRole("button", { name: /Messages/ });
    row.click();
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByText("2")).toBeTruthy();
  });

  it("omits the trailing wrapper when not provided", () => {
    const { container } = render(<ListRow>Plain</ListRow>);
    expect(container.querySelector(".gk-list-row__trailing")).toBeNull();
  });
});
