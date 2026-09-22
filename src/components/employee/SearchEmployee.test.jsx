import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchEmployee from "./SearchEmployee";

describe("SearchEmployee", () => {
  test("calls search with the button", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(
      <SearchEmployee
        value="10"
        onChange={vi.fn()}
        onSearch={onSearch}
        onClear={vi.fn()}
        loading={false}
        result={null}
        error={null}
      />
    );

    await user.click(screen.getByRole("button", { name: "Search" }));
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  test("shows no employee message when search fails", () => {
    render(
      <SearchEmployee
        value="999"
        onChange={vi.fn()}
        onSearch={vi.fn()}
        onClear={vi.fn()}
        loading={false}
        result={null}
        error="Not found"
      />
    );

    expect(screen.getByText(/No employee found for ID/i)).toBeInTheDocument();
  });
});