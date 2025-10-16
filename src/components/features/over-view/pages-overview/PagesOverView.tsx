import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { OverViewList } from "@/components/features/over-view/layout/OverViewList";
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

const PagesOverView = () => {
  const { pages, surahs } = useSelector((state: RootState) => state.meta);

  const filterFn = (page: any, searchTerm: string) => {
    const surah = surahs.references.find((s) => s.number === page.surah);
    if (!surah) return false;

    const pageNumber = (pages.references.indexOf(page) + 1).toString();
    const lowercasedSearchTerm = searchTerm.toLowerCase();

    const nameMatch = surah.englishName.toLowerCase().includes(lowercasedSearchTerm);
    const numberMatch = pageNumber.includes(lowercasedSearchTerm);

    return nameMatch || numberMatch;
  };

  const renderItem = (page: any, index: number) => {
    const surah = surahs.references.find((s) => s.number === page.surah);
    if (!surah) return null;

    return (
      <Item
        key={index}
        variant="outline"
        className="flex items-center justify-between gap-4"
      >
        <div className="flex flex-wrap gap-4 sm:order-1 order-2 sm:ml-0 ml-auto">
          <ItemMedia
            variant="icon"
            className="flex flex-col items-center justify-center min-w-fit"
          >
            <span className="text-md font-bold">{index + 1}</span>
          </ItemMedia>

          <img
            src={surah.revelationType === "Meccan" ? mecca : madinah}
            alt={
              surah.revelationType === "Meccan" ? "mecca" : "madinah"
            }
            className="w-12 h-12 dark:invert"
          />

          <ItemContent>
            <ItemTitle className="text-lg font-semibold">
              {surah.englishName}
            </ItemTitle>
            <ItemDescription className="text-sm text-muted-foreground">
              Ayah {page.ayah}
            </ItemDescription>
          </ItemContent>
        </div>

        <ItemActions className="flex flex-col sm:order-2 order-1 sm:w-fit w-full  sm:items-start items-end">
          <div className="text-base w-full flex flex-wrap">
            <span className="font-arabic text-xl ml-auto">
              {surah.name}
            </span>
          </div>
        </ItemActions>
      </Item>
    );
  };

  return (
    <OverViewList
      data={pages.references}
      searchLabel="Search Pages"
      searchPlaceholder="Search by Surah name or Page number..."
      filterFn={filterFn}
      renderItem={renderItem}
    />
  );
};

export default PagesOverView;