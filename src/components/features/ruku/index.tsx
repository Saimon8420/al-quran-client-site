import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SurahHeader from "@/components/ui/surah-header/surah-header";
import type { TransformedAyah } from "@/lib/quranUtlis";

interface RukuViewProps {
  data: TransformedAyah;
}

const RukuView = ({ data }: RukuViewProps) => {
  return (
    <div>
      {/* Header */}
      {data.surah !== null && <SurahHeader surah={data.surah} />}

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold">
            <div className="flex items-center justify-between">
              <Badge variant={"outline"} className="p-1">
                Verse {data.numberInSurah}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-right arabic-text text-4xl md:text-4xl leading-loose mb-2 text-foreground border-b">
            {data.text}
          </p>
          {data.text1 && (
            <p className="text-md text-muted-foreground py-2 border-b">
              <span className="font-semibold"></span> {data.text1}
            </p>
          )}
          {data.text2 && (
            <p className="text-md text-muted-foreground py-2 border-b">
              <span className="font-semibold"></span> {data.text2}
            </p>
          )}
          {data.audio && (
            <audio controls className="w-full mt-4">
              <source src={data.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RukuView;
