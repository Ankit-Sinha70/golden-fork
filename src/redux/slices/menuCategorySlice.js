import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoryService from "../service/MenuCategoryService";

// Add Category
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (formData, thunkAPI) => {
    try {
      const response = await CategoryService.addCategory(formData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get All Categories
export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async ({categoryName, page, limit, isActive}, thunkAPI) => {
    try {
      const response = await CategoryService.getAllCategories({
        categoryName, page, limit, isActive
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get Category By ID
export const getCategoryById = createAsyncThunk(
  "category/getCategoryById",
  async (id, thunkAPI) => {
    try {
      const response = await CategoryService.getCategoryById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update Category By ID
export const updateCategoryById = createAsyncThunk(
  "category/updateCategoryById",
  async ({ id, categoryPayload:formData }, thunkAPI) => {
    try {
      const response = await CategoryService.updateCategoryById(id, formData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete Category By ID
export const deleteCategoryById = createAsyncThunk(
  "category/deleteCategoryById",
  async (id, thunkAPI) => {
    try {
      const response = await CategoryService.deleteCategoryById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Add Multiple Category Items
export const addMultipleCategoryItems = createAsyncThunk(
  "category/addMultipleCategoryItems",
  async (payload, thunkAPI) => {
    try {
      const response = await CategoryService.addMultipleCategoryItems(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Remove Multiple Category Items
export const removeMultipleCategoryItems = createAsyncThunk(
  "category/removeMultipleCategoryItems",
  async ({ id, items }, thunkAPI) => {
    try {
      const response = await CategoryService.removeMultipleCategoryItems(
        id,
        items
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    CatLoading: false,
    error: null,
    categories: [],
    meta: {},
    selectedCategory: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.CatLoading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.CatLoading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.CatLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.CatLoading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
        state.CatLoading = false;
        state.meta = action.payload.meta;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.CatLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload.category;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          (category) => category._id === action.payload.category._id
        );
        if (index !== -1) state.categories[index] = action.payload.category;
      })
      .addCase(updateCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (category) => category._id !== action.meta.arg
        );
      })
      .addCase(deleteCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(addMultipleCategoryItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMultipleCategoryItems.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addMultipleCategoryItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(removeMultipleCategoryItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeMultipleCategoryItems.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeMultipleCategoryItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
