import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { OverViewList } from "@/components/features/over-view/common/OverViewList";
import type { SectionReference } from "@/components/redux/slices/metaSlice";
import OverviewRenderItem from "@/components/ui/overview-render-item/overview-render-item";
import { useCallback } from "react";

const HizbOverView = () => {
  const { hizbQuarters, surahs } = useSelector(
    (state: RootState) => state.meta
  );

  const filterFn = useCallback(
    (hizb: SectionReference, searchTerm: string) => {
      const surah = surahs.references.find((s) => s.number === hizb.surah);
      if (!surah) return false;

      const hizbNumber = (hizbQuarters.references.indexOf(hizb) + 1).toString();
      const lowercasedSearchTerm = searchTerm.toLowerCase();

      const nameMatch = surah.englishName
        .toLowerCase()
        .includes(lowercasedSearchTerm);
      const numberMatch = hizbNumber.includes(lowercasedSearchTerm);

      return nameMatch || numberMatch;
    },
    [hizbQuarters, surahs]
  );

  const renderItem = useCallback(
    (hizb: SectionReference, index: number) => {
      return (
        <OverviewRenderItem
          data={hizb}
          index={index}
          path="hizb"
          key={index}
          surahs={surahs}
        />
      );
    },
    [surahs]
  );

  return (
    <OverViewList
      data={hizbQuarters.references}
      searchLabel="Search Hizbs"
      searchPlaceholder="Search by Surah name or Hizb number..."
      filterFn={filterFn}
      renderItem={renderItem}
    />
  );
};

export default HizbOverView;
