import reducer, {
  clearSearch,
  fetchEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from "./employeesSlice";

describe("employeesSlice", () => {
  test("clears search state", () => {
    const state = {
      items: [],
      searchResult: { id: "1" },
      searchError: "error"
    };
    const next = reducer(state, clearSearch());
    expect(next.searchResult).toBeNull();
    expect(next.searchError).toBeNull();
  });

  test("adds a created employee", () => {
    const state = {
      items: [],
      loading: false,
      saving: true,
      deletingId: null,
      searchLoading: false,
      searchResult: null,
      searchError: null,
      error: null,
      operationError: null
    };
    const next = reducer(state, createEmployee.fulfilled({ id: "2", name: "New User" }));
    expect(next.items).toHaveLength(1);
    expect(next.items[0].name).toBe("New User");
    expect(next.saving).toBe(false);
  });

  test("updates an existing employee", () => {
    const state = {
      items: [{ id: "1", name: "Old" }],
      saving: true,
      operationError: null
    };
    const next = reducer(
      state,
      updateEmployee.fulfilled({ id: "1", name: "Updated" })
    );
    expect(next.items[0].name).toBe("Updated");
  });

  test("removes an employee after delete", () => {
    const state = {
      items: [{ id: "1" }, { id: "2" }],
      deletingId: "1",
      searchResult: null
    };
    const next = reducer(state, deleteEmployee.fulfilled("1"));
    expect(next.items.map((item) => item.id)).toEqual(["2"]);
    expect(next.deletingId).toBeNull();
  });

  test("stores a searched employee", () => {
    const state = { searchLoading: true, searchResult: null, searchError: null };
    const next = reducer(state, fetchEmployeeById.fulfilled({ id: "7", name: "Found" }));
    expect(next.searchResult.name).toBe("Found");
    expect(next.searchLoading).toBe(false);
  });
});