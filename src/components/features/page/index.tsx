import type { PageResponse } from "@/components/redux/api/quranSectionsApi";
import SurahHeader from "@/components/ui/surah-header/surah-header";

interface PageViewProps {
  data: PageResponse; // Define your type here based on the API response
}

const PageView = ({ data }: PageViewProps) => {
  if (!data) return null;

  const { ayahs, surahs } = data;

  // Assuming surahs is an object with surah numbers as keys
  const surahArray = Object.values(surahs);

  return (
    <div className="space-y-4">
      <SurahHeader surah={surahArray[0]} />
      {ayahs.map((ayah) => (
        <div key={ayah.number} className="p-4 border rounded-md">
          <p className="text-4xl text-right leading-loose arabic-text">
            {ayah.text} [{ayah.numberInSurah}]
          </p>
        </div>
      ))}
    </div>
  );
};

export default PageView;
