import { setMetaData, setTabList } from "../slices/metaSlice";
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
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            dispatch(
              setTabList(
                Object.keys(data.data).filter((key) => key !== "ayahs")
              )
            );
            dispatch(setMetaData(data.data));
          }
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
