    /* import apiSlice from "./apiSlice";
import { USERS_URL } from "./constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    listUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUserClr: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
            keepUnusedDataFor: 5,

    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useListUsersQuery,
  useUpdateUserClrMutation,
} = userApiSlice;

*/


/*
import apiSlice from "./apiSlice";
import { USERS_URL } from "./constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include", // ✅ send cookie
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
        credentials: "include", // ✅ send cookie
      }),
    }),
    listUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
        credentials: "include", // ✅ send cookie
      }),
      keepUnusedDataFor: 5,
    }),
    updateUserClr: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
        method: "PUT",
        body: data,
        credentials: "include", // ✅ send cookie
      }),
      keepUnusedDataFor: 5,
    }),
    checkLogin: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        credentials: "include", // ✅ send cookie
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useListUsersQuery,
  useUpdateUserClrMutation,
  useCheckLoginQuery, // ✅ hook for checking if logged in
} = userApiSlice;
*/



















/*
// frontend/src/api/userApiSlice.js
import apiSlice from "./apiSlice";
import { USERS_URL } from "./constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login endpoint
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include", // ✅ send cookie
      }),
    }),
    // Register endpoint
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
        credentials: "include", // ✅ send cookie
      }),
    }),
    // List all users (protected)
    listUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
        credentials: "include", // ✅ send cookie
      }),
      keepUnusedDataFor: 5,
    }),
    // Update user clearance (protected)
    updateUserClr: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
        method: "PUT",
        body: data,
        credentials: "include", // ✅ send cookie
      }),
      keepUnusedDataFor: 5,
    }),
    // Check if logged in (new endpoint)
    checkLogin: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        credentials: "include", // ✅ send cookie
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useListUsersQuery,
  useUpdateUserClrMutation,
  useCheckLoginQuery, // ✅ hook for checking login
} = userApiSlice;
*/



// frontend/src/redux/userApiSlice.js
import apiSlice from "./apiSlice";
import { USERS_URL } from "./constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    listUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUserClr: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useListUsersQuery,
  useUpdateUserClrMutation,
} = userApiSlice;
