import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../item";
import RenderRevelationImage from "@/components/features/over-view/common/RenderRevelationImage";
import { Badge } from "../badge";
import Bismillah from "../bismillah/bismillah";
import type { SurahSummary } from "@/components/redux/api/surahsApi";

interface SurahHeaderProps {
  surah: Omit<SurahSummary, "ayahs" | "edition">;
}

const SurahHeader = ({ surah }: SurahHeaderProps) => {
  return (
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
            <span>{surah.number}</span>
          </ItemMedia>

          <RenderRevelationImage revelationType={surah.revelationType} />

          <ItemContent className="space-y-1">
            <ItemTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {surah.englishName}
            </ItemTitle>
            <ItemDescription className="text-base text-muted-foreground">
              {surah.englishNameTranslation}
            </ItemDescription>
          </ItemContent>
        </div>

        <ItemActions className="flex flex-col items-center sm:items-end space-y-2 sm:space-y-0 sm:space-x-2 mt-4 sm:mt-0 order-2 md:order-3">
          <span className="arabic-text text-3xl text-gray-800 dark:text-gray-200">
            {surah.name}
          </span>
          <div className="flex gap-2 mt-2">
            <Badge
              variant="default"
              className="text-sm font-semibold px-3 py-1"
            >
              Ayahs {surah.numberOfAyahs}
            </Badge>
            <Badge
              variant="secondary"
              className="text-sm font-semibold px-3 py-1"
            >
              {surah.revelationType}
            </Badge>
          </div>
        </ItemActions>

        <div className="order-3 md:order-2">
          <Bismillah
            surahName={surah.englishName}
            classNameParent="mt-0 mb-0 px-0"
            classNameArabic="text-sm md:text-xl"
            classNameEnglish="text-xs md:text-lg"
          />
        </div>
      </Item>
    </div>
  );
};

export default SurahHeader;
