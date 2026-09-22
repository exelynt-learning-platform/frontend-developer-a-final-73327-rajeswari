import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EmployeeForm from "./EmployeeForm";

describe("EmployeeForm", () => {
  const props = {
    open: true,
    employee: null,
    countries: [{ id: "IN", name: "India" }],
    saving: false,
    operationError: null,
    onClose: vi.fn(),
    onSubmit: vi.fn()
  };

  test("shows validation errors when submitted empty", async () => {
    const user = userEvent.setup();
    render(<EmployeeForm {...props} />);

    await user.click(screen.getByRole("button", { name: "Add Employee" }));

    expect(screen.getAllByText("This field is required.").length).toBeGreaterThan(0);
  });

  test("pre-populates edit values", () => {
    render(
      <EmployeeForm
        {...props}
        employee={{
          id: "1",
          name: "Existing User",
          email: "existing@example.com",
          mobile: "9876543210",
          country: "IN",
          state: "Andhra Pradesh",
          district: "Kadapa"
        }}
      />
    );

    expect(screen.getByDisplayValue("Existing User")).toBeInTheDocument();
    expect(screen.getByDisplayValue("existing@example.com")).toBeInTheDocument();
  });
});