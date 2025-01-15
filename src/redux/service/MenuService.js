import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;

export function authHeader() {
  const token = localStorage.getItem("token");
  return { authorization: token || "" };
}

// CREATE MENU
async function createMenu(formData) {
  try {
    const { data } = await axios.post(
      `${baseURL}/api/menu/createMenu`,
      formData,
      {
        headers: authHeader(),
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to create menu");
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

// GET ALL MENUS
async function getAllMenus(params = {}) {
  try {
    const { data } = await axios.get(`${baseURL}/api/menu/getMenus`, {
      headers: authHeader(),
      params: params,
    });

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch menus");
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

// GET MENU BY ID
async function getMenuById(id) {
  try {
    const { data } = await axios.get(`${baseURL}/api/menu/getMenuById/${id}`, {
      headers: authHeader(),
    });

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch menu");
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

// UPDATE MENU BY ID
async function updateMenuById(id, values) {
  try {
    const { data } = await axios.put(
      `${baseURL}/api/menu/updateMenu/${id}`,
      values,
      {
        headers: { ...authHeader(), "Content-Type": "application/json" },
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to update menu");
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

// DELETE MENU BY ID
async function deleteMenuById(id) {
  try {
    const { data } = await axios.delete(
      `${baseURL}/api/menu/deleteMenu/${id}`,
      {
        headers: authHeader(),
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to delete menu");
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

// ADD CATEGORY TO MENU
async function addCategoryToMenu(id, categoryId) {
  try {
    const { data } = await axios.post(
      `${baseURL}/api/menu/addCategoriesToMenu/${id}`,
      { categoryId },
      {
        headers: authHeader(),
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to add category to menu");
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

// REMOVE CATEGORY FROM MENU
async function removeCategoryFromMenu(id, categoryId) {
  try {
    const { data } = await axios.post(
      `${baseURL}/api/menu/removeCategoriesFromMenu/${id}`,
      { categoryId },
      {
        headers: authHeader(),
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to remove category from menu");
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

const MenuService = {
  createMenu,
  getAllMenus,
  getMenuById,
  updateMenuById,
  deleteMenuById,
  addCategoryToMenu,
  removeCategoryFromMenu,
};

export default MenuService;
