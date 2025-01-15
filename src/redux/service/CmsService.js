import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;

export function authHeader() {
  const token = localStorage.getItem("token");
  return { authorization: token || "" };
}

// GET ALL CMS PAGES
async function getAllCMSPages({
  page,
  limit,
  title,
  status,
  withoutPagination,
}) {
  try {
    const params = {};
    if (page) params.page = page;
    if (limit) params.limit = limit;
    if (title) params.title = title;
    if (status) params.status = status;
    if (withoutPagination) params.withoutPagination = withoutPagination;
    const { data } = await axios.get(`${baseURL}/api/cms/getAllCMSPages`, {
      headers: authHeader(),
      params,
    });

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch CMS pages");
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

// CREATE CMS PAGE
async function createCMSPage(formData) {
  try {
    const { data } = await axios.post(`${baseURL}/api/cms/createCMSPage`, formData, {
      headers: { ...authHeader(), "Content-Type": "application/json" },
    });

    if (!data.success) {
      throw new Error(data.message || "Failed to create CMS page");
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

// DELETE CMS PAGE
async function deleteCMSPage(pageId) {
  try {
    const { data } = await axios.delete(`${baseURL}/api/cms/deleteCMSPage/${pageId}`, {
      headers: authHeader(),
    });

    if (!data.success) {
      throw new Error(data.message || "Failed to delete CMS page");
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

// UPDATE CMS PAGE
async function updateCMSPage(pageId, formData) {
  try {
    const { data } = await axios.put(`${baseURL}/api/cms/updateCMSPage/${pageId}`, formData, {
      headers: { ...authHeader(), "Content-Type": "application/json" },
    });

    if (!data.success) {
      throw new Error(data.message || "Failed to update CMS page");
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


const CmsService = {
  getAllCMSPages,
  createCMSPage,
  deleteCMSPage,
  updateCMSPage
};

export default CmsService;
