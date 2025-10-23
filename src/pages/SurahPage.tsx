import CompleteSurahView from "@/components/features/surah";
import { useGetFullSurahsQuery } from "@/components/redux/api/surahsApi";
import Loader from "@/components/ui/loader/loader";
import useToast from "@/hooks/use-toast";
import { useParams } from "react-router";

const SurahPage = () => {
  const { surah } = useParams();
  const {
    data: surahData,
    isError,
    error,
    isSuccess,
    isLoading,
    isFetching,
  } = useGetFullSurahsQuery(
    { number: Number(surah) },
    {
      skip: !surah,
    }
  );
  useToast({ isError, isSuccess, error });

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <div>
      <CompleteSurahView surah={surahData} />
    </div>
  );
};

export default SurahPage;
