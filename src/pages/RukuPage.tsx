import type { RootState } from "@/app/store";
import RukuView from "@/components/features/ruku";
import { useGetSpecificAyahQuery } from "@/components/redux/api/surahsApi";
import Loader from "@/components/ui/loader/loader";
import NoDataFound from "@/components/ui/nodata/no-data-found";
import useToast from "@/hooks/use-toast";
import { cleanedDataWithoutArrayResponse } from "@/lib/quranUtlis";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { toast } from "sonner";

const RukuPage = () => {
  const { surah, ayah } = useParams();

  const editions = useSelector((state: RootState) => state?.edition.userSelect);

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

  useToast({ isError, error });

  if (isInvalidSurah || isInvalidAyah) {
    toast.error("Invalid Url", {
      duration: 3000,
      closeButton: true,
    });
    return <NoDataFound />;
  }

  let toastId: string | number = "";

  if (isLoading || isFetching) {
    toastId = toast.loading("fetching surah data...");
    return <Loader />;
  }

  if (!isLoading || !isFetching) {
    toast.dismiss(toastId);
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
    <div className="p-4">
      <RukuView data={response} />
    </div>
  );
};

export default RukuPage;
