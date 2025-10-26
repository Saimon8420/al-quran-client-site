import CompleteSurahView from "@/components/features/surah";
import { useGetFullSurahsQuery } from "@/components/redux/api/surahsApi";
import Loader from "@/components/ui/loader/loader";
import NoDataFound from "@/components/ui/nodata/no-data-found";
import { useParams } from "react-router";
import { toast } from "sonner";

const SurahPage = () => {
  const { surah } = useParams();
  const isInvalidSurah = isNaN(Number(surah));

  const {
    data: surahData,
    error,
    isLoading,
    isFetching,
  } = useGetFullSurahsQuery(
    { number: Number(surah) },
    {
      skip: isInvalidSurah,
    }
  );

  if (isInvalidSurah) {
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

  return (
    <div>
      <CompleteSurahView surah={surahData} error={error} />
    </div>
  );
};

export default SurahPage;
