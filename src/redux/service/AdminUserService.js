import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;

export function authHeader() {
  const token = localStorage.getItem("token");
  return { authorization: token || "" };
}

// CREATE ADMIN USER
async function createAdminUser(body) {
  try {
    const { data } = await axios.post(
      `${baseURL}/api/admin/createUser`,
      body,
      {
        headers: {
          ...authHeader(),
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while creating the user"
    );
  }
}

// GET ALL ADMIN USERS
async function getAllAdminUsers({ role, name, status, page, limit }) {
  try {
    const params = {};
    if (role) params.role = role;
    if (name) params.name = name;
    if (status) params.status = status;
    if (page) params.page = page;
    if (limit) params.limit = limit;

    const { data } = await axios.get(`${baseURL}/api/admin/getAllUsers`, {
      headers: authHeader(),
      params,
    });

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch admin users");
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

// UPDATE ADMIN USER BY ID
async function updateAdminUserById({ id, formData }) {
  try {
    const { data } = await axios.put(
      `${baseURL}/api/admin/updateUser/${id}`,
      formData,
      {
        headers: {
          ...authHeader(),
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while updating the user"
    );
  }
}

// DELETE ADMIN USER BY ID
async function deleteAdminUserById(id) {
  try {
    const { data } = await axios.delete(
      `${baseURL}/api/admin/deleteUser/${id}`,
      {
        headers: authHeader(),
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to delete admin user");
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

// CONFIRM TABLE RESERVATION
async function confirmTableReservation(id) {
  try {
    const { data } = await axios.put(
      `${baseURL}/api/admin/confirmTableReservation/${id}`,
      {},
      {
        headers: authHeader(),
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to confirm table reservation");
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

// CANCEL TABLE RESERVATION
async function cancelTableReservation(id) {
  try {
    const { data } = await axios.put(
      `${baseURL}/api/reservation/cancelTableReservation/${id}`,
      {},
      {
        headers: authHeader(),
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to cancel table reservation");
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

const AdminUserService = {
  createAdminUser,
  getAllAdminUsers,
  updateAdminUserById,
  deleteAdminUserById,
  confirmTableReservation,
  cancelTableReservation,
};

export default AdminUserService;
