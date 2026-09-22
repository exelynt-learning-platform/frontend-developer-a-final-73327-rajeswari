import { validateEmployee } from "./validation";

describe("validateEmployee", () => {
  test("requires all fields", () => {
    const errors = validateEmployee({});
    expect(Object.keys(errors)).toHaveLength(6);
    expect(errors.name).toBe("This field is required.");
    expect(errors.email).toBe("This field is required.");
  });

  test("rejects invalid email", () => {
    const errors = validateEmployee({
      name: "Rajeswari",
      email: "wrong-email",
      mobile: "9876543210",
      country: "India",
      state: "Andhra Pradesh",
      district: "Kadapa"
    });
    expect(errors.email).toBe("Enter a valid email address.");
  });

  test("accepts valid employee data", () => {
    const errors = validateEmployee({
      name: "Rajeswari Pokala",
      email: "rajeswari@example.com",
      mobile: "9876543210",
      country: "India",
      state: "Andhra Pradesh",
      district: "Kadapa"
    });
    expect(errors).toEqual({});
  });
});