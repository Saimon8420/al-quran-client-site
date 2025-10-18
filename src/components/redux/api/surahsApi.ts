import { quranBaseApi } from "./baseApi";
import type { Editions } from "./metaDataApi";

interface FullSurahs {
  number: number;
  edition?: string;
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

    // get full surahs with single editions
    getFullSurahs: builder.query<SurahDetail, FullSurahs>({
      query: (data: FullSurahs) => {
        return {
          url: `/surah/${data.number}/editions/${
            data?.edition || "quran-uthmani,en.asad,en.pickthall,en.walk"
          }`,
          method: "GET",
        };
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const modifyData = data?.data?.map((each) => {
            return each.ayahs.map((eachAyah, i) =>
              eachAyah.audio ? eachAyah.audio : eachAyah.text
            );
          });

          // console.log(modifyData);
          // console.log(data?.data);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(err.message);
          } else {
            console.error(String(err));
          }
        }
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
