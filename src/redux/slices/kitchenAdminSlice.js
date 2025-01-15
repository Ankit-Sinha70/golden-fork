import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import KitchenAdminService from "../service/KitchenAdminService";

const initialState = {
  admins: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch available kitchen admins
export const fetchAvailableKitchenAdmins = createAsyncThunk(
  "kitchenAdmin/fetchAvailableKitchenAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await KitchenAdminService.getAvailableKitchenAdmins();
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const kitchenAdminSlice = createSlice({
  name: "kitchenAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableKitchenAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableKitchenAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload;
      })
      .addCase(fetchAvailableKitchenAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default kitchenAdminSlice.reducer;
