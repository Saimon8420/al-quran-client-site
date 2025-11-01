import type { PageResponse } from "@/components/redux/api/quranSectionsApi";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SurahHeader from "@/components/ui/surah-header/surah-header";
import {
  cleanedDataWithoutArrayResponse,
  toArabicNumerals,
} from "@/lib/quranUtlis";

interface PageViewProps {
  data: PageResponse;
}

const PageView = ({ data }: PageViewProps) => {
  if (!data) return null;

  const { ayahs, surahs } = data;

  // Assuming surahs is an object with surah numbers as keys
  const surahArray = Object.values(surahs);

  return (
    <div className="space-y-4">
      <SurahHeader surah={surahArray[0]} />
      <div className="p-4 border rounded-md flex flex-col gap-2">
        <Card className="group hover:shadow-lg transition-shadow duration-300 ease-in-out">
          {ayahs.map((ayah, index) => (
            <div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant={"outline"} className="p-1">
                    Verse {ayah.numberInSurah}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-4xl text-right leading-relaxed text-gray-900 dark:text-gray-100 arabic-text">
                  {cleanedDataWithoutArrayResponse(
                    ayah.text,
                    ayah.number,
                    ayah.numberInSurah
                  )}
                  <span className="text-sm bg-primary text-primary-foreground rounded-full px-2 py-1 mr-1">
                    ۝{toArabicNumerals(ayah.numberInSurah)}
                  </span>
                </p>
              </CardContent>

              {/* Separator (hidden for last ayah) */}
              {index !== ayahs.length - 1 && <Separator className="my-3" />}
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default PageView;
