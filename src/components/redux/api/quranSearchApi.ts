import { setSearchOverView, type Surah } from "../slices/metaSlice";
import { quranBaseApi } from "./baseApi";
import type { Editions } from "./metaDataApi";

interface SearchQuery {
  query: string;
  edition?: string;
}

interface SearchResponse {
  code: number;
  status: string;
  data: {
    count: number;
    matches: Object[];
  };
}

interface ItemProps {
  edition: Editions;
  number: number;
  numberInSurah: number;
  surah: Surah;
  text: string;
}
interface Reference {
  surah: number;
  ayah: number;
}

export const quranSearchApi = quranBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSearchData: builder.query<SearchResponse, SearchQuery>({
      query: (data) => ({
        url: `/search/${data.query}/all/${data.edition || "en.sahih"}`,
        method: "GET",
      }),
      providesTags: ["search-text"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.matches) {
            const references: Reference[] | undefined = (
              data?.data?.matches as ItemProps[]
            )?.map((item): Reference => {
              const { numberInSurah, surah } = item;
              return { surah: surah.number, ayah: numberInSurah };
            });

            const searchOverView = {
              count: references.length,
              references,
            };
            dispatch(setSearchOverView(searchOverView));
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

export const { useGetSearchDataQuery } = quranSearchApi;
