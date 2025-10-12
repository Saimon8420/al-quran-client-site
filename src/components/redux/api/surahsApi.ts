import { quranBaseApi } from "./baseApi";
import type { Editions } from "./metaDataApi";

interface FullSurahs {
  number: number;
  edition?: string;
}

interface SurahSummary {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

// Shared Ayah/Verse structure
interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

interface SurahDetail extends SurahSummary {
  ayahs: Ayah[];
}

interface VerseData {
  surah: number;
  ayah: number;
  edition?: string;
}

interface VerseResponse extends Ayah {
  edition: Editions;
  surah: SurahSummary;
}

export const surahsApi = quranBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get list of all 114 surahs
    getAllSurahs: builder.query<SurahSummary[], void>({
      query: () => {
        return {
          url: "/surahs",
          method: "GET",
        };
      },
    }),

    // get full surahs
    getFullSurahs: builder.query<SurahDetail, FullSurahs>({
      query: (data: FullSurahs) => {
        return {
          url: `/surah/${data.number}?edition=${data?.edition || "en.sahih"}`,
          method: "GET",
        };
      },
    }),

    // get a specific verse
    getSpecificVerse: builder.query<VerseResponse, VerseData>({
      query: (data: VerseData) => {
        return {
          url: `/verse/${data.surah}/${data.ayah}?edition=${
            data.edition || "en.sahih"
          }`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetAllSurahsQuery,
  useGetFullSurahsQuery,
  useGetSpecificVerseQuery,
} = surahsApi;
