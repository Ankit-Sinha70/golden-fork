import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import KitchenService from "../service/KitchenService";

// CREATE KITCHEN ASYNC THUNK
export const createKitchen = createAsyncThunk(
  "kitchen/createKitchen",
  async (formData, thunkAPI) => {
    try {
      const response = await KitchenService.createKitchen(formData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// GET ALL KITCHENS ASYNC THUNK
export const getAllKitchens = createAsyncThunk(
  "kitchen/getAllKitchens",
  async ({ page, limit, name, isActive, withoutPagination }, thunkAPI) => {
    try {
      const response = await KitchenService.getAllKitchens({
        page,
        limit,
        name,
        isActive,
        withoutPagination
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// GET KITCHEN BY ID ASYNC THUNK
export const getKitchenById = createAsyncThunk(
  "kitchen/getKitchenById",
  async (id, thunkAPI) => {
    try {
      const response = await KitchenService.getKitchenById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// UPDATE KITCHEN BY ID ASYNC THUNK
export const updateKitchenById = createAsyncThunk(
  "kitchen/updateKitchenById",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await KitchenService.updateKitchenById(id, formData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// DELETE KITCHEN BY ID ASYNC THUNK
export const deleteKitchenById = createAsyncThunk(
  "kitchen/deleteKitchenById",
  async (id, thunkAPI) => {
    try {
      const response = await KitchenService.deleteKitchenById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ASSIGN KITCHEN ADMIN ASYNC THUNK
export const assignKitchenAdmin = createAsyncThunk(
  "kitchen/assignKitchenAdmin",
  async (formData, thunkAPI) => {
    try {
      const response = await KitchenService.assignKitchenAdmin(formData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Kitchen Slice
const kitchenSlice = createSlice({
  name: "kitchen",
  initialState: {
    loading: false,
    error: null,
    kitchens: null,
    kitchen: null,
    meta:{}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createKitchen.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createKitchen.fulfilled, (state, action) => {
        state.loading = false;
        state.kitchens.push(action.payload.kitchen);
      })
      .addCase(createKitchen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getAllKitchens.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllKitchens.fulfilled, (state, action) => {
        state.loading = false;
        state.kitchens = action.payload?.kitchens;
        state.meta = action.payload?.meta;
      })
      .addCase(getAllKitchens.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getKitchenById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getKitchenById.fulfilled, (state, action) => {
        state.loading = false;
        state.kitchen = action.payload.kitchen;
      })
      .addCase(getKitchenById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateKitchenById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateKitchenById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.kitchens.findIndex(
          (kitchen) => kitchen._id === action.payload.updatedKitchen._id
        );
        if (index !== -1) state.kitchens[index] = action.payload.updatedKitchen;
      })
      .addCase(updateKitchenById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteKitchenById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteKitchenById.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg;
        state.kitchens = state.kitchens.filter(
          (kitchen) => kitchen._id !== deletedId
        );
      })
      .addCase(deleteKitchenById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(assignKitchenAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignKitchenAdmin.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(assignKitchenAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default kitchenSlice.reducer;
