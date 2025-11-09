import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { OverViewList } from "@/components/features/over-view/common/OverViewList";
import type { Surah } from "@/components/redux/slices/metaSlice";
import OverviewRenderItem from "@/components/ui/overview-render-item/overview-render-item";
import { useCallback } from "react";
import useHanldeNavigate from "@/hooks/use-handle-navigate";

const SurahOverView = () => {
  const { surahs } = useSelector((state: RootState) => state.meta);

  const filterFn = useCallback(
    (surah: Surah, searchTerm: string) => {
      const surahNumber = surah.number.toString();
      const lowercasedSearchTerm = searchTerm.toLowerCase();

      const nameMatch = surah.englishName
        .toLowerCase()
        .includes(lowercasedSearchTerm);
      const numberMatch = surahNumber.includes(lowercasedSearchTerm);

      return nameMatch || numberMatch;
    },
    [surahs]
  );

  const handleNavigate = useHanldeNavigate();

  const renderItem = useCallback(
    (surah: Surah) => {
      return (
        <OverviewRenderItem
          surah={surah}
          path="surah"
          key={surah.number}
          navigate={handleNavigate}
        />
      );
    },
    [handleNavigate]
  );

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
