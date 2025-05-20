import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

// Check for development or production environment
const isDevelopment = process.env.NODE_ENV === "development";

// If in development, use localhost, otherwise use the deployed server URL
const API_BASE_URL = isDevelopment
  ? "http://localhost:5001/api/v1"
  : "https://portfolio-server-5phtsv5ur-emtiaz-ahmed-13s-projects.vercel.app/api/v1";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["User", "projects", "blogs"],
  endpoints: () => ({}),
});
