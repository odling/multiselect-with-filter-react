import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tagTypes = ["Characters"];

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const api = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes,
});
