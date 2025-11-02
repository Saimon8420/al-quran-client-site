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
    <div className="bg-card rounded-lg p-0 shadow-sm mb-6">
      <Item
        variant="outline"
        className="flex flex-row justify-between gap-4 rounded-lg p-2"
      >
        <div className="flex flex-row items-center md:gap-4 gap-2 text-center sm:text-left order-1 justify-center mx-auto md:mx-2">
          <ItemMedia
            variant="icon"
            className="flex flex-col items-center justify-center md:w-[60px] md:h-[60px] w-[25px] h-[25px] rounded-full md:text-xl text-md font-bold mx-auto"
          >
            <span>{surah.number}</span>
          </ItemMedia>

          <RenderRevelationImage revelationType={surah.revelationType} />

          <ItemContent className="space-y-1 gap-0">
            <ItemTitle className="text-lg md:text-3xl font-bold text-gray-900 dark:text-gray-100">
              {surah.englishName}
            </ItemTitle>
            <ItemDescription className="text-sm md:text-base text-muted-foreground">
              {surah.englishNameTranslation}
            </ItemDescription>
          </ItemContent>
        </div>

        <div className="order-2 md:order-3 md:mx-2 mx-auto">
          <ItemActions className="flex flex-col items-center justify-center sm:items-end space-y-0 sm:space-y-2 sm:space-x-2 gap-0">
            <span className="arabic-text md:text-3xl text-xl text-gray-800 dark:text-gray-200">
              {surah.name}
            </span>
            <div className="flex gap-2 mt-2">
              <Badge
                variant="default"
                className="flex-1 md:text-sm text-xs font-semibold md:px-3 px-2 py-1"
              >
                Ayahs {surah.numberOfAyahs}
              </Badge>
              <Badge
                variant="secondary"
                className="flex-1 md:text-sm text-xs font-semibold md:px-3 px-2 py-1"
              >
                {surah.revelationType}
              </Badge>
            </div>
          </ItemActions>
        </div>

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
