import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MenuItemService from "../service/MenuItemService";

// CREATE MENU ITEM ASYNC THUNK
export const createMenuItem = createAsyncThunk(
  "menuItem/createMenuItem",
  async (newItemPayload, thunkAPI) => {
    try {
      const response = await MenuItemService.createMenuItem(newItemPayload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// GET ALL MENU ITEMS ASYNC THUNK
export const getAllMenuItems = createAsyncThunk(
  "menuItem/getAllMenuItems",
  async (_, thunkAPI) => {
    try {
      const response = await MenuItemService.getAllMenuItems();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// GET MENU ITEM BY ID ASYNC THUNK
export const getMenuItemById = createAsyncThunk(
  "menuItem/getMenuItemById",
  async (id, thunkAPI) => {
    try {
      const response = await MenuItemService.getMenuItemById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// UPDATE MENU ITEM BY ID ASYNC THUNK
export const updateMenuItemById = createAsyncThunk(
  "menuItem/updateMenuItemById",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await MenuItemService.updateMenuItemById(id, formData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// DELETE MENU ITEM BY ID ASYNC THUNK
export const deleteMenuItemById = createAsyncThunk(
  "menuItem/deleteMenuItemById",
  async (id, thunkAPI) => {
    try {
      const response = await MenuItemService.deleteMenuItemById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Menu Item Slice
const menuItemSlice = createSlice({
  name: "menuItem",
  initialState: {
    loading: false,
    error: null,
    meta: {},
    menuItems: [],
    menuItem: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMenuItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMenuItem.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.categoryItem) {
          state.menuItems?.push(action.payload.categoryItem); 
        } else {
          console.error("Invalid payload: ", action.payload);
        }
      })
      .addCase(createMenuItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getAllMenuItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMenuItems.fulfilled, (state, action) => {
        state.loading = false;
        state.menuItems = action.payload.categoryItems;
        state.meta = action?.payload?.meta;
      })
      .addCase(getAllMenuItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getMenuItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMenuItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.menuItem = action.payload.data;
      })
      .addCase(getMenuItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateMenuItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMenuItemById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.menuItems.findIndex(
          (menuItem) => menuItem._id === action.payload.data._id
        );
        if (index !== -1) state.menuItems[index] = action.payload.data;
      })
      .addCase(updateMenuItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteMenuItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMenuItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.menuItems = state.menuItems.filter(
          (menuItem) => menuItem._id !== action.payload.data._id
        );
      })
      .addCase(deleteMenuItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default menuItemSlice.reducer;
