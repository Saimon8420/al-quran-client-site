import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { OverViewList } from "@/components/features/over-view/common/OverViewList";
import { Badge } from "@/components/ui/badge";
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
import { useNavigate } from "react-router";

const SajdaOverView = () => {
  const { sajdas, surahs } = useSelector((state: RootState) => state.meta);

  const filterFn = (sajda: SectionReference, searchTerm: string) => {
    const surah = surahs.references.find((s) => s.number === sajda.surah);
    if (!surah) return false;

    const sajdaNumber = (sajdas.references.indexOf(sajda) + 1).toString();
    const lowercasedSearchTerm = searchTerm.toLowerCase();

    const nameMatch = surah.englishName
      .toLowerCase()
      .includes(lowercasedSearchTerm);
    const numberMatch = sajdaNumber.includes(lowercasedSearchTerm);

    return nameMatch || numberMatch;
  };

  const navigate = useNavigate();

  const renderItem = (sajda: SectionReference, index: number) => {
    const surah = surahs.references.find((s) => s.number === sajda.surah);
    if (!surah) return null;

    return (
      <Item
        key={index}
        variant="outline"
        className="flex items-center justify-between gap-4"
        onClick={() => navigate(`sajda/${sajda.surah}/${sajda.ayah}`)}
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
              Ayah {sajda.ayah}
            </ItemDescription>
          </ItemContent>
        </div>

        <ItemActions className="flex flex-col sm:order-2 order-1 sm:w-fit w-full  sm:items-start items-end">
          <div className="text-base w-full flex flex-wrap">
            <span className="font-arabic text-xl ml-auto">{surah.name}</span>
          </div>
          <div className="flex flex-wrap items-end justify-end gap-2 mt-1 w-full">
            <Badge
              variant={sajda.recommended ? "default" : "secondary"}
              className="text-xs"
            >
              {sajda.recommended ? "Recommended" : "Obligatory"}
            </Badge>
          </div>
        </ItemActions>
      </Item>
    );
  };

  return (
    <OverViewList
      data={sajdas.references}
      searchLabel="Search Sajdas"
      searchPlaceholder="Search by Surah name or Sajda number..."
      filterFn={filterFn}
      renderItem={renderItem}
    />
  );
};

export default SajdaOverView;
