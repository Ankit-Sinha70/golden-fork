import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ContactUsService from "../service/ContactUsService";

// ASYNC THUNKS

export const getAllContactUs = createAsyncThunk(
  "contactUs/getAllContactUs",
  async ({page, limit, name,}, thunkAPI) => {
    try {
      const response = await ContactUsService.getAllContactUs({
        page, limit, name
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getContactUsById = createAsyncThunk(
  "contactUs/getContactUsById",
  async (id, thunkAPI) => {
    try {
      const response = await ContactUsService.getContactUsById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContactUsById = createAsyncThunk(
  "contactUs/deleteContactUsById",
  async (id, thunkAPI) => {
    try {
      const response = await ContactUsService.deleteContactUsById(id);
      return { response };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const sendReply = createAsyncThunk(
  "contactUs/sendReply",
  async ({ id, sendReply }, thunkAPI) => {
    try {
      const response = await ContactUsService.sendReply(id, sendReply);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllSentReplies = createAsyncThunk(
  "contactUs/getAllSentReplies",
  async (_, thunkAPI) => {
    try {
      const response = await ContactUsService.getAllSentReplies();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getInquiriesWithoutSendReply = createAsyncThunk(
  "contactUs/getInquiriesWithoutSendReply",
  async (_, thunkAPI) => {
    try {
      const response = await ContactUsService.getInquiriesWithoutSendReply();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getSentReplyById = createAsyncThunk(
  "contactUs/getSentReplyById",
  async (id, thunkAPI) => {
    try {
      const response = await ContactUsService.getSentReplyById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// SLICE
const contactUsSlice = createSlice({
  name: "contactUs",
  initialState: {
    loading: false,
    error: null,
    contactUsList: [],
    contactUsDetails: null,
    sentReplies: [],
    inquiriesWithoutReply: [],
    sentReplyDetails: null,
    meta: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllContactUs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllContactUs.fulfilled, (state, action) => {
        state.loading = false;
        state.contactUsList = action?.payload?.contactUs;
        state.meta = action?.payload?.meta;
      })
      .addCase(getAllContactUs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getContactUsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getContactUsById.fulfilled, (state, action) => {
        state.loading = false;
        state.contactUsDetails = action.payload;
      })
      .addCase(getContactUsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteContactUsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteContactUsById.fulfilled, (state, action) => {
        state.loading = false;
        state.contactUsList = state.contactUsList.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deleteContactUsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendReply.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendReply.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllSentReplies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSentReplies.fulfilled, (state, action) => {
        state.loading = false;
        state.sentReplies = action.payload;
      })
      .addCase(getAllSentReplies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getInquiriesWithoutSendReply.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInquiriesWithoutSendReply.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiriesWithoutReply = action.payload;
      })
      .addCase(getInquiriesWithoutSendReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSentReplyById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSentReplyById.fulfilled, (state, action) => {
        state.loading = false;
        state.sentReplyDetails = action.payload;
      })
      .addCase(getSentReplyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default contactUsSlice.reducer;
