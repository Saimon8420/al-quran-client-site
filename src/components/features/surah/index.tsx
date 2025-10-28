import { AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type {
  MergedAyah,
  TransformedSurahResponse,
} from "@/components/redux/api/surahsApi";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import RenderRevelationImage from "@/components/features/over-view/common/RenderRevelationImage";
import { Separator } from "@/components/ui/separator";
import { cleanedData } from "@/lib/quranUtlis";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Bismillah from "@/components/ui/bismillah/bismillah";

interface CompleteSurahViewProps {
  surah: TransformedSurahResponse | undefined;
  error?: FetchBaseQueryError | SerializedError | undefined;
}

const toArabicNumerals = (num: number) => {
  const arabicNumerals = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(num)
    .split("")
    .map((digit) => arabicNumerals[parseInt(digit)])
    .join("");
};

const CompleteSurahView = ({ surah, error }: CompleteSurahViewProps) => {
  const getErrorMessage = () => {
    if (error) {
      if (
        "data" in error &&
        error.data &&
        typeof error.data === "object" &&
        "data" in error.data &&
        Array.isArray(error.data.data)
      ) {
        return String(error.data.data[0]);
      }
      if ("error" in error) {
        return error.error;
      }
    }
    return "Failed to load surah data. Please try again later.";
  };

  if (error) {
    // Handle error state
    return (
      <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-6 w-6" />
          <h3 className="font-semibold">An error occurred</h3>
        </div>
        <p className="text-sm mt-2">{getErrorMessage()}</p>
      </div>
    );
  }

  if (!surah || !surah.surahInfo) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Data</CardTitle>
          <CardDescription>
            Nothing to show for the selected surah.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const renderAyahTranslations = (ayah: MergedAyah) => {
    const translationKeys = Object.keys(ayah).filter((key) =>
      key.startsWith("text")
    );
    // remove 'text' as it is the main one
    const otherTranslations = translationKeys.filter(
      (key) => key !== "text" && key !== "text3"
    );

    return otherTranslations.map((key) => (
      <div key={key} className="mt-2">
        <p className="text-md text-muted-foreground py-2">
          {String(ayah[key])}
        </p>
        <Separator className="my-1" />
      </div>
    ));
  };

  return (
    <div className="p-4">
      {/* Redesigned Header */}
      <div className="bg-card rounded-lg p-2 shadow-sm mb-6">
        <Item
          variant="outline"
          className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg p-2"
        >
          <div className="flex flex-col sm:flex-row items-center md:gap-4 gap-2 text-center sm:text-left order-1 justify-center">
            <ItemMedia
              variant="icon"
              className="flex flex-col items-center justify-center min-w-[60px] min-h-[60px] rounded-full text-xl font-bold mx-auto"
            >
              <span>{surah.surahInfo.number}</span>
            </ItemMedia>

            <RenderRevelationImage
              revelationType={surah.surahInfo.revelationType}
            />

            <ItemContent className="space-y-1">
              <ItemTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {surah.surahInfo.englishName}
              </ItemTitle>
              <ItemDescription className="text-base text-muted-foreground">
                {surah.surahInfo.englishNameTranslation}
              </ItemDescription>
            </ItemContent>
          </div>

          <ItemActions className="flex flex-col items-center sm:items-end space-y-2 sm:space-y-0 sm:space-x-2 mt-4 sm:mt-0 order-2 md:order-3">
            <span className="arabic-text text-3xl text-gray-800 dark:text-gray-200">
              {surah.surahInfo.name}
            </span>
            <div className="flex gap-2 mt-2">
              <Badge
                variant="default"
                className="text-sm font-semibold px-3 py-1"
              >
                Ayahs {surah.surahInfo.numberOfAyahs}
              </Badge>
              <Badge
                variant="secondary"
                className="text-sm font-semibold px-3 py-1"
              >
                {surah.surahInfo.revelationType}
              </Badge>
            </div>
          </ItemActions>

          <div className="order-3 md:order-2">
            <Bismillah
              surahName={surah.surahInfo.englishName}
              classNameParent="mt-0 mb-0 px-0"
              classNameArabic="text-sm md:text-xl"
              classNameEnglish="text-xs md:text-lg"
            />
          </div>
        </Item>
      </div>

      {/* Verse List - without Collapsible, more modern look */}
      <div className="space-y-6">
        {cleanedData({
          data: surah?.ayahs,
          surahNumber: surah.surahInfo.number,
        }).map((ayah) => (
          <Card
            key={ayah.numberInSurah}
            className="group hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant={"outline"} className="p-1">
                  Verse {ayah.numberInSurah}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-5xl text-right leading-relaxed text-gray-900 dark:text-gray-100 arabic-text">
                {ayah.text}{" "}
                <span className="text-sm bg-primary text-primary-foreground rounded-full px-2 py-1">
                  ۝{toArabicNumerals(ayah.numberInSurah)}
                </span>
              </p>
              <div className="border-t mt-4 space-y-2">
                {renderAyahTranslations(ayah)}
              </div>
            </CardContent>
            {ayah.audio && (
              <CardFooter className="pt-0">
                <audio controls src={ayah.audio} className="w-full">
                  Your browser does not support the audio element.
                </audio>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
export default CompleteSurahView;
