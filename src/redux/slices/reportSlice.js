import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reportService from "../service/reportService";

const initialState = {
  users: [],
  currentPage: 1,
  pageSize: 10,
  loading: false,
  error: null,
  meta: {},
  success: false,
  csvDownloadLoading: false,
};

// Async thunk for fetching user reports
export const fetchUsersReport = createAsyncThunk(
  "report/fetchUsersReport",
  async ({ fromDate, toDate, page, limit }, thunkAPI) => {
    try {
      const data = await reportService.getUsersReport(
        fromDate,
        toDate,
        page,
        limit
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch reports"
      );
    }
  }
);

// Async thunk for downloading the CSV report
export const downloadCSVReport = createAsyncThunk(
  "report/downloadCSVReport",
  async ({ fromDate, toDate, reportType }, thunkAPI) => {
    try {
      const data = await reportService.downloadCSVReport(
        fromDate,
        toDate,
        reportType
      );
      const blob = new Blob([data], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${reportType}_report.csv`;
      link.click();
      return { success: true };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to download CSV"
      );
    }
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    resetReportState: (state) => {
        state.users = [];
        state.currentPage = 1;
        state.pageSize = 10;
        state.loading = false;
        state.error = null;
        state.meta = {};
        state.success = false;
        state.csvDownloadLoading = false;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersReport.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchUsersReport.fulfilled, (state, action) => {
        state.loading = false;
        state.success = false;
        state.users = action.payload;
        state.meta = action.payload.metadata;
      })
      .addCase(fetchUsersReport.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(downloadCSVReport.pending, (state) => {
        state.csvDownloadLoading = true;
      })
      .addCase(downloadCSVReport.fulfilled, (state) => {
        state.csvDownloadLoading = false;
      })
      .addCase(downloadCSVReport.rejected, (state, action) => {
        state.csvDownloadLoading = false;
        state.error = action.payload || "Failed to download CSV";
      });
  },
});

export const { resetReportState } = reportSlice.actions;

export default reportSlice.reducer;
