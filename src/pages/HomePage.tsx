import { useGetMetaDataQuery } from "@/components/redux/api/metaDataApi";
import Loader from "@/components/ui/loader/loader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useToast from "@/hooks/use-toast";
import { useEffect, useState } from "react";

const HomePage = () => {
  // to get metaData
  const {
    data: metaData,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  } = useGetMetaDataQuery();

  // hooks
  useToast({ isError, error, isSuccess, data: metaData });

  console.log(metaData);

  const [tabList, setTabList] = useState<string[]>([]);

  // Update tabList only when metaData changes
  useEffect(() => {
    if (metaData && metaData?.data && !isLoading && !isFetching && !isError) {
      setTabList(Object.keys(metaData?.data));
    }
  }, [metaData, isLoading, isFetching, isError]);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      This is homepage
      <Tabs defaultValue={"surahs"}>
        <TabsList className="2xl:min-w-7xl xl:min-w-4xl lg:min-w-2xl md:min-w-md min-w-3xs p-2 md:gap-0 gap-2">
          {tabList?.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="capitalize cursor-pointer px-2 md:px-10"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default HomePage;
