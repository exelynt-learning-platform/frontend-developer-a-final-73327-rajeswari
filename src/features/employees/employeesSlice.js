import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { employeeApi } from "../../api/api";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await employeeApi.getAll();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      return await employeeApi.getById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createEmployee = createAsyncThunk(
  "employees/create",
  async (employee, { rejectWithValue }) => {
    try {
      return await employeeApi.create(employee);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/update",
  async ({ id, employee }, { rejectWithValue }) => {
    try {
      return await employeeApi.update(id, employee);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id, { rejectWithValue }) => {
    try {
      await employeeApi.remove(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  saving: false,
  deletingId: null,
  searchLoading: false,
  searchResult: null,
  searchError: null,
  error: null,
  operationError: null
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    clearSearch(state) {
      state.searchResult = null;
      state.searchError = null;
    },
    clearOperationError(state) {
      state.operationError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to load employees.";
      })

      .addCase(fetchEmployeeById.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
        state.searchResult = null;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResult = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload || "Employee not found.";
      })

      .addCase(createEmployee.pending, (state) => {
        state.saving = true;
        state.operationError = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.saving = false;
        state.items.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.saving = false;
        state.operationError = action.payload || "Unable to create employee.";
      })

      .addCase(updateEmployee.pending, (state) => {
        state.saving = true;
        state.operationError = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.saving = false;
        const index = state.items.findIndex(
          (employee) => String(employee.id) === String(action.payload.id)
        );
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.saving = false;
        state.operationError = action.payload || "Unable to update employee.";
      })

      .addCase(deleteEmployee.pending, (state, action) => {
        state.deletingId = action.meta.arg;
        state.operationError = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.deletingId = null;
        state.items = state.items.filter(
          (employee) => String(employee.id) !== String(action.payload)
        );
        if (
          state.searchResult &&
          String(state.searchResult.id) === String(action.payload)
        ) {
          state.searchResult = null;
        }
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.deletingId = null;
        state.operationError = action.payload || "Unable to delete employee.";
      });
  }
});

export const { clearSearch, clearOperationError } = employeesSlice.actions;
export default employeesSlice.reducer;