import type { RootState } from "@/app/store";
import { useGetSpecificAyahQuery } from "@/components/redux/api/surahsApi";
import Loader from "@/components/ui/loader/loader";
import NoDataFound from "@/components/ui/nodata/no-data-found";
import useToast from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import SajdaView from "@/components/features/sajda";
import CustomPaginate from "@/components/ui/custom-paginate/pagination-control";

const SajdaPage = () => {
  const { surah, ayah } = useParams();

  const editions = useSelector((state: RootState) => state?.edition.userSelect);
  const sajdas = useSelector((state: RootState) => state.meta.sajdas);

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
      <SajdaView data={data} />

      {/* Pagination */}
      <div className="mt-10">
        <CustomPaginate references={sajdas.references} path="sajda" />
      </div>
    </div>
  );
};

export default SajdaPage;
