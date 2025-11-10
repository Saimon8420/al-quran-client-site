import type { RootState } from "@/app/store";
import RukuView from "@/components/features/ruku";
import { useGetSpecificAyahQuery } from "@/components/redux/api/surahsApi";
import CustomPaginate from "@/components/ui/custom-paginate/pagination-control";
import Loader from "@/components/ui/loader/loader";
import NoDataFound from "@/components/ui/nodata/no-data-found";
import useToast from "@/hooks/use-toast";
import { cleanedDataWithoutArrayResponse } from "@/lib/quranUtlis";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const RukuPage = () => {
  const { surah, ayah } = useParams();

  const editions = useSelector((state: RootState) => state?.edition.userSelect);
  const rukus = useSelector((state: RootState) => state.meta.rukus);

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

  const response = { ...data };

  response.text = cleanedDataWithoutArrayResponse(
    data.text,
    data.surah?.number,
    data.numberInSurah
  );

  return (
    <div className="md:p-4 p-0 flex flex-col justify-between">
      <RukuView data={response} />

      {/* Pagination */}
      <div className="mt-40">
        <CustomPaginate references={rukus.references} path="ruku" />
      </div>
    </div>
  );
};

export default RukuPage;
