import { employeeApi } from "./api";

describe("employeeApi", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  test("getAll calls the employee endpoint", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ id: "1", name: "Test User" }]
    });

    const result = await employeeApi.getAll();

    expect(fetch).toHaveBeenCalledWith(
      "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee",
      expect.objectContaining({ headers: { "Content-Type": "application/json" } })
    );
    expect(result).toEqual([{ id: "1", name: "Test User" }]);
  });

  test("throws a useful error for failed requests", async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ message: "Server error" })
    });

    await expect(employeeApi.getAll()).rejects.toThrow("Server error");
  });
});