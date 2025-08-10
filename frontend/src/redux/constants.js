/*/// src/constants.js or src/constants/index.js

// 🔥 Use the environment variable for your base API URL
export const BASE_URL = process.env.REACT_APP_BASE_URL;

// API endpoint paths
export const USERS_URL = "/api/users";
export const PRODUCTS_URL = "/api/products";
export const ORDERS_URL = "/api/orders";
export const CATEGORY_URL = "/api/category";
export const UOM_URL = "/api/uom";
*/


// src/constants.js
export const BASE_URL =
  process.env.REACT_APP_BASE_URL || "https://godplease16.onrender.com";

export const USERS_URL = "/api/users";
export const PRODUCTS_URL = "/api/products";
export const ORDERS_URL = "/api/orders";
export const CATEGORY_URL = "/api/category";
export const UOM_URL = "/api/uom";
