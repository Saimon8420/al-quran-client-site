import { quranBaseApi } from "./baseApi";

interface SearchQuery {
  query: string;
  edition?: string;
}

export const quranSearchApi = quranBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    // search is text editions
    getSearchData: builder.query<unknown, SearchQuery>({
      query: (data: SearchQuery) => {
        return {
          url: `/search?query=${data.query}&edition=${
            data.edition || "en.sahih"
          }`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetSearchDataQuery } = quranSearchApi;
