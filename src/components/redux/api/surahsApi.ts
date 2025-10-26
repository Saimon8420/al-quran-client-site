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
interface SurahSummary {
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
interface SurahDetail {
  code: number;
  status: string;
  data: SurahSummary[];
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

export interface MergedAyah extends Ayah {
  [key: string]: string | unknown;
}

export interface TransformedSurahResponse {
  surahInfo: Omit<SurahSummary, "ayahs" | "edition"> | null;
  ayahs: MergedAyah[];
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
            data?.edition || "quran-simple,en.asad,en.pickthall,en.walk"
          }`,
          method: "GET",
        };
      },

      // ✅ transformResponse runs automatically before data reaches the cache
      transformResponse: (data: SurahDetail) => {
        if (!data.data || data.data.length === 0) {
          return { surahInfo: null, ayahs: [] };
        }

        const ayahsMap: { [key: number]: MergedAyah } = {};

        for (const surahEdition of data.data) {
          for (const ayah of surahEdition.ayahs) {
            const key = ayah.number; // Using absolute ayah number as in original
            if (!ayahsMap[key]) {
              ayahsMap[key] = { ...ayah };
            } else {
              const textKey = `text${
                Object.keys(ayahsMap[key]).filter((k) => k.startsWith("text"))
                  .length
              }`;
              ayahsMap[key][textKey] = ayah.text;
            }
            // Prioritize audio from any edition that provides it
            if (ayah.audio) {
              ayahsMap[key].audio = ayah.audio;
            }
          }
        }

        const merged = Object.values(ayahsMap);
        // Extract surah info from the first edition, excluding ayahs and edition details
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { ayahs, edition, ...surahInfo } = data.data[0];

        return { surahInfo, ayahs: merged }; // ✅ This becomes your query's data
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
