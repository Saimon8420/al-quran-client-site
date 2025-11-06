import Loader from "@/components/ui/loader/loader";
import { TabsContent } from "@/components/ui/tabs";
import { lazy, Suspense } from "react";
const SearchOverView = lazy(() => import("./search-overview/SearchOverView"));
const SurahOverView = lazy(() => import("./surah-overview/SurahOverView"));
const JuzsOverView = lazy(() => import("./juzs-overview/JuzsOverView"));
const RukusOverView = lazy(() => import("./rukus-overview/RukusOverView"));
const SajdaOverView = lazy(() => import("./sajda-overview/SajdaOverView"));
const HizbOverView = lazy(() => import("./hizb-overview/HizbOverView"));
const PagesOverView = lazy(() => import("./pages-overview/PagesOverView"));
const ManzilsOverView = lazy(
  () => import("./manzils-overview/ManzilsOverView")
);

interface OverViewProps {
  currentTab: string;
}

const tabComponents: Record<string, React.ReactNode> = {
  surahs: <SurahOverView />,
  juzs: <JuzsOverView />,
  manzils: <ManzilsOverView />,
  pages: <PagesOverView />,
  rukus: <RukusOverView />,
  sajdas: <SajdaOverView />,
  hizbQuarters: <HizbOverView />,
  search: <SearchOverView />,
};

const OverView = ({ currentTab }: OverViewProps) => {
  return (
    <TabsContent value={currentTab}>
      <Suspense
        key={currentTab}
        fallback={
          <div className="flex items-center justify-center mt-14">
            <Loader />
          </div>
        }
      >
        {tabComponents[currentTab] || null}
      </Suspense>
    </TabsContent>
  );
};

export default OverView;
