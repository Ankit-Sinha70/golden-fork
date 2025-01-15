// slices/orderSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrders, updateOrderStatus } from '../service/orderService';

const initialState = {
    orders: [],
    loading: false,
    error: null,
    meta: {
        totalOrders: 0,
        totalPages: 0,
        currentPage: 1,
        limit: 10,
    },
};

// Fetch orders thunk
export const fetchOrdersThunk = createAsyncThunk(
    'orders/fetchOrders',
    async (params, { rejectWithValue }) => {
        try {
            const data = await fetchOrders(params);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch orders');
        }
    }
);

// Update order status thunk
export const updateOrderStatusThunk = createAsyncThunk(
    'orders/updateOrderStatus',
    async ({ orderId, status }, { rejectWithValue }) => {
        try {
            const data = await updateOrderStatus(orderId, status);
            return { orderId, status, data };
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to update order status');
        }
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch orders
            .addCase(fetchOrdersThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.data;
                state.meta = action.payload.meta;
            })
            .addCase(fetchOrdersThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update order status
            .addCase(updateOrderStatusThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
                state.loading = false;
                const { orderId, status } = action.payload;
                const order = state.orders.find((order) => order._id === orderId);
                if (order) {
                    order.status = status;
                }
            })
            .addCase(updateOrderStatusThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default orderSlice.reducer;
