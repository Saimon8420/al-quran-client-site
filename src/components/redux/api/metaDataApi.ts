import { setEditionData } from "../slices/editionSlice";
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

export interface EditionsResponse {
  code: number;
  status: string;
  message: string;
  data: Editions[];
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
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(err.message);
          } else {
            console.error(String(err));
          }
        }
      },
    }),

    // get editions data
    getEditionsData: builder.query<EditionsResponse, void>({
      query: () => {
        return {
          url: "/edition",
          method: "GET",
        };
      },
      providesTags: ["editions"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.data) {
            const textFormat = data.data.filter(
              (each) => each.format === "text"
            );

            const arabicTextFormat = textFormat.filter(
              (each) => each.type === "quran"
            );

            const tafsirTextFormat = textFormat.filter(
              (each) => each.type === "tafsir"
            );

            const translationTextFormat = textFormat.filter(
              (each) => each.type === "translation"
            );

            const audioFormat = data.data.filter(
              (each) => each.format === "audio"
            );

            dispatch(
              setEditionData({
                tafsirTextFormat,
                translationTextFormat,
                audioFormat,
                arabicTextFormat,
              })
            );
          }
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(err.message);
          } else {
            console.error(String(err));
          }
        }
      },
    }),
  }),
});

export const { useGetMetaDataQuery, useGetEditionsDataQuery } = metaDataApi;
