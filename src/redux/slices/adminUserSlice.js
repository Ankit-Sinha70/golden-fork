import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminUserService from "../service/AdminUserService";
import AuthService from "../service/AuthService";

// CREATE ADMIN USER ASYNC THUNK
export const createAdminUser = createAsyncThunk(
  "adminUser/createAdminUser",
  async (userData, thunkAPI) => {
    try {
      const response = await AdminUserService.createAdminUser(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// GET ALL ADMIN USERS ASYNC THUNK
export const getAllAdminUsers = createAsyncThunk(
  "adminUser/getAllAdminUsers",
  async ({ role, name, status, page, limit }, thunkAPI) => {
    try {
      const response = await AdminUserService.getAllAdminUsers({
        role,
        name,
        status,
        page,
        limit,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// UPDATE ADMIN USER BY ID ASYNC THUNK
export const updateAdminUserById = createAsyncThunk(
  "adminUser/updateAdminUserById",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await AdminUserService.updateAdminUserById({
        id,
        formData,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// DELETE ADMIN USER BY ID ASYNC THUNK
export const deleteAdminUserById = createAsyncThunk(
  "adminUser/deleteAdminUserById",
  async (id, thunkAPI) => {
    try {
      const response = await AdminUserService.deleteAdminUserById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// CONFIRM TABLE RESERVATION ASYNC THUNK
export const confirmTableReservation = createAsyncThunk(
  "adminUser/confirmTableReservation",
  async (id, thunkAPI) => {
    try {
      const response = await AdminUserService.confirmTableReservation(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// CANCEL TABLE RESERVATION ASYNC THUNK
export const cancelTableReservation = createAsyncThunk(
  "adminUser/cancelTableReservation",
  async (id, thunkAPI) => {
    try {
      const response = await AdminUserService.cancelTableReservation(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserId = createAsyncThunk(
  "users/fetchUserId",
  async (id, thunkAPI) => {
    try {
      const response = await AuthService.getUserById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Admin User Slice
const adminUserSlice = createSlice({
  name: "adminUser",
  initialState: {
    loading: false,
    error: null,
    adminUsers: [],
    selectedAdminUser: null,
    meta: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAdminUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAdminUser.fulfilled, (state, action) => {
        state.loading = false;
        state.adminUsers.push(action.payload);
      })
      .addCase(createAdminUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getAllAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAdminUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.adminUsers = action.payload.users;
        state.meta = action.payload.meta;
      })
      .addCase(getAllAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAdminUser = action.payload.user;
      })
      .addCase(fetchUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateAdminUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdminUserById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.adminUsers.findIndex(
          (adminUser) => adminUser._id === action.payload.user._id
        );
        if (index !== -1) state.adminUsers[index] = action.payload.user;
      })
      .addCase(updateAdminUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteAdminUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAdminUserById.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        state.loading = false;
        state.adminUsers = state.adminUsers.filter(
          (adminUser) => adminUser._id !== deletedId
        );
      })
      .addCase(deleteAdminUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(confirmTableReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmTableReservation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(confirmTableReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(cancelTableReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelTableReservation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(cancelTableReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminUserSlice.reducer;
