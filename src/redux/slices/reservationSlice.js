import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ReservationService from "../service/ReservationService";

// CREATE RESERVATION ASYNC THUNK
export const createReservation = createAsyncThunk(
  "reservation/createReservation",
  async (formData, thunkAPI) => {
    try {
      const response = await ReservationService.createReservation(formData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// GET ALL RESERVATIONS ASYNC THUNK
export const getAllReservations = createAsyncThunk(
  "reservation/getAllReservations",
  async (_, thunkAPI) => {
    try {
      const response = await ReservationService.getAllReservations();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// GET AVAILABLE SLOTS ASYNC THUNK
export const getAvailableSlots = createAsyncThunk(
  "reservation/getAvailableSlots",
  async ({ restaurantId, reservationDate, tableId }, thunkAPI) => {
    try {
      const response = await ReservationService.getAvailableSlots(
        restaurantId,
        reservationDate,
        tableId
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// UPDATE RESERVATION BY ID ASYNC THUNK
export const updateReservationById = createAsyncThunk(
  "reservation/updateReservationById",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await ReservationService.updateReservationById(
        id,
        formData
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// DELETE RESERVATION BY ID ASYNC THUNK
export const deleteReservationById = createAsyncThunk(
  "reservation/deleteReservationById",
  async (id, thunkAPI) => {
    try {
      const response = await ReservationService.deleteReservationById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Reservation Slice
const reservationSlice = createSlice({
  name: "reservation",
  initialState: {
    loading: false,
    error: null,
    reservations: [],
    availableSlots: [],
    reservation: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations.push(action.payload);
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getAllReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload.data;
      })
      .addCase(getAllReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getAvailableSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAvailableSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.availableSlots = action.payload.data;
      })
      .addCase(getAvailableSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateReservationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReservationById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.reservations.findIndex(
          (reservation) => reservation._id === action.payload.data._id
        );
        if (index !== -1) state.reservations[index] = action.payload.data;
      })
      .addCase(updateReservationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteReservationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReservationById.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = state.reservations.filter(
          (reservation) => reservation._id !== action.payload.data._id
        );
      })
      .addCase(deleteReservationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reservationSlice.reducer;
