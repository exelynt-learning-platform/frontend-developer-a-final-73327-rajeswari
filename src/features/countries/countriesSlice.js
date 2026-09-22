import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { countryApi } from "../../api/api";

export const fetchCountries = createAsyncThunk(
  "countries/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await countryApi.getAll();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to load countries.";
      });
  }
});

export default countriesSlice.reducer;