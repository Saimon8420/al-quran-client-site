import type { RootState } from "@/app/store";
import OverView from "@/components/features/over-view";
import { useGetMetaDataQuery } from "@/components/redux/api/metaDataApi";
import Bismillah from "@/components/ui/bismillah/bismillah";
import Loader from "@/components/ui/loader/loader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useToast from "@/hooks/use-toast";
import { useState } from "react";
import { useSelector } from "react-redux";

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

  // hooks for display toast
  useToast({ isError, error, isSuccess, data: metaData });

  const tabList: string[] = useSelector(
    (state: RootState) => state.meta.tabList
  );

  const [currentTab, setCurrentTab] = useState<string>("surahs"); // default tab

  if (isLoading || isFetching || !tabList) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Bismillah
        classNameParent="mt-0 mb-0 px-0"
        classNameArabic="text-sm md:text-xl"
        classNameEnglish="text-xs md:text-lg"
      />
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="2xl:min-w-7xl xl:min-w-4xl lg:min-w-2xl md:min-w-md min-w-3xs p-2 md:gap-0 gap-2">
          {tabList &&
            tabList?.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="capitalize cursor-pointer px-2 md:px-10"
              >
                {tab}
              </TabsTrigger>
            ))}
        </TabsList>
        <OverView currentTab={currentTab} />
      </Tabs>
    </div>
  );
};

export default HomePage;
