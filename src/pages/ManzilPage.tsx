import ManzilView from "@/components/features/manzil";
import { useGetManzilQuery } from "@/components/redux/api/quranSectionsApi";
import PagePaginationControl from "@/components/ui/custom-paginate/page-pagination-control";
import Loader from "@/components/ui/loader/loader";
import NoDataFound from "@/components/ui/nodata/no-data-found";
import useToast from "@/hooks/use-toast";
import { useParams } from "react-router";

const ManzilPage = () => {
  const { id } = useParams();

  const isInValidId = isNaN(Number(id));

  const { data, isLoading, isFetching, isError, error } = useGetManzilQuery(
    {
      number: Number(id),
    },
    {
      skip: isInValidId,
    }
  );

  useToast({ isError, error, isLoading, isFetching });

  if (isLoading || (isFetching && !data)) {
    return <Loader />;
  }

  if (!data) {
    return <NoDataFound />;
  }

  return (
    <div className="p-4 flex flex-col justify-between">
      <ManzilView data={data?.data} />
      <PagePaginationControl totalPages={7} path="manzil" />
    </div>
  );
};

export default ManzilPage;
