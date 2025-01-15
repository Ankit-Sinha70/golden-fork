import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export function authHeader() {
  const token = localStorage.getItem("token");
  return { authorization: token || "" };
}

async function getUsersReport(fromDate, toDate, page = 1, limit = 10) {
  const { data } = await axios.get(`${BASE_URL}/api/report/getUsersReport`, {
    params: {
      fromDate,
      toDate,
      page,
      limit,
    },

    headers: { ...authHeader() },
  });
  return data.data;
}

// Function to trigger CSV download
async function downloadCSVReport(fromDate, toDate, reportType = "users") {
  const response = await axios.get(`${BASE_URL}/api/report/exportReportToCSV`, {
    params: {
      fromDate,
      toDate,
      reportType,
    },
    headers: { ...authHeader() },
    responseType: "blob",
  });
  return response.data;
}

const reportService = {
  getUsersReport,
  downloadCSVReport,
};

export default reportService;
