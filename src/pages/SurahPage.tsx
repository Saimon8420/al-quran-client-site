import CompleteSurahView from "@/components/features/surah";
import { useGetFullSurahsQuery } from "@/components/redux/api/surahsApi";
import Loader from "@/components/ui/loader/loader";
import { useParams } from "react-router";

const SurahPage = () => {
  const { surah } = useParams();
  const { data: surahData, error, isLoading, isFetching } = useGetFullSurahsQuery(
    { number: Number(surah) },
    {
      skip: !surah,
    }
  );

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <div>
      <CompleteSurahView surah={surahData} error={error} />
    </div>
  );
};

export default SurahPage;
