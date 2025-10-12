import { quranBaseApi } from "./baseApi";

export interface Editions {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
  direction: string;
}

export const metaDataApi = quranBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get metadata
    getMetaData: builder.query<unknown, void>({
      query: () => {
        return {
          url: `/meta`,
          method: "GET",
        };
      },
    }),

    // get editions data
    getEditionsData: builder.query<Editions[], void>({
      query: () => {
        return {
          url: "/editions",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetMetaDataQuery, useGetEditionsDataQuery } = metaDataApi;
