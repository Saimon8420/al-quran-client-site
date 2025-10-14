import { TabsContent } from "@/components/ui/tabs";
import SurahOverView from "./surah-overview/SurahOverView";
import PagesOverView from "./pages-overview/PagesOverView";
import RukusOverView from "./rukus-overview/RukusOverView";
import ManzilsOverView from "./manzils-overview/ManzilsOverView";
import JuzsOverView from "./juzs-overview/JuzsOverView";
import SajdaOverView from "./sajda-overview/SajdaOverView";
import HizbOverView from "./hizb-overview/HizbOverView";

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
};

const OverView = ({ currentTab }: OverViewProps) => {
  return (
    <TabsContent value={currentTab}>
      {tabComponents[currentTab] || null}
    </TabsContent>
  );
};

export default OverView;
