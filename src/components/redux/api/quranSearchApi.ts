import { quranBaseApi } from "./baseApi";

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

export const quranSearchApi = quranBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSearchData: builder.query<SearchResponse, SearchQuery>({
      query: (data) => ({
        url: `/search/${data.query}/all/${data.edition || "en.sahih"}`,
        method: "GET",
      }),
      providesTags: ["search-text"],
    }),
  }),
});

export const { useGetSearchDataQuery } = quranSearchApi;
