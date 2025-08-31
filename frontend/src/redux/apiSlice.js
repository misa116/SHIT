/*import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include', // 🔥🔥🔥 this is required for cookies to be sent
});

const apiSlice = createApi({
  baseQuery,
  tagTypes: [], // if you're using tags for caching
  endpoints: (builder) => ({}),
});

export default apiSlice;
*/





/*
// frontend/src/api/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./constants";

// Configure base query with credentials for cookies
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include", // 🔥 required to send cookies
  prepareHeaders: (headers, { getState }) => {
    // Grab token from Redux state
    const token = getState().auth.userInfo?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const apiSlice = createApi({
  baseQuery,
  tagTypes: [], // optional: you can add caching tags here
  endpoints: (builder) => ({}),
});

export default apiSlice;

*/



/*
// frontend/src/redux/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  // no cookies
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userInfo?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});

export default apiSlice;
*/


/*
// frontend/src/redux/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userInfo?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});

export default apiSlice;
*/



// frontend/src/redux/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./constants.js";

// Base query with cookies and optional token headers
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include", // ✅ important for cookies
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userInfo?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const apiSlice = createApi({
  baseQuery,
  tagTypes: [], // optional: can add caching tags here
  endpoints: () => ({}), // endpoints injected in feature slices like userApiSlice
});

export default apiSlice;
