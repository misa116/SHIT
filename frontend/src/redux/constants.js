// src/constants.js
export const BASE_URL =
  process.env.REACT_APP_BASE_URL || "http://localhost:5000"; 
// 👆 Default to local for dev, override in Netlify env vars

export const USERS_URL = `${BASE_URL}/api/users`;
export const PRODUCTS_URL = `${BASE_URL}/api/products`;
export const ORDERS_URL = `${BASE_URL}/api/orders`;
export const CATEGORY_URL = `${BASE_URL}/api/category`;
export const UOM_URL = `${BASE_URL}/api/uom`;


/*/
// src/constants.js
export const BASE_URL =
  process.env.REACT_APP_BASE_URL || "https://godplease16.onrender.com";

export const USERS_URL = "/api/users";
export const PRODUCTS_URL = "/api/products";
export const ORDERS_URL = "/api/orders";
export const CATEGORY_URL = "/api/category";
export const UOM_URL = "/api/uom";
*/