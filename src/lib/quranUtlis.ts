import type {
  Ayah,
  AyahApiResponse,
  MergedAyah,
  SajdaInfo,
  SurahDetail,
  SurahSummary,
} from "@/components/redux/api/surahsApi";

interface DataProps {
  data: MergedAyah[] | undefined;
  surahNumber: number;
}

// Dynamically remove "Bismillah" if it appears
export const cleanedData = ({ data, surahNumber }: DataProps) => {
  if (!data) {
    return [];
  }
  if (surahNumber === 1) {
    return data;
  }
  return data.map((item: Ayah) => {
    const makingPattern = data[0].text.split(" ");
    const bismillahPattern = `${makingPattern[0]} ${makingPattern[1]} ${makingPattern[2]} ${makingPattern[3]}`;
    return {
      ...item,
      text: item.text.replace(bismillahPattern, "").trim(),
      text3: item.text.replace(bismillahPattern, "").trim(),
    };
  });
};

export const transFormFullSurahResponseData = (data: SurahDetail) => {
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
          Object.keys(ayahsMap[key]).filter((k) => k.startsWith("text")).length
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

  return { surahInfo, ayahs: merged };
};

// raw ayah response item
export interface TransformedAyah {
  number: number;
  text: string; // Arabic
  text1?: string; // English
  text2?: string; // Bengali
  audio?: string;
  audioSecondary?: string[];
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: SajdaInfo | boolean;
  surah: Omit<SurahSummary, "ayahs" | "edition"> | null;
  [key: `text${number}`]: string | undefined;
}

export const transFormAyahResponseData = (
  response: AyahApiResponse
): TransformedAyah => {
  const items = response.data;
  if (!items || items.length === 0) throw new Error("Empty ayah data");

  // base structure copied from the first non-audio edition
  const baseItem = items.find((i) => i.edition.format === "text") ?? items[0];

  const merged: TransformedAyah = {
    number: baseItem.number,
    text: baseItem.text, // first one → text
    numberInSurah: baseItem.numberInSurah,
    juz: baseItem.juz,
    manzil: baseItem.manzil,
    page: baseItem.page,
    ruku: baseItem.ruku,
    hizbQuarter: baseItem.hizbQuarter,
    sajda: baseItem.sajda,
    surah: baseItem.surah,
  };

  // index counter for text fields
  let textIndex = 0;

  for (const item of items) {
    if (item.edition.format === "audio") {
      merged.audio = item.audio;
      merged.audioSecondary = item.audioSecondary;
    } else {
      if (textIndex === 0) merged.text = item.text; // main text
      else merged[`text${textIndex}`] = item.text; // text1, text2, text3, etc.
      textIndex++;
    }
  }

  return merged;
};
