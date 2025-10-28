import type { Ayah, MergedAyah } from "@/components/redux/api/surahsApi";

// Dynamically remove "Bismillah" if it appears
export const cleanedData = (data: MergedAyah[] | undefined) => {
  if (!data) {
    return [];
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
