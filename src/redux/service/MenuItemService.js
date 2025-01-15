import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;

export function authHeader() {
  const token = localStorage.getItem("token");
  return { authorization: token || "" };
}

// CREATE MENU ITEM
async function createMenuItem(newItemPayload) {
  try {
    const { data } = await axios.post(
      `${baseURL}/api/categoryItem/createCategoryItem`,
      newItemPayload,
      {
        headers: { ...authHeader(), "Content-Type": "application/json" },
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to create menu item");
    }
    return data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message ||
        e.response?.data?.Error ||
        e.message ||
        "An error occurred during menu item creation"
    );
  }
}

// GET ALL MENU ITEMS
async function getAllMenuItems() {
  try {
    const { data } = await axios.get(
      `${baseURL}/api/categoryItem/getCategoryItems`,
      {
        headers: authHeader(),
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch menu items");
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

// GET MENU ITEM BY ID
async function getMenuItemById(id) {
  try {
    const { data } = await axios.get(
      `${baseURL}/api/menuItem/getMenuItemById/${id}`,
      {
        headers: authHeader(),
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch menu item");
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

// UPDATE MENU ITEM BY ID
async function updateMenuItemById(id, formData) {
  try {
    const { data } = await axios.put(
      `${baseURL}/api/menuItem/updateMenuItem/${id}`,
      formData,
      {
        headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to update menu item");
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

// DELETE MENU ITEM BY ID
async function deleteMenuItemById(id) {
  try {
    const { data } = await axios.delete(
      `${baseURL}/api/menuItem/deleteMenuItem/${id}`,
      {
        headers: authHeader(),
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to delete menu item");
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

const MenuItemService = {
  createMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItemById,
  deleteMenuItemById,
};

export default MenuItemService;
