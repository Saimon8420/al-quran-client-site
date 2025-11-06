import type { Ayah } from "@/components/redux/api/surahsApi";
import { CardContent, CardHeader } from "../card";
import { Badge } from "../badge";
import {
  cleanedDataWithoutArrayResponse,
  toArabicNumerals,
} from "@/lib/quranUtlis";
import { Separator } from "../separator";
import type { Editions } from "@/components/redux/api/metaDataApi";

interface SingleTranslationViewProps {
  translation: Ayah;
  translationLength?: number;
  index?: number;
  edition?: Editions;
}

const SingleTranslationView = ({
  translation,
  translationLength,
  index,
  edition,
}: SingleTranslationViewProps) => {
  return (
    <div key={index}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant={"outline"} className="p-1">
            Verse {translation.numberInSurah}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-2 md:px-4 lg:px-6">
        {/* if text is arabic */}
        {edition?.language === "ar" ? (
          <p
            className={`text-4xl text-right leading-relaxed text-gray-900 dark:text-gray-100 arabic-text text-wrap`}
          >
            {cleanedDataWithoutArrayResponse(
              translation.text,
              translation.number,
              translation.numberInSurah
            )}
            <span className="text-sm bg-primary text-primary-foreground rounded-full px-2 py-1 mr-1">
              ۝{toArabicNumerals(translation.numberInSurah)}
            </span>
          </p>
        ) : (
          // if not arabic text
          <p
            className={`md:text-2xl text-md leading-relaxed text-gray-900 dark:text-gray-100 text-wrap`}
          >
            {translation.text} [{translation.numberInSurah}]
          </p>
        )}
      </CardContent>

      {/* Separator (hidden for last ayah) */}
      {translationLength && index !== translationLength - 1 && (
        <Separator className="my-3" />
      )}
    </div>
  );
};

export default SingleTranslationView;
