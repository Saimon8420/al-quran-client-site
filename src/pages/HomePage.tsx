import type { RootState } from "@/app/store";
import OverView from "@/components/features/over-view";
import { setCurrentTab } from "@/components/redux/slices/metaSlice";
import Bismillah from "@/components/ui/bismillah/bismillah";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const tabList: string[] = useSelector(
    (state: RootState) => state.meta.tabList
  );

  const extendedTabs = [...tabList, "search"];

  const currentTab = useSelector((state: RootState) => state.meta.currentTab);
  const dispactch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Bismillah
        classNameParent="mt-0 mb-0 px-0"
        classNameArabic="text-sm md:text-xl"
        classNameEnglish="text-xs md:text-lg"
      />
      <Tabs
        value={currentTab}
        onValueChange={(value) => dispactch(setCurrentTab(value))}
      >
        <TabsList className="2xl:min-w-7xl xl:min-w-4xl lg:min-w-2xl md:min-w-md min-w-3xs p-2 md:gap-0 gap-2">
          {extendedTabs &&
            extendedTabs.map((tab) => (
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
