import { useGetMetaDataQuery } from "@/components/redux/api/metaDataApi";
import Loader from "@/components/ui/loader/loader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const HomePage = () => {
  const {
    data: metaData,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  } = useGetMetaDataQuery();

  console.log(metaData);

  const [tabList, setTabList] = useState<string[]>([]);
  const [successToastShown, setSuccessToastShown] = useState(false);

  // Update tabList only when metaData changes
  useEffect(() => {
    if (metaData && metaData?.data && !isLoading && !isFetching && !isError) {
      setTabList(Object.keys(metaData?.data));
    }
  }, [metaData, isLoading, isFetching, isError]);

  useEffect(() => {
    if (isError && error) {
      if ("data" in error) {
        toast.error("Error", {
          description: (error.data as { message: string }).message,
          closeButton: true,
          duration: 3000,
        });
      }
    }
    if (isSuccess && metaData && !successToastShown) {
      toast.success("Success", {
        description: `Status : ${metaData?.status}, Code : ${metaData?.code}`,
        closeButton: true,
        duration: 3000,
      });
      setSuccessToastShown(true);
    }
  }, [isError, error, isSuccess, metaData, successToastShown]);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      This is homepage
      <Tabs defaultValue={"surahs"}>
        <TabsList className="min-w-7xl mx-auto">
          {tabList?.map((tab) => (
            <TabsTrigger key={tab} value={tab} className="capitalize">
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default HomePage;
