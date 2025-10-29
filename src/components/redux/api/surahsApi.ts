import {
  transFormAyahResponseData,
  transFormFullSurahResponseData,
  type TransformedAyah,
} from "@/lib/quranUtlis";
import { quranBaseApi } from "./baseApi";
import type { Editions } from "./metaDataApi";

interface FullSurahs {
  number: number;
  edition?: string;
}

// Shared Ayah/Verse structure
export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
  audio?: string;
}

// Surah-Summary
export interface SurahSummary {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: Ayah[];
  edition?: Editions;
}

// SurahDetail Interface
export interface SurahDetail {
  code: number;
  status: string;
  data: SurahSummary[];
}

interface VerseData {
  surah: number;
  ayah: number;
  edition?: string;
}

export interface MergedAyah extends Ayah {
  [key: string]: string | unknown;
}

export interface TransformedSurahResponse {
  surahInfo: Omit<SurahSummary, "ayahs" | "edition"> | null;
  ayahs: MergedAyah[];
}

// sajda info
export interface SajdaInfo {
  id: number;
  recommended: boolean;
  obligatory: boolean;
}

// raw ayah response item
export interface RawAyahItem {
  number: number;
  text: string;
  edition: Editions;
  surah: Omit<SurahSummary, "ayahs" | "edition"> | null;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: SajdaInfo | boolean;
  audio?: string;
  audioSecondary?: string[];
}

// main API response
export interface AyahApiResponse {
  code: number;
  status: string;
  data: RawAyahItem[];
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

    // get full surahs with multiple editions
    getFullSurahs: builder.query<TransformedSurahResponse, FullSurahs>({
      query: (data: FullSurahs) => {
        return {
          url: `/surah/${data.number}/editions/${
            data?.edition ||
            "quran-simple,en.sahih,bn.bengali,ar.abdurrahmaansudais"
          }`,
          method: "GET",
        };
      },

      // transformResponse runs automatically before data reaches the cache
      transformResponse: (data: SurahDetail) => {
        return transFormFullSurahResponseData(data);
      },
    }),

    // get a specific verse
    getSpecificAyah: builder.query<TransformedAyah, VerseData>({
      query: (data: VerseData) => {
        return {
          url: `/ayah/${data.surah}:${data.ayah}/editions/${
            data.edition ||
            "quran-simple,en.sahih,bn.bengali,ar.abdurrahmaansudais"
          }`,
          method: "GET",
        };
      },
      // transformResponse runs automatically before data reaches the cache
      transformResponse: (data: AyahApiResponse) => {
        return transFormAyahResponseData(data);
      },
    }),
  }),
});

export const {
  useGetAllSurahsQuery,
  useGetFullSurahsQuery,
  useGetSpecificAyahQuery,
} = surahsApi;
