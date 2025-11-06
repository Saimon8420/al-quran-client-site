import type { PageResponse } from "@/components/redux/api/quranSectionsApi";
import { Card } from "@/components/ui/card";
import SingleTranslationView from "@/components/ui/single-translation-view/single-translation-view";
import SurahHeader from "@/components/ui/surah-header/surah-header";

interface PageViewProps {
  data?: PageResponse;
}

const PageView = ({ data }: PageViewProps) => {
  if (!data) return null;

  const { ayahs, surahs, edition } = data;

  // Assuming surahs is an object with surah numbers as keys
  const surahArray = Object.values(surahs);

  return (
    <div className="space-y-4">
      <SurahHeader surah={surahArray[0]} />
      <div className="p-4 border rounded-md flex flex-col gap-2">
        <Card className="group hover:shadow-lg transition-shadow duration-300 ease-in-out">
          {ayahs.map((ayah, index) => (
            <SingleTranslationView
              translation={ayah}
              translationLength={ayahs.length}
              index={index}
              edition={edition}
              key={index}
            />
          ))}
        </Card>
      </div>
    </div>
  );
};

export default PageView;
