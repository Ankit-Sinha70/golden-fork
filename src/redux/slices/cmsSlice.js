import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CmsService from "../service/CmsService";

// GET ALL CMS PAGES ASYNC THUNK
export const getAllCMSPages = createAsyncThunk(
  "cms/getAllCMSPages",
  async ({ page, limit, title, status, withoutPagination }, thunkAPI) => {
    try {
      const response = await CmsService.getAllCMSPages({
        page, limit, title, status, withoutPagination
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// CREATE CMS PAGE ASYNC THUNK
export const createCMSPage = createAsyncThunk(
    "cms/createCMSPage",
    async (formData, thunkAPI) => {
      try {
        const response = await CmsService.createCMSPage(formData);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  // Async thunk for deleting a CMS page
export const deleteCMSPage = createAsyncThunk(
    "cms/deleteCMSPage",
    async (pageId, { rejectWithValue }) => {
      try {
        const response = await CmsService.deleteCMSPage(pageId);
        return { pageId, ...response };
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  // Async Thunk to update CMS Page
export const updateCMSPage = createAsyncThunk(
    "cms/updateCMSPage",
    async ({ pageId, formData }, thunkAPI) => {
      try {
        const response = await CmsService.updateCMSPage(pageId, formData);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

// CMS Slice
const cmsSlice = createSlice({
  name: "cms",
  initialState: {
    loading: false,
    error: null,
    meta: {},
    cmsPages: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCMSPages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCMSPages.fulfilled, (state, action) => {
        state.loading = false;
        state.cmsPages = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(getAllCMSPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      builder
      .addCase(createCMSPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCMSPage.fulfilled, (state, action) => {
        state.loading = false;
        state.cmsPages.push(action.payload.data);
      })
      .addCase(createCMSPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      builder
      .addCase(deleteCMSPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCMSPage.fulfilled, (state, action) => {
        state.loading = false;
        state.cmsPages = state.cmsPages.filter(
          (page) => page._id !== action.payload.pageId
        );
      })
      .addCase(deleteCMSPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      builder
      .addCase(updateCMSPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCMSPage.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPage = action.payload;
        const index = state.cmsPages.findIndex((page) => page._id === updatedPage._id);
        if (index !== -1) {
          state.cmsPages[index] = updatedPage;
        }
      })
      .addCase(updateCMSPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cmsSlice.reducer;
