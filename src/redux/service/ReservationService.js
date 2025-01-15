import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;

export function authHeader() {
  const token = localStorage.getItem("token");
  return { authorization: token || "" };
}

// CREATE RESERVATION
async function createReservation(formData) {
  try {
    const { data } = await axios.post(
      `${baseURL}/api/reservation/createReservation`,
      formData,
      {
        headers: { ...authHeader(), "Content-Type": "application/json" },
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to create reservation");
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

// GET ALL RESERVATIONS
async function getAllReservations() {
  try {
    const { data } = await axios.get(
      `${baseURL}/api/reservation/getAllReservations`,
      {
        headers: authHeader(),
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch reservations");
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

// GET AVAILABLE SLOTS
async function getAvailableSlots(restaurantId, reservationDate, tableId) {
  try {
    const { data } = await axios.get(
      `${baseURL}/api/reservation/getAvailableSlots`,
      {
        params: { restaurantId, reservationDate, tableId },
        headers: authHeader(),
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch available slots");
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

// UPDATE RESERVATION BY ID
async function updateReservationById(id, formData) {
  try {
    const { data } = await axios.put(
      `${baseURL}/api/reservation/updateReservation/${id}`,
      formData,
      {
        headers: { ...authHeader(), "Content-Type": "application/json" },
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to update reservation");
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

// DELETE RESERVATION BY ID
async function deleteReservationById(id) {
  try {
    const { data } = await axios.delete(
      `${baseURL}/api/reservation/deleteReservation/${id}`,
      {
        headers: authHeader(),
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to delete reservation");
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

const ReservationService = {
  createReservation,
  getAllReservations,
  getAvailableSlots,
  updateReservationById,
  deleteReservationById,
};

export default ReservationService;
