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
      providesTags: ["meta"],
      async onQueryStarted(arg, { dispatch, getState, extra, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data?.data);
          console.log(Object.keys(data.data));
        } catch (error) {
          console.error(error);
        }
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
      providesTags: ["editions"],
    }),
  }),
});

export const { useGetMetaDataQuery, useGetEditionsDataQuery } = metaDataApi;
