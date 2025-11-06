import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import MultipleTranslationView from "@/components/ui/multiple-translation-view/multiple-translation-view";
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
      <MultipleTranslationView data={data}>
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
      </MultipleTranslationView>
    </div>
  );
};

export default SajdaView;
