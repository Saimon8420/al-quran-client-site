import { AlertTriangle } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TransformedSurahResponse } from "@/components/redux/api/surahsApi";
import { cleanedData } from "@/lib/quranUtlis";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import SurahHeader from "@/components/ui/surah-header/surah-header";
import MultipleTranslationView from "@/components/ui/multiple-translation-view/multiple-translation-view";

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

  return (
    <div className="md:p-4 p-0">
      {/* Header */}
      <SurahHeader surah={surah.surahInfo} />

      {/* Verse List - without Collapsible, more modern look */}
      <div className="space-y-6">
        {cleanedData({
          data: surah?.ayahs,
          surahNumber: surah.surahInfo.number,
        }).map((ayah) => (
          <MultipleTranslationView key={ayah.number} data={ayah} />
        ))}
      </div>
    </div>
  );
};
export default CompleteSurahView;
