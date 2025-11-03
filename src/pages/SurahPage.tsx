import type { RootState } from "@/app/store";
import CompleteSurahView from "@/components/features/surah";
import { useGetFullSurahsQuery } from "@/components/redux/api/surahsApi";
import Loader from "@/components/ui/loader/loader";
import useToast from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const SurahPage = () => {
  const { surah } = useParams();
  const isInvalidSurah = isNaN(Number(surah));
  const editions = useSelector((state: RootState) => state?.edition.userSelect);

  const {
    data: surahData,
    isError,
    error,
    isLoading,
    isFetching,
  } = useGetFullSurahsQuery(
    {
      number: Number(surah),
      edition: `${editions.arabicText},${editions.translation1},${editions.translation2},${editions.audio}`,
    },
    {
      skip: isInvalidSurah,
    }
  );

  useToast({ isError, error, isLoading, isFetching });

  if (isLoading || (isFetching && !surahData && !isError)) {
    return <Loader />;
  }

  return (
    <div>
      <CompleteSurahView surah={surahData} error={error} />
    </div>
  );
};

export default SurahPage;
