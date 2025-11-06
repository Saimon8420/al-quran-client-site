import MultipleTranslationView from "@/components/ui/multiple-translation-view/multiple-translation-view";
import SurahHeader from "@/components/ui/surah-header/surah-header";
import { type TransformedAyah } from "@/lib/quranUtlis";

interface RukuViewProps {
  data: TransformedAyah;
}

const RukuView = ({ data }: RukuViewProps) => {
  return (
    <div>
      {/* Header */}
      {data.surah !== null && <SurahHeader surah={data.surah} />}
      <MultipleTranslationView data={data} />
    </div>
  );
};

export default RukuView;
