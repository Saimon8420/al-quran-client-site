import type { Editions } from "@/components/redux/api/metaDataApi";
import type { Ayah, SurahSummary } from "@/components/redux/api/surahsApi";
import type { PageResponse as HizbResponse } from "@/components/redux/api/quranSectionsApi";
import SurahHeader from "@/components/ui/surah-header/surah-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  cleanedDataWithoutArrayResponse,
  toArabicNumerals,
} from "@/lib/quranUtlis";
import { Separator } from "@/components/ui/separator";

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
      {processedData.map((each) => {
        return (
          <div className="md:p-4 p-1 border rounded-md">
            <SurahHeader surah={each.surah} />
            <div className="flex flex-col">
              <Card className="group hover:shadow-lg transition-shadow duration-300 ease-in-out">
                {each.ayahs.map((ayah, index) => (
                  <div key={index}>
                    <CardHeader className="px-2 md:px-4 lg:px-6">
                      <div className="flex items-center justify-between">
                        <Badge variant={"outline"} className="p-1">
                          Verse {ayah.numberInSurah}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="px-2 md:px-4 lg:px-6">
                      {/* if text is arabic */}
                      {each.edition.language === "ar" ? (
                        <p
                          className={`text-4xl text-right leading-relaxed text-gray-900 dark:text-gray-100 arabic-text text-wrap`}
                        >
                          {cleanedDataWithoutArrayResponse(
                            ayah.text,
                            ayah.number,
                            ayah.numberInSurah
                          )}
                          <span className="text-sm bg-primary text-primary-foreground rounded-full px-2 py-1 mr-1">
                            ۝{toArabicNumerals(ayah.numberInSurah)}
                          </span>
                        </p>
                      ) : (
                        // if not arabic text
                        <p
                          className={`md:text-2xl text-md leading-relaxed text-gray-900 dark:text-gray-100 text-wrap`}
                        >
                          {ayah.text} [{ayah.numberInSurah}]
                        </p>
                      )}
                    </CardContent>

                    {/* Separator (hidden for last ayah) */}
                    {index !== each.ayahs.length - 1 && (
                      <Separator className="my-3" />
                    )}
                  </div>
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
