import type { RootState } from "@/app/store";
import SearchOverViewComponent from "@/components/features/search-overview";
import { useGetSpecificAyahQuery } from "@/components/redux/api/surahsApi";
import CustomPaginate from "@/components/ui/custom-paginate/pagination-control";
import Loader from "@/components/ui/loader/loader";
import NoDataFound from "@/components/ui/nodata/no-data-found";
import useToast from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const SerachOverViewPage = () => {
  const { surah, ayah } = useParams();

  const editions = useSelector((state: RootState) => state?.edition.userSelect);
  const searchOverView = useSelector(
    (state: RootState) => state.meta.searchOverView
  );

  const isInvalidSurah = isNaN(Number(surah));

  const isInvalidAyah = isNaN(Number(ayah));

  const { data, isLoading, isFetching, error, isError } =
    useGetSpecificAyahQuery(
      {
        surah: Number(surah),
        ayah: Number(ayah),
        edition: `${editions.arabicText},${editions.translation1},${editions.translation2},${editions.audio}`,
      },
      {
        skip: isInvalidSurah || isInvalidAyah,
      }
    );

  useToast({ isError, error, isLoading, isFetching });

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (!data) {
    return <NoDataFound />;
  }

  return (
    <div className="md:p-4 p-0 flex flex-col justify-between">
      <SearchOverViewComponent data={data} />

      {/* Pagination */}
      <div className="mt-10">
        <CustomPaginate references={searchOverView.references} path="search" />
      </div>
    </div>
  );
};

export default SerachOverViewPage;
