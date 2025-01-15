import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../service/AuthService";

// LOGIN ASYNC THUNK
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await AuthService.login(email, password);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// GOOGLE LOGIN ASYNC THUNK
export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (thunkAPI) => {
    try {
      const response = await AuthService.googleLogin();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// LOGOUT ASYNC THUNK
export const apiLogout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.apiLogout();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// FORGOT PASSWORD ASYNC THUNK
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    try {
      const response = await AuthService.forgotPassword(email);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// VERIFY PASSWORD ASYNC THUNK
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ otp, email }, thunkAPI) => {
    try {
      const response = await AuthService.verifyOTP(otp, email);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// RESET PASSWORD ASYNC THUNK
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ newPassword, confirmPassword, token }, thunkAPI) => {
    try {
      const response = await AuthService.resetPassword(
        newPassword,
        confirmPassword,
        token
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// REFRESH TOKEN ASYNC THUNK
export const refreshTokenThunk = createAsyncThunk(
  "auth/refreshToken",
  async (_, thunkAPI) => {
    try {
      const newToken = await AuthService.refreshToken();
      return newToken;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// FETCH USER BY ID
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id, thunkAPI) => {
    try {
      const response = await AuthService.getUserById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    login: null,
    loginUser: null,
    isAuthenticated: false,
    isRole: null,
    forgotPasswordSuccess: false,
    verifyPasswordSuccess: false,
    resetPasswordSuccess: false,
  },
  reducers: {
    logout: (state) => {
      AuthService.logout();
      state.login = null;
      state.isAuthenticated = false;
    },
    resetAuthStates: (state) => {
      state.forgotPasswordSuccess = false;
      state.verifyPasswordSuccess = false;
      state.resetPasswordSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN CASES
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.isRole = null;
        state.error = action.payload || "Login failed";
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isRole = null;
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isRole = action.payload.data.role;
        state.login = action.payload.data;
      });
    // GOOGLE LOGIN CASES
    builder
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.login = action.payload.data;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload || "Google login failed";
      });

    // LOGOUT CASES
    builder
      .addCase(apiLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(apiLogout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.login = null;
      })
      .addCase(apiLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
      });

    // FORGOT PASSWORD CASES
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.forgotPasswordSuccess = false;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.forgotPasswordSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Forgot password request failed";
      });

    // VERIFY PASSWORD OTP CASES
    builder
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.verifyPasswordSuccess = false;
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.loading = false;
        state.verifyPasswordSuccess = true;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "OTP verification failed";
      });

    // RESET PASSWORD CASES
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resetPasswordSuccess = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.resetPasswordSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Password reset failed";
      });
    // REFRESH TOKEN CASES
    builder
      .addCase(refreshTokenThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshTokenThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem("token", action.payload.accessToken);
      })
      .addCase(refreshTokenThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH USER BY ID
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.loginUser = action.payload.user;
        state.isRole = action.payload.user.role;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// EXPORT ACTIONS
export const { logout, resetAuthStates } = authSlice.actions;

// EXPORT REDUCER
export default authSlice.reducer;
