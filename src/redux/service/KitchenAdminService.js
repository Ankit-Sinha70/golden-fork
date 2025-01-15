import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;

// Helper function to get the auth header
export function authHeader() {
  const token = localStorage.getItem("token");
  return { authorization: token || "" };
}

// FETCH AVAILABLE KITCHEN ADMINS
async function getAvailableKitchenAdmins() {
  try {
    const { data } = await axios.get(`${baseURL}/api/admin/availableKitchenAdmin`, {
      headers: authHeader(),
    });

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch kitchen admins");
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

// ASSIGN KITCHEN ADMIN (Example function, can be modified as needed)
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

const KitchenAdminService = {
  getAvailableKitchenAdmins,
  assignKitchenAdmin,
};

export default KitchenAdminService;
