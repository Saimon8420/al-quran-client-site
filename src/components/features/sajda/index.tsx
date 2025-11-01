import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SurahHeader from "@/components/ui/surah-header/surah-header";
import type { TransformedAyah } from "@/lib/quranUtlis";
import { ShieldCheck, ShieldX } from "lucide-react";

interface SajdaViewProps {
  data: TransformedAyah;
}

const SajdaView = ({ data }: SajdaViewProps) => {
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
          <div
            dir="rtl"
            className="flex flex-wrap text-right arabic-text text-4xl md:text-4xl leading-loose mb-2 text-foreground border-b"
          >
            <span>{data.text.split(" ").slice(0, -1).join(" ")}</span>
            <span className="mr-2">{data.text.split(" ").at(-1)}</span>
          </div>
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
          <Alert className="mt-4">
            <AlertTitle className="font-semibold">Sajda Information</AlertTitle>
            <AlertDescription>
              {typeof data.sajda === "object" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                  <div className="flex items-center gap-3 bg-background/50 p-3 rounded-lg border">
                    {data.sajda.obligatory ? (
                      <ShieldCheck className="size-6 text-primary" />
                    ) : (
                      <ShieldX className="size-6 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-medium">Obligatory</p>
                      <p className="text-sm text-muted-foreground">
                        {data.sajda.obligatory
                          ? "This is an obligatory sajdah."
                          : "Not an obligatory sajdah."}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-background/50 p-3 rounded-lg border">
                    {data.sajda.recommended ? (
                      <ShieldCheck className="size-6 text-primary" />
                    ) : (
                      <ShieldX className="size-6 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-medium">Recommended</p>
                      <p className="text-sm text-muted-foreground">
                        {data.sajda.recommended
                          ? "This is a recommended sajdah."
                          : "Not a recommended sajdah."}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="py-2">No Sajda on this Ayah.</p>
              )}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default SajdaView;
