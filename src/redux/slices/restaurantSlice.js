import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RestaurantService from "../service/RestaurantService";

// CREATE RESTAURANT ASYNC THUNK
export const createRestaurant = createAsyncThunk(
  "restaurant/createRestaurant",
  async (formData, thunkAPI) => {
    try {
      const response = await RestaurantService.createRestaurant(formData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// GET ALL RESTAURANTS ASYNC THUNK
export const getAllRestaurants = createAsyncThunk(
  "restaurant/getAllRestaurants",
  async ({ page, limit, name, status, date, withoutPagination }, thunkAPI) => {
    try {
      const response = await RestaurantService.getAllRestaurants({
        name,
        status,
        page,
        limit,
        date,
        withoutPagination,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// GET RESTAURANT BY ID ASYNC THUNK
export const getRestaurantById = createAsyncThunk(
  "restaurant/getRestaurantById",
  async (id, thunkAPI) => {
    try {
      const response = await RestaurantService.getRestaurantById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// GET RESTAURANT BY ID ASYNC THUNK
export const availableResturantAdmin = createAsyncThunk(
  "restaurant/availableResturantAdmin",
  async (_, thunkAPI) => {
    try {
      const response = await RestaurantService.availableResturantAdmin();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// UPDATE RESTAURANT BY ID ASYNC THUNK
export const updateRestaurantById = createAsyncThunk(
  "restaurant/updateRestaurantById",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await RestaurantService.updateRestaurantById(
        id,
        formData
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// DELETE RESTAURANT BY ID ASYNC THUNK
export const deleteRestaurantById = createAsyncThunk(
  "restaurant/deleteRestaurantById",
  async (id, thunkAPI) => {
    try {
      const response = await RestaurantService.deleteRestaurantById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAvailableTables = createAsyncThunk(
  "restaurant/getAvailableTables",
  async (reservationDate, thunkAPI) => {
    try {
      const response = await RestaurantService.getAvailableTables(
        reservationDate
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Restaurant Slice
const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    loading: false,
    error: null,
    meta: {},
    restaurants: null,
    restaurant: null,
    createdRestaurant : [],
    availableTables: null,
    totalAvailableTableCount: null,
    availableResturantAdmin : null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRestaurant.fulfilled, (state, action) => {
        state.createdRestaurant?.push(action.payload.restaurant);
        state.loading = false;
      })
      .addCase(createRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getAllRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload?.restaurants;
        state.meta = action.payload?.meta;
      })
      .addCase(getAllRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getRestaurantById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRestaurantById.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurant = action.payload.restaurant;
      })
      .addCase(getRestaurantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      builder
      .addCase(availableResturantAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(availableResturantAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.availableResturantAdmin = action.payload.data;
      })
      .addCase(availableResturantAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateRestaurantById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRestaurantById.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurant = action.payload?.restaurant;
      })
      .addCase(updateRestaurantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteRestaurantById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRestaurantById.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg;
        state.restaurants = state.restaurants.filter(
          (restaurant) => restaurant._id !== deletedId
        );
      })
      .addCase(deleteRestaurantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getAvailableTables.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAvailableTables.fulfilled, (state, action) => {
        state.loading = false;
        state.availableTables = action.payload.availableSlots || [];
        state.totalAvailableTableCount =
          action.payload.totalAvailableTableCount || 0;
      })
      .addCase(getAvailableTables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default restaurantSlice.reducer;
