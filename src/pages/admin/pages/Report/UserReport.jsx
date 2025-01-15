import DownloadIcon from "@mui/icons-material/Download";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularLoader from "../../../../components/CircularLoader/CircularLoader";
import TableComponent from "../../../../components/Table/Table";
import {
  downloadCSVReport,
  fetchUsersReport,
  resetReportState,
} from "../../../../redux/slices/reportSlice";
import "./UserReport.scss";

const UserReport = () => {
  const dispatch = useDispatch();
  const { users, currentPage, pageSize, loading, csvDownloadLoading } =
    useSelector((state) => state.report);

  const [dateRange, setDateRange] = useState({
    fromDate: "",
    toDate: "",
  });

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateReport = () => {
    if (!dateRange.fromDate || !dateRange.toDate) {
      alert("Please select a valid date range.");
      return;
    }

    dispatch(
      fetchUsersReport({
        fromDate: dateRange.fromDate,
        toDate: dateRange.toDate,
        page: currentPage,
        limit: pageSize,
      })
    );
  };

  const handlePageChange = (event, newPage) => {
    dispatch(
      fetchUsersReport({
        fromDate: dateRange.fromDate,
        toDate: dateRange.toDate,
        page: newPage + 1,
        limit: pageSize,
      })
    );
  };

  const handlePageSizeChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);

    dispatch(
      fetchUsersReport({
        fromDate: dateRange.fromDate,
        toDate: dateRange.toDate,
        page: 1,
        limit: newPageSize,
      })
    );
  };

  const handleDownloadCSV = () => {
    dispatch(
      downloadCSVReport({
        fromDate: dateRange.fromDate,
        toDate: dateRange.toDate,
        reportType: "users",
      })
    );
  };

  useEffect(() => {
    return () => {
      dispatch(resetReportState());
    };
  }, [dispatch]);

  return (
    <>
      <div className="pageTemplate">
        <div className="pageTemplate__head">
          <h1 className="headTitle">Sales Report</h1>
        </div>
        {loading ? (
          <CircularLoader />
        ) : (
          <Box sx={{ padding: 3 }}>
            {/* Custom Date Range Picker */}
            <Box className="date-range-picker">
              <label>
                From:
                <input
                  type="date"
                  name="fromDate"
                  value={dateRange.fromDate}
                  onChange={handleDateChange}
                />
              </label>
              <label>
                To:
                <input
                  type="date"
                  name="toDate"
                  value={dateRange.toDate}
                  onChange={handleDateChange}
                />
              </label>
            </Box>

            <Button
              className="PrimaryButton"
              variant="contained"
              onClick={handleGenerateReport}
              disabled={loading}
            >
              {loading ? "Loading..." : "Generate Report"}
            </Button>
            <Button
              className="PrimaryButton"
              variant="contained"
              onClick={handleDownloadCSV}
              disabled={csvDownloadLoading}
              startIcon={<DownloadIcon fontSize="inherit" />}
              sx={{ ml: 2 }}
            >
              {csvDownloadLoading ? "Downloading..." : "Download CSV"}
            </Button>
            <TableComponent UserReport={true} data={users} />

            {/* Pagination */}
            {/* <TablePagination
        component="div"
        count={meta.totalUsers}
        page={currentPage - 1}
        onPageChange={handlePageChange}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handlePageSizeChange}
        rowsPerPageOptions={[5, 10, 20]}
      /> */}
          </Box>
        )}
      </div>
    </>
  );
};

export default UserReport;
