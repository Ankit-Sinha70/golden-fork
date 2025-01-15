// services/orderService.js

import axios from 'axios';

const baseURL = "https://golden-fork-backend.vercel.app"

export function authHeader() {
    const token = localStorage.getItem("token");
    return { authorization: token || "" };
  }
  

// Fetch orders
export const fetchOrders = async (params = { page: 1, limit: 10 }) => {
    const { page, limit } = params;
    const response = await axios.get(`${baseURL}/api/order/getOrders`, {
        headers: authHeader(),
        params: { page, limit },
    });
    return response.data;
};

// Update order status
export const updateOrderStatus = async (orderId, status) => {
    const response = await axios.put(`${baseURL}/api/order/getOrders`, {
        orderId,
        status,
    });
    return response.data;
};
