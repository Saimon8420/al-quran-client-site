import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quranBaseApi = createApi({
  reducerPath: "quran-api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BE_BASE_URL }),
  tagTypes: ["meta", "editions", "search-text"],
  endpoints: () => ({}),
});
