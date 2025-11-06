import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { OverViewList } from "@/components/features/over-view/common/OverViewList";
import type { SectionReference } from "@/components/redux/slices/metaSlice";
import OverviewRenderItem from "@/components/ui/overview-render-item/overview-render-item";
import { useCallback } from "react";

const ManzilsOverView = () => {
  const { manzils, surahs } = useSelector((state: RootState) => state.meta);

  const filterFn = useCallback(
    (manzil: SectionReference, searchTerm: string) => {
      const surah = surahs.references.find((s) => s.number === manzil.surah);
      if (!surah) return false;

      const manzilNumber = (manzils.references.indexOf(manzil) + 1).toString();
      const lowercasedSearchTerm = searchTerm.toLowerCase();

      const nameMatch = surah.englishName
        .toLowerCase()
        .includes(lowercasedSearchTerm);
      const numberMatch = manzilNumber.includes(lowercasedSearchTerm);

      return nameMatch || numberMatch;
    },
    [manzils, surahs]
  );

  const renderItem = useCallback(
    (manzil: SectionReference, index: number) => {
      return (
        <OverviewRenderItem
          data={manzil}
          index={index}
          path="manzil"
          key={index}
          surahs={surahs}
        />
      );
    },
    [surahs]
  );

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
