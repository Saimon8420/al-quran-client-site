import { useGetManzilQuery } from "@/components/redux/api/quranSectionsApi";
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

  if (!data && !isLoading && !isFetching) {
    return <NoDataFound />;
  }

  console.log(data);
  return <div>Manzil ID: {id}</div>;
};

export default ManzilPage;
