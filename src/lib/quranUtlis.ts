import type { Ayah, MergedAyah } from "@/components/redux/api/surahsApi";

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
