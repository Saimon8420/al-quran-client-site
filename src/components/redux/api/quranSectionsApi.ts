import { quranBaseApi } from "./baseApi";
import type { Editions } from "./metaDataApi";
import type { Ayah } from "./surahsApi";

interface Query {
  number: number;
  edition?: string;
}
export interface PageResponse {
  ayahs: Ayah[];
  edition: Editions;
  number: number;
  surahs: object;
}
interface Response {
  code: number;
  status: string;
  data: PageResponse;
}

export const quranSectionsApi = quranBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get a juz
    getJuz: builder.query<Response, Query>({
      query: (data: Query) => {
        if (data.number < 1 || data.number > 30) {
          throw new Error("Juz number must be between 1 and 30");
        }
        return {
          url: `/juz/${data.number}/${data.edition || "quran-uthmani"}`,
        };
      },
    }),

    // get a manzil
    getManzil: builder.query<Response, Query>({
      query: (data: Query) => {
        if (data.number < 1 || data.number > 7) {
          throw new Error("Manzil number must be between 1 and 7");
        }
        return {
          url: `/manzil/${data.number}/${data.edition || "en.sahih"}`,
        };
      },
    }),

    // get a hizb
    getHizb: builder.query<Response, Query>({
      query: (data: Query) => {
        if (data.number < 1 || data.number > 240) {
          throw new Error("Hizb number must be between 1 and 240");
        }
        return {
          url: `/hizbQuarter/${data.number}/${data.edition || "quran-uthmani"}`,
        };
      },
    }),

    // get a page
    getPage: builder.query<Response, Query>({
      query: (data: Query) => {
        if (data.number < 1 || data.number > 604) {
          throw new Error("Page number must be between 1 and 604");
        }
        return {
          url: `/page/${data.number}/${data.edition || "quran-uthmani"}`,
        };
      },
    }),
  }),
});

export const {
  useGetJuzQuery,
  useGetHizbQuery,
  useGetManzilQuery,
  useGetPageQuery,
} = quranSectionsApi;
