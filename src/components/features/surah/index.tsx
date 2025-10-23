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

interface CompleteSurahViewProps {
  surah: TransformedSurahResponse | undefined;
}

const CompleteSurahView = ({ surah }: CompleteSurahViewProps) => {
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
        <p className="text-sm font-semibold">
          {key.replace("text", "Translation ")}
        </p>
        <p className="text-sm text-muted-foreground">{String(ayah[key])}</p>
        <Separator className="my-1" />
      </div>
    ));
  };

  return (
    <div className="p-4">
      {/* Redesigned Header */}
      <Item
        variant="outline"
        className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 p-6 rounded-lg shadow-md"
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <ItemMedia
            variant="icon"
            className="flex flex-col items-center justify-center min-w-[60px] min-h-[60px] rounded-full text-xl font-bold"
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

        <ItemActions className="flex flex-col items-center sm:items-end space-y-2 sm:space-y-0 sm:space-x-2 mt-4 sm:mt-0">
          <span className="font-arabic text-3xl text-gray-800 dark:text-gray-200">
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
      </Item>

      {/* Verse List - without Collapsible, more modern look */}
      <div className="space-y-6">
        {surah.ayahs.map((ayah) => (
          <Card
            key={ayah.numberInSurah}
            className="group hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xl text-gray-800 dark:text-gray-200">
                  Verse {ayah.numberInSurah}
                </h3>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-3xl arabic-text text-right leading-relaxed mb-4 text-gray-900 dark:text-gray-100">
                {ayah.text}
              </p>
              <div className="border-t pt-4 mt-4 space-y-3">
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
