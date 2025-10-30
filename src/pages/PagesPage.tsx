import type { RootState } from "@/app/store";
import PageView from "@/components/features/page";
import { useGetPageQuery } from "@/components/redux/api/quranSectionsApi";
import PagePaginationControl from "@/components/ui/custom-paginate/page-pagination-control";
import Loader from "@/components/ui/loader/loader";
import NoDataFound from "@/components/ui/nodata/no-data-found";
import useToast from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { toast } from "sonner";

const PagesPage = () => {
  const { page } = useParams();
  const editions = useSelector((state: RootState) => state?.edition.userSelect);
  const pagesMeta = useSelector((state: RootState) => state.meta.pages);

  const isInvalidPage = isNaN(Number(page));

  const { data, isLoading, isFetching, error, isError } = useGetPageQuery(
    {
      number: Number(page),
      edition: `${editions.arabicText}`,
    },
    {
      skip: isInvalidPage,
    }
  );

  useToast({ isError, error });

  if (isInvalidPage) {
    toast.error("Invalid Page Number", {
      duration: 3000,
      closeButton: true,
    });
    return <NoDataFound />;
  }

  let toastId: string | number = "";

  if (isLoading || isFetching) {
    toastId = toast.loading("fetching page data...");
    return <Loader />;
  }

  if (!isLoading || !isFetching) {
    toast.dismiss(toastId);
  }

  if (!data) {
    return <NoDataFound />;
  }

  return (
    <div className="p-4 flex flex-col justify-between">
      <PageView data={data.data} />

      {/* Pagination */}
      <div className="mt-10">
        <PagePaginationControl totalPages={pagesMeta.count} path="page" />
      </div>
    </div>
  );
};

export default PagesPage;
