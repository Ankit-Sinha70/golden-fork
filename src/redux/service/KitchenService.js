import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;

export function authHeader() {
  const token = localStorage.getItem("token");
  return { authorization: token || "" };
}

// CREATE KITCHEN
async function createKitchen(formData) {
  try {
    const { data } = await axios.post(
      `${baseURL}/api/kitchen/createKitchen`,
      formData,
      {
        headers: { ...authHeader() },
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to create kitchen");
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

// GET ALL KITCHENS
async function getAllKitchens({ page, limit, name, isActive, withoutPagination }) {
  try {
    const params = {};
    if (page) params.page = page;
    if (limit) params.limit = limit;
    if (name) params.name = name;
    if (isActive !== undefined && isActive !== null) {
      params.isActive = isActive;
    }
    if (withoutPagination) params.withoutPagination = withoutPagination

    const { data } = await axios.get(`${baseURL}/api/kitchen/getKitchens`, {
      headers: authHeader(),
      params,
    });

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch kitchens");
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

// GET KITCHEN BY ID
async function getKitchenById(id) {
  try {
    const { data } = await axios.get(
      `${baseURL}/api/kitchen/getKitchenById/${id}`,
      {
        headers: authHeader(),
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch kitchen");
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

// UPDATE KITCHEN BY ID
async function updateKitchenById(id, formData) {
  try {
    const { data } = await axios.put(
      `${baseURL}/api/kitchen/updateKitchen/${id}`,
      formData,
      {
        headers: { ...authHeader(), "Content-Type": "application/json" },
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to update kitchen");
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

// DELETE KITCHEN BY ID
async function deleteKitchenById(id) {
  try {
    const { data } = await axios.delete(
      `${baseURL}/api/kitchen/deleteKitchen/${id}`,
      {
        headers: authHeader(),
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to delete kitchen");
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

// ASSIGN KITCHEN ADMIN
async function assignKitchenAdmin(formData) {
  try {
    const { data } = await axios.post(
      `${baseURL}/api/kitchen/assignKitchenAdmin`,
      formData,
      {
        headers: { ...authHeader(), "Content-Type": "application/json" },
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to assign kitchen admin");
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

const KitchenService = {
  createKitchen,
  getAllKitchens,
  getKitchenById,
  updateKitchenById,
  deleteKitchenById,
  assignKitchenAdmin,
};

export default KitchenService;
