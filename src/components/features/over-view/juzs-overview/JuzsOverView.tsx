import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { OverViewList } from "@/components/features/over-view/common/OverViewList";
import type { SectionReference } from "@/components/redux/slices/metaSlice";
import OverviewRenderItem from "@/components/ui/overview-render-item/overview-render-item";
import { useCallback } from "react";
import useHanldeNavigate from "@/hooks/use-handle-navigate";

const JuzsOverView = () => {
  const { juzs, surahs } = useSelector((state: RootState) => state.meta);

  const handleNavigate = useHanldeNavigate();

  const filterFn = useCallback(
    (juz: SectionReference, searchTerm: string) => {
      const surah = surahs.references.find((s) => s.number === juz.surah);
      if (!surah) return false;

      const juzNumber = (juzs.references.indexOf(juz) + 1).toString();
      const lowercasedSearchTerm = searchTerm.toLowerCase();

      const nameMatch = surah.englishName
        .toLowerCase()
        .includes(lowercasedSearchTerm);
      const numberMatch = juzNumber.includes(lowercasedSearchTerm);

      return nameMatch || numberMatch;
    },
    [juzs, surahs]
  );

  const renderItem = useCallback(
    (juz: SectionReference, index: number) => {
      return (
        <OverviewRenderItem
          data={juz}
          index={index}
          path="juz"
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
      data={juzs.references}
      searchLabel="Search Juzs"
      searchPlaceholder="Search by Surah name or Juz number..."
      filterFn={filterFn}
      renderItem={renderItem}
    />
  );
};

export default JuzsOverView;
