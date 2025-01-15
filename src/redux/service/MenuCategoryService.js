import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;

export function authHeader() {
  const token = localStorage.getItem("token");
  return { authorization: token || "" };
}

// Add Category
async function addCategory(formData) {
  try {
    const { data } = await axios.post(
      `${baseURL}/api/category/createCategory`,
      formData,
      {
        headers: { ...authHeader(), "Content-Type": "application/json" },
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to add category");
    }
    return data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message || e.message || "An error occurred"
    );
  }
}

// Get All Categories
async function getAllCategories({page, limit, categoryName, isActive}) {
  try {
    const params = {};
    if (categoryName) params.categoryName = categoryName;
    if (isActive) params.status = isActive;
    if (page) params.page = page;
    if (limit) params.limit = limit;
    const { data } = await axios.get(
      `${baseURL}/api/category/getAllCategories`,
      {
        headers: authHeader(),
        params
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch categories");
    }
    return data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message || e.message || "An error occurred"
    );
  }
}

// Get Category By ID
async function getCategoryById(id) {
  try {
    const { data } = await axios.get(
      `${baseURL}/api/category/getCategoryById/${id}`,
      {
        headers: authHeader(),
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch category");
    }
    return data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message || e.message || "An error occurred"
    );
  }
}

// Update Category By ID
async function updateCategoryById(id, formData) {
  try {
    const { data } = await axios.put(
      `${baseURL}/api/category/updateCategory/${id}`,
      formData,
      {
        headers: { ...authHeader(), "Content-Type": "application/json" },
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to update category");
    }
    return data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message || e.message || "An error occurred"
    );
  }
}

// Delete Category By ID
async function deleteCategoryById(id) {
  try {
    const { data } = await axios.delete(
      `${baseURL}/api/category/deleteCategory/${id}`,
      {
        headers: authHeader(),
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to delete category");
    }
    return data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message || e.message || "An error occurred"
    );
  }
}

// Add Multiple Category Items
async function addMultipleCategoryItems(payload) {
  try {
    const { data } = await axios.put(
      `${baseURL}/api/category/addMultipleCategoryItems`,
      { categoryId: payload?.categoryId, itemIds: payload?.itemIds },
      {
        headers: { ...authHeader(), "Content-Type": "application/json" },
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to add category items");
    }
    return data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message || e.message || "An error occurred"
    );
  }
}

// Remove Multiple Category Items
async function removeMultipleCategoryItems(id, items) {
  try {
    const { data } = await axios.put(
      `${baseURL}/api/category/removeMultipleCategoryItems/${id}`,
      { items },
      {
        headers: { ...authHeader(), "Content-Type": "application/json" },
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to remove category items");
    }
    return data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message || e.message || "An error occurred"
    );
  }
}

const CategoryService = {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  addMultipleCategoryItems,
  removeMultipleCategoryItems,
};

export default CategoryService;
