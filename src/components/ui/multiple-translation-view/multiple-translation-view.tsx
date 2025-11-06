import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Badge } from "../badge";
import { toArabicNumerals } from "@/lib/quranUtlis";

interface MultipleTranslationViewProps {
  data: {
    numberInSurah: number;
    text: string;
    text1?: string;
    text2?: string;
    audio?: string;
  };
  children?: React.ReactNode;
}

const MultipleTranslationView = ({
  data,
  children,
}: MultipleTranslationViewProps) => {
  return (
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
          <span className="text-sm bg-primary text-primary-foreground rounded-full px-2 py-1 mr-1">
            ۝{toArabicNumerals(data.numberInSurah)}
          </span>
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

        {children}
      </CardContent>
    </Card>
  );
};

export default MultipleTranslationView;
