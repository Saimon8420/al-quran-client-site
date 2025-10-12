import { quranBaseApi } from "./baseApi";

interface AudioQuery {
  number: number;
  reciter?: string;
}

interface AudioVerseQuery extends Pick<AudioQuery, "reciter"> {
  surah: number;
  ayah: number;
}

export const quranAudioApi = quranBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get audio for a surah
    getAudioForSurah: builder.query<unknown, AudioQuery>({
      query: (data: AudioQuery) => {
        return {
          url: `/audio/surah/${data.number}?reciter=${
            data.reciter || "ar.alafasy"
          }`,
          method: "GET",
        };
      },
    }),

    // get audio for a single verse
    getAudioForVerse: builder.query<unknown, AudioVerseQuery>({
      query: (data: AudioVerseQuery) => {
        return {
          url: `/audio/verse/${data.surah}/${data.ayah}?reciter=${
            data.reciter || "ar.alafasy"
          }`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAudioForSurahQuery, useGetAudioForVerseQuery } =
  quranAudioApi;
