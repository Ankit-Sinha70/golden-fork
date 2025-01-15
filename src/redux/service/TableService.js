import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;

export function authHeader() {
  const token = localStorage.getItem("token");
  return { authorization: token || "" };
}

// CREATE TABLE
async function createTable(formData) {
  try {
    const { data } = await axios.post(
      `${baseURL}/api/table/createTable`,
      formData,
      {
        headers: { ...authHeader()},
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to create table");
    }
    return data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message ||
        e.response?.data?.Error ||
        e.message ||
        "An error occurred"
    );
  }
}

// GET ALL TABLES
async function getAllTables({
  page,
  limit,
  restaurantName,
  restaurantStatus,
}) {
  try {
    const params = {};
    if (page) params.page = page;
    if (limit) params.limit = limit;
    if (restaurantName) params.restaurantName = restaurantName;
    if (restaurantStatus !== null && restaurantStatus !== undefined) {
      params.restaurantStatus = restaurantStatus;
    }
    const { data } = await axios.get(`${baseURL}/api/table/getAllTables`, {
      headers: authHeader(),
      params
    });

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch tables");
    }
    return data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message ||
        e.response?.data?.Error ||
        e.message ||
        "An error occurred"
    );
  }
}

// GET TABLE BY ID
async function getTableById(id) {
  try {
    const { data } = await axios.get(
      `${baseURL}/api/table/getTableById/${id}`,
      {
        headers: authHeader(),
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch table");
    }
    return data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message ||
        e.response?.data?.Error ||
        e.message ||
        "An error occurred"
    );
  }
}

// UPDATE TABLE BY ID
async function updateTableById(id, formData) {
  try {
    const { data } = await axios.put(
      `${baseURL}/api/table/updateTable/${id}`, 
      formData,
      {
        headers: { ...authHeader() },
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to update table");
    }
    return data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message ||
        e.response?.data?.Error ||
        e.message ||
        "An error occurred"
    );
  }
}


// DELETE TABLE BY ID
async function deleteTableById(id) {
  try {
    const { data } = await axios.delete(
      `${baseURL}/api/table/deleteTable/${id}`,
      {
        headers: authHeader(),
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to delete table");
    }
    return data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message ||
        e.response?.data?.Error ||
        e.message ||
        "An error occurred"
    );
  }
}

const TableService = {
  createTable,
  getAllTables,
  getTableById,
  updateTableById,
  deleteTableById,
};

export default TableService;
