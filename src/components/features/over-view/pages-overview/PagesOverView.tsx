import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { OverViewList } from "@/components/features/over-view/common/OverViewList";
import type { SectionReference } from "@/components/redux/slices/metaSlice";
import OverviewRenderItem from "@/components/ui/overview-render-item/overview-render-item";
import { useCallback } from "react";
import useHanldeNavigate from "@/hooks/use-handle-navigate";

const PagesOverView = () => {
  const { pages, surahs } = useSelector((state: RootState) => state.meta);

  const handleNavigate = useHanldeNavigate();

  const filterFn = useCallback(
    (page: SectionReference, searchTerm: string) => {
      const surah = surahs.references.find((s) => s.number === page.surah);
      if (!surah) return false;

      const pageNumber = (pages.references.indexOf(page) + 1).toString();
      const lowercasedSearchTerm = searchTerm.toLowerCase();

      const nameMatch = surah.englishName
        .toLowerCase()
        .includes(lowercasedSearchTerm);
      const numberMatch = pageNumber.includes(lowercasedSearchTerm);

      return nameMatch || numberMatch;
    },
    [pages, surahs]
  );

  const renderItem = useCallback(
    (page: SectionReference, index: number) => {
      return (
        <OverviewRenderItem
          data={page}
          index={index}
          path="page"
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
      data={pages.references}
      searchLabel="Search Pages"
      searchPlaceholder="Search by Surah name or Page number..."
      filterFn={filterFn}
      renderItem={renderItem}
    />
  );
};

export default PagesOverView;
