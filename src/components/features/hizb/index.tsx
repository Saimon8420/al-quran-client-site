import type { Editions } from "@/components/redux/api/metaDataApi";
import type { Ayah, SurahSummary } from "@/components/redux/api/surahsApi";
import type { PageResponse as HizbResponse } from "@/components/redux/api/quranSectionsApi";
import SurahHeader from "@/components/ui/surah-header/surah-header";
import { Card } from "@/components/ui/card";
import SingleTranslationView from "@/components/ui/single-translation-view/single-translation-view";

interface HizbViewProps {
  data: HizbResponse;
}

interface HizbAyah extends Ayah {
  surah: SurahSummary;
}

interface ProcessDataAyah {
  edition: Editions;
  ayahs: Ayah[];
  surah: SurahSummary;
}

const HizbView = ({ data }: HizbViewProps) => {
  // to get surah header
  const surahs = Object.values(data.surahs);

  // process data to group ayahs by surah
  const processedData: ProcessDataAyah[] = surahs.map((surah) => {
    const newData = (data.ayahs as HizbAyah[])
      .filter((ayah: HizbAyah) => ayah.surah.number === surah.number)
      .map(({ surah, ...rest }) => rest);

    return {
      surah: { ...surah },
      ayahs: newData,
      edition: data.edition as Editions,
    };
  });
  return (
    <div className="flex flex-col gap-8">
      {processedData.map((each, index) => {
        return (
          <div className="md:p-4 p-1 border rounded-md" key={index}>
            <SurahHeader surah={each.surah} />
            <div className="flex flex-col">
              <Card className="group hover:shadow-lg transition-shadow duration-300 ease-in-out">
                {each.ayahs.map((ayah, index) => (
                  <SingleTranslationView
                    translation={ayah}
                    translationLength={each.ayahs.length}
                    index={index}
                    edition={each.edition}
                    key={index}
                  />
                ))}
              </Card>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HizbView;
