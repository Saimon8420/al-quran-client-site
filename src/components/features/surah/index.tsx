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
import { Separator } from "@/components/ui/separator";
import { cleanedData, toArabicNumerals } from "@/lib/quranUtlis";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import SurahHeader from "@/components/ui/surah-header/surah-header";

interface CompleteSurahViewProps {
  surah: TransformedSurahResponse | undefined;
  error?: FetchBaseQueryError | SerializedError | undefined;
}

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
      {/* Header */}
      <SurahHeader surah={surah.surahInfo} />

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
              <p className="text-4xl text-right leading-relaxed text-gray-900 dark:text-gray-100 arabic-text">
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
