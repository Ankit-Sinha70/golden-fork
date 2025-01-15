import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MenuService from "../service/MenuService";

// CREATE MENU ASYNC THUNK
export const createMenu = createAsyncThunk(
  "menu/createMenu",
  async (formData, thunkAPI) => {
    try {
      const response = await MenuService.createMenu(formData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// GET ALL MENUS ASYNC THUNK
export const getAllMenus = createAsyncThunk(
  "menu/getAllMenus",
  async (params, thunkAPI) => {
    try {
      const response = await MenuService.getAllMenus(params);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// GET MENU BY ID ASYNC THUNK
export const getMenuById = createAsyncThunk(
  "menu/getMenuById",
  async (id, thunkAPI) => {
    try {
      const response = await MenuService.getMenuById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// UPDATE MENU BY ID ASYNC THUNK
export const updateMenuById = createAsyncThunk(
  "menu/updateMenuById",
  async ({ id, values }, thunkAPI) => {
    try {
      const response = await MenuService.updateMenuById(id, values);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// DELETE MENU BY ID ASYNC THUNK
export const deleteMenuById = createAsyncThunk(
  "menu/deleteMenuById",
  async (id, thunkAPI) => {
    try {
      const response = await MenuService.deleteMenuById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ADD CATEGORY TO MENU ASYNC THUNK
export const addCategoryToMenu = createAsyncThunk(
  "menu/addCategoryToMenu",
  async ({ id, categoryId }, thunkAPI) => {
    try {
      const response = await MenuService.addCategoryToMenu(id, categoryId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// REMOVE CATEGORY FROM MENU ASYNC THUNK
export const removeCategoryFromMenu = createAsyncThunk(
  "menu/removeCategoryFromMenu",
  async ({ id, categoryId }, thunkAPI) => {
    try {
      const response = await MenuService.removeCategoryFromMenu(id, categoryId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Menu Slice
const menuSlice = createSlice({
  name: "menu",
  initialState: {
    loading: false,
    error: null,
    menus: [],
    menu: null,
    menuCrud: null,
    meta: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.menus.push(action.payload);
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getAllMenus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.menus = action.payload.menus;
        state.meta = action.payload.meta;
      })
      .addCase(getAllMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getMenuById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMenuById.fulfilled, (state, action) => {
        state.loading = false;
        state.menu = action.payload.menu;
        state.meta = action.payload.meta;
      })
      .addCase(getMenuById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateMenuById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMenuById.fulfilled, (state, action) => {
        state.loading = false;
        state.menuCrud = action.payload.menu
      })
      .addCase(updateMenuById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteMenuById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMenuById.fulfilled, (state, action) => {
        state.loading = false;
        state.menus = state.menus.filter(
          (menu) => menu._id !== action.payload.data._id
        );
      })
      .addCase(deleteMenuById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(addCategoryToMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategoryToMenu.fulfilled, (state, action) => {
        state.loading = false;
        const menu = state.menus.find(
          (menu) => menu._id === action.payload.data._id
        );
        if (menu) menu.categories = action.payload.data.categories;
      })
      .addCase(addCategoryToMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(removeCategoryFromMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCategoryFromMenu.fulfilled, (state, action) => {
        state.loading = false;
        const menu = state.menus.find(
          (menu) => menu._id === action.payload.data._id
        );
        if (menu) menu.categories = action.payload.data.categories;
      })
      .addCase(removeCategoryFromMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default menuSlice.reducer;
