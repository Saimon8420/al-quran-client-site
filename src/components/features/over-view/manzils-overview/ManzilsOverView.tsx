import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { OverViewList } from "@/components/features/over-view/common/OverViewList";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import type { SectionReference } from "@/components/redux/slices/metaSlice";
import RenderRevelationImage from "../common/RenderRevelationImage";

const ManzilsOverView = () => {
  const { manzils, surahs } = useSelector((state: RootState) => state.meta);

  const filterFn = (manzil: SectionReference, searchTerm: string) => {
    const surah = surahs.references.find((s) => s.number === manzil.surah);
    if (!surah) return false;

    const manzilNumber = (manzils.references.indexOf(manzil) + 1).toString();
    const lowercasedSearchTerm = searchTerm.toLowerCase();

    const nameMatch = surah.englishName
      .toLowerCase()
      .includes(lowercasedSearchTerm);
    const numberMatch = manzilNumber.includes(lowercasedSearchTerm);

    return nameMatch || numberMatch;
  };

  const renderItem = (manzil: SectionReference, index: number) => {
    const surah = surahs.references.find((s) => s.number === manzil.surah);
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

          <RenderRevelationImage revelationType={surah.revelationType} />

          <ItemContent>
            <ItemTitle className="text-lg font-semibold">
              {surah.englishName}
            </ItemTitle>
            <ItemDescription className="text-sm text-muted-foreground">
              Ayah {manzil.ayah}
            </ItemDescription>
          </ItemContent>
        </div>

        <ItemActions className="flex flex-col sm:order-2 order-1 sm:w-fit w-full  sm:items-start items-end">
          <div className="text-base w-full flex flex-wrap">
            <span className="font-arabic text-xl ml-auto">{surah.name}</span>
          </div>
        </ItemActions>
      </Item>
    );
  };

  return (
    <OverViewList
      data={manzils.references}
      searchLabel="Search Manzils"
      searchPlaceholder="Search by Surah name or Manzil number..."
      filterFn={filterFn}
      renderItem={renderItem}
    />
  );
};

export default ManzilsOverView;
