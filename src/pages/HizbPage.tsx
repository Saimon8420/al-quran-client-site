import type { RootState } from "@/app/store";
import HizbView from "@/components/features/hizb";
import { useGetHizbQuery } from "@/components/redux/api/quranSectionsApi";
import PagePaginationControl from "@/components/ui/custom-paginate/page-pagination-control";
import Loader from "@/components/ui/loader/loader";
import NoDataFound from "@/components/ui/nodata/no-data-found";
import { ScrollArea } from "@/components/ui/scroll-area";
import useToast from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const HizbPage = () => {
  const { id } = useParams();

  const editions = useSelector(
    (state: RootState) => state?.edition.userSingleSelect
  );

  const { data, isLoading, isFetching, isError, error, isSuccess } =
    useGetHizbQuery(
      { number: Number(id), edition: `${editions.text}` },
      {
        skip: !Number(id),
      }
    );

  useToast({ isError, error, isSuccess, isLoading, isFetching });

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (!data) {
    return <NoDataFound />;
  }

  return (
    <div className="min-h-fit overflow-hidden md:p-4 p-0 flex flex-col justify-between gap-6">
      <ScrollArea className="gap-4 h-[600px] md:h-[700px]">
        <HizbView data={data?.data} />
      </ScrollArea>
      <PagePaginationControl totalPages={240} path="hizb" />
    </div>
  );
};

export default HizbPage;
