/* import apiSlice from "./apiSlice";
import { ORDERS_URL } from "./constants";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}/create`,
        method: "POST",
        body: { ...order },
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/updatestock`,
        method: "PUT",
      }),
      keepUnusedDataFor: 5,
    }),

    deliverOrderProcur: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/deliver-dept/${orderId}`,
        method: "PUT",
      }),
      keepUnusedDataFor: 5,
    }),

     updateOrderRecieved: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/receive`,
        method: "PUT",
      }),
      keepUnusedDataFor: 5,
    }),


   deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: "DELETE",
      }),
      keepUnusedDataFor: 5,
    }),

    
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
  useDeliverOrderProcurMutation,
  useUpdateOrderRecievedMutation,
  useDeleteOrderMutation,
} = orderApiSlice;

*/

/*
import apiSlice from "./apiSlice";
import { ORDERS_URL } from "./constants";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}/`,
        method: "POST",
        body: { ...order },
      }),
    }),
    getMyOrders: builder.query({
      query: () => `${ORDERS_URL}/my`,
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => `${ORDERS_URL}/all`,
      keepUnusedDataFor: 5,
    }),
    getOrderDetails: builder.query({
      query: (orderId) => `${ORDERS_URL}/${orderId}`,
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),
    receiveOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/receive`,
        method: "PUT",
      }),
    }),
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
  useReceiveOrderMutation,
  useDeleteOrderMutation,
} = orderApiSlice;
*/


// frontend/redux/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
  useDeliverOrderProcurMutation,
  useUpdateOrderRecievedMutation,
  useDeleteOrderMutation,
} from "../api/orderApiSlice";

const initialState = {
  orderDetails: null,
  myOrders: [],
  allOrders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.orderDetails = null;
      state.myOrders = [];
      state.allOrders = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // You can add cases for pending/fulfilled/rejected if you want local state tracking
    // But if you rely fully on RTK Query hooks, you might not need many reducers here
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;

// Optional: you can export the hooks here for cleaner imports
export {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
  useDeliverOrderProcurMutation,
  useUpdateOrderRecievedMutation,
  useDeleteOrderMutation,
};
