import type { Ayah, MergedAyah } from "@/components/redux/api/surahsApi";

// Dynamically remove "Bismillah" if it appears
export const cleanedData = (data: MergedAyah[]) => {
  return data.map((item: Ayah) => {
    const bismillahPattern = /^بِسْمِ.*?ٱلرَّحِيمِ[\s،]*?/u; // regex with Arabic diacritics safe
    return {
      ...item,
      text: item.text.replace(bismillahPattern, "").trim(),
    };
  });
};
