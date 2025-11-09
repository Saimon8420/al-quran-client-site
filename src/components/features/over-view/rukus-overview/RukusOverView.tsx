import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { OverViewList } from "@/components/features/over-view/common/OverViewList";
import type { SectionReference } from "@/components/redux/slices/metaSlice";
import OverviewRenderItem from "@/components/ui/overview-render-item/overview-render-item";
import { useCallback } from "react";
import useHanldeNavigate from "@/hooks/use-handle-navigate";

const RukusOverView = () => {
  const { rukus, surahs } = useSelector((state: RootState) => state.meta);

  const handleNavigate = useHanldeNavigate();

  const filterFn = useCallback(
    (ruku: SectionReference, searchTerm: string) => {
      const surah = surahs.references.find((s) => s.number === ruku.surah);
      if (!surah) return false;

      const rukuNumber = (rukus.references.indexOf(ruku) + 1).toString();
      const lowercasedSearchTerm = searchTerm.toLowerCase();

      const nameMatch = surah.englishName
        .toLowerCase()
        .includes(lowercasedSearchTerm);
      const numberMatch = rukuNumber.includes(lowercasedSearchTerm);

      return nameMatch || numberMatch;
    },
    [rukus, surahs]
  );

  const renderItem = useCallback(
    (ruku: SectionReference, index: number) => {
      return (
        <OverviewRenderItem
          data={ruku}
          index={index}
          path="ruku"
          key={index}
          surahs={surahs}
          navigate={handleNavigate}
        />
      );
    },
    [surahs, handleNavigate]
  );

  return (
    <OverViewList
      data={rukus.references}
      searchLabel="Search Rukus"
      searchPlaceholder="Search by Surah name or Ruku number..."
      filterFn={filterFn}
      renderItem={renderItem}
    />
  );
};

export default RukusOverView;
