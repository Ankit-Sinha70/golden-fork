import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TableService from "../service/TableService";

// CREATE TABLE ASYNC THUNK
export const createTable = createAsyncThunk(
  "table/createTable",
  async (formData, thunkAPI) => {
    try {
      const response = await TableService.createTable(formData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// GET ALL TABLES ASYNC THUNK
export const getAllTables = createAsyncThunk(
  "table/getAllTables",
  async ({page, limit, restaurantName, restaurantStatus}, thunkAPI) => {
    try {
      const response = await TableService.getAllTables({page, limit, restaurantName, restaurantStatus});
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// GET TABLE BY ID ASYNC THUNK
export const getTableById = createAsyncThunk(
  "table/getTableById",
  async (id, thunkAPI) => {
    try {
      const response = await TableService.getTableById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// UPDATE TABLE BY ID ASYNC THUNK
export const updateTableById = createAsyncThunk(
  "table/updateTableById",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await TableService.updateTableById(id, formData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// DELETE TABLE BY ID ASYNC THUNK
export const deleteTableById = createAsyncThunk(
  "table/deleteTableById",
  async (id, thunkAPI) => {
    try {
      const response = await TableService.deleteTableById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Table Slice
const tableSlice = createSlice({
  name: "table",
  initialState: {
    loading: false,
    error: null,
    tables: [],
    meta:{},
    table: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTable.fulfilled, (state, action) => {
        state.loading = false;
        state.tables.push(action.payload);
      })
      .addCase(createTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getAllTables.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTables.fulfilled, (state, action) => {
        state.loading = false;
        state.tables = action.payload.tables;
        state.meta= action.payload.meta
      })
      .addCase(getAllTables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getTableById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTableById.fulfilled, (state, action) => {
        state.loading = false;
        state.table = action.payload.data;
      })
      .addCase(getTableById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateTableById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTableById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tables.findIndex(
          (table) => table?._id === action.payload.table?._id
        );
        if (index !== -1) state.tables[index] = action.payload.table;
      })
      .addCase(updateTableById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteTableById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTableById.fulfilled, (state, action) => {
        state.loading = false;
        state.tables = state.tables.filter(
          (table) => table._id !== action.payload.data._id
        );
      })
      .addCase(deleteTableById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tableSlice.reducer;
