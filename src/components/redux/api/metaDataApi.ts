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

export interface MetaDataResponse {
  code: number;
  status: string;
  message: string;
  data: Record<string, unknown>;
}

export const metaDataApi = quranBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get metadata
    getMetaData: builder.query<MetaDataResponse, void>({
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
