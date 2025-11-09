import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { OverViewList } from "@/components/features/over-view/common/OverViewList";
import type { SectionReference } from "@/components/redux/slices/metaSlice";
import OverviewRenderItem from "@/components/ui/overview-render-item/overview-render-item";
import { useCallback } from "react";
import useHanldeNavigate from "@/hooks/use-handle-navigate";

const SajdaOverView = () => {
  const { sajdas, surahs } = useSelector((state: RootState) => state.meta);

  const handleNavigate = useHanldeNavigate();

  const filterFn = useCallback(
    (sajda: SectionReference, searchTerm: string) => {
      const surah = surahs.references.find((s) => s.number === sajda.surah);
      if (!surah) return false;

      const sajdaNumber = (sajdas.references.indexOf(sajda) + 1).toString();
      const lowercasedSearchTerm = searchTerm.toLowerCase();

      const nameMatch = surah.englishName
        .toLowerCase()
        .includes(lowercasedSearchTerm);
      const numberMatch = sajdaNumber.includes(lowercasedSearchTerm);

      return nameMatch || numberMatch;
    },
    [sajdas, surahs]
  );

  const renderItem = useCallback(
    (sajda: SectionReference, index: number) => {
      return (
        <OverviewRenderItem
          data={sajda}
          index={index}
          path="sajda"
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
      data={sajdas.references}
      searchLabel="Search Sajdas"
      searchPlaceholder="Search by Surah name or Sajda number..."
      filterFn={filterFn}
      renderItem={renderItem}
    />
  );
};

export default SajdaOverView;
