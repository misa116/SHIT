
/*
import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import categorySlice from "./categorySlice";


const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    products: productSlice,
    cart: cartSlice,
    category: categorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;

/*/
/*
import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import categorySlice from "./categorySlice"; // handles both categories & UOMs

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    products: productSlice,
    cart: cartSlice,
    category: categorySlice, // include category slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
*/



/*
// frontend/src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import categorySlice from "./categorySlice"; // handles categories & UOMs

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    products: productSlice,
    cart: cartSlice,
    category: categorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
*/

/*
// frontend/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";          // RTK Query base slice
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import categorySlice from "./categorySlice"; // handles categories & UOMs
import orderReducer from "./orderSlice";    // local slice

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,  // RTK Query slice
    auth: authSlice.reducer,
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    category: categorySlice.reducer,          // use updated categorySlice
    order: orderReducer,                       // local slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
*/


import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";           // ✅ RTK Query slice
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import categoryReducer from "./categorySlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // ✅ RTK Query reducer
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    category: categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // ✅ RTK Query middleware
  devTools: true,
});

export default store;
