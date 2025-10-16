import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { OverViewList } from "@/components/features/over-view/layout/OverViewList";
import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import mecca from "@/assets/images/mecca.png";
import madinah from "@/assets/images/madinah.png";

const SurahOverView = () => {
  const { surahs } = useSelector((state: RootState) => state.meta);

  const filterFn = (surah: any, searchTerm: string) => {
    const surahNumber = surah.number.toString();
    const lowercasedSearchTerm = searchTerm.toLowerCase();

    const nameMatch = surah.englishName.toLowerCase().includes(lowercasedSearchTerm);
    const numberMatch = surahNumber.includes(lowercasedSearchTerm);

    return nameMatch || numberMatch;
  };

  const renderItem = (surah: any) => {
    return (
      <Item
        key={surah.number}
        variant="outline"
        className="flex items-center justify-between gap-4"
      >
        <div className="flex flex-wrap gap-4 sm:order-1 order-2 sm:ml-0 ml-auto">
          <ItemMedia
            variant="icon"
            className="flex flex-col items-center justify-center min-w-fit"
          >
            <span className="text-md font-bold">{surah.number}</span>
          </ItemMedia>

          <img
            src={surah.revelationType === "Meccan" ? mecca : madinah}
            alt={surah.revelationType === "Meccan" ? "mecca" : "madinah"}
            className="w-12 h-12 dark:invert"
          />

          <ItemContent>
            <ItemTitle className="text-lg font-semibold">
              {surah.englishName}
            </ItemTitle>
            <ItemDescription className="text-sm text-muted-foreground">
              {surah.englishNameTranslation}
            </ItemDescription>
          </ItemContent>
        </div>

        <ItemActions className="flex flex-col sm:order-2 order-1 sm:w-fit w-full  sm:items-start items-end">
          <div className="text-base w-full flex flex-wrap">
            <span className="font-arabic text-xl ml-auto">
              {surah.name}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            <Badge variant="default" className="text-xs font-bold">
              Ayahs {surah.numberOfAyahs}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {surah.revelationType}
            </Badge>
          </div>
        </ItemActions>
      </Item>
    );
  };

  return (
    <OverViewList
      data={surahs.references}
      searchLabel="Search Surahs"
      searchPlaceholder="Search by Surah name or number..."
      filterFn={filterFn}
      renderItem={renderItem}
    />
  );
};

export default SurahOverView;
