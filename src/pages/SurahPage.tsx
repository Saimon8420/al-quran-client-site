import type { RootState } from "@/app/store";
import CompleteSurahView from "@/components/features/surah";
import { useGetFullSurahsQuery } from "@/components/redux/api/surahsApi";
import PagePaginationControl from "@/components/ui/custom-paginate/page-pagination-control";
import Loader from "@/components/ui/loader/loader";
import { ScrollArea } from "@/components/ui/scroll-area";
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
    <div className="min-h-fit overflow-hidden md:p-4 p-0 flex flex-col justify-between gap-6">
      <ScrollArea className="gap-4 h-[600px] md:h-[700px] border rounded-md p-1">
        <CompleteSurahView surah={surahData} error={error} />
      </ScrollArea>
      <PagePaginationControl totalPages={114} path="surah" />
    </div>
  );
};

export default SurahPage;
