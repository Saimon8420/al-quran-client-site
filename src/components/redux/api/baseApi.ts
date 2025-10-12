import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quranBaseApi = createApi({
  reducerPath: "quran-api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.BASE_URL }),
  tagTypes: [],
  endpoints: () => ({}),
});
