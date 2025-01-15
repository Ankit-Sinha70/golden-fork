import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;

export function authHeader() {
  const token = localStorage.getItem("token");
  return { authorization: token || "" };
}

// CREATE RESTAURANT
async function createRestaurant(formData) {
  try {
    const { data } = await axios.post(
      `${baseURL}/api/restaurant/createRestaurant`,
      formData,
      {
        headers: { ...authHeader(), "Content-Type": "application/json" },
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to create restaurant");
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

// GET ALL RESTAURANTS
async function getAllRestaurants({
  page,
  limit,
  name,
  status,
  date,
  withoutPagination,
}) {
  try {
    const params = {};
    if (page) params.page = page;
    if (limit) params.limit = limit;
    if (name) params.name = name;
    if (status !== null && status !== undefined) {
      params.status = status;
    }
    if (date) params.date = date;
    if (withoutPagination) params.withoutPagination = withoutPagination;
    const { data } = await axios.get(
      `${baseURL}/api/restaurant/getAllRestaurants`,
      {
        headers: authHeader(),
        params,
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch restaurants");
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

// GET RESTAURANT BY ID
async function getRestaurantById(id) {
  try {
    const { data } = await axios.get(
      `${baseURL}/api/restaurant/getRestaurantById/${id}`,
      {
        headers: authHeader(),
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch restaurant");
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

async function availableResturantAdmin() {
  try {
    const { data } = await axios.get(
      `${baseURL}/api/admin/availableRestaurantAdmin`,
      {
        headers: authHeader(),
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch restaurant");
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

// UPDATE RESTAURANT BY ID
async function updateRestaurantById(id, formData) {
  try {
    const { data } = await axios.put(
      `${baseURL}/api/restaurant/updateRestaurantById/${id}`,
      formData,
      {
        headers: authHeader(),
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to update restaurant");
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

// DELETE RESTAURANT BY ID
async function deleteRestaurantById(id) {
  try {
    const { data } = await axios.delete(
      `${baseURL}/api/restaurant/deleteRestaurantById/${id}`,
      {
        headers: authHeader(),
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to delete restaurant");
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

async function getAvailableTables(reservationDate) {
  try {
    const { data } = await axios.get(
      `${baseURL}/api/admin/getAvailableTableAndSlotsForAllRestaurants`,
      {
        params: { reservationDate }, // Pass the query parameters
        headers: authHeader(),
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch available tables");
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

const RestaurantService = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurantById,
  deleteRestaurantById,
  getAvailableTables,
  availableResturantAdmin,
};

export default RestaurantService;
