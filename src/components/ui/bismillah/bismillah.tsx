import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BismillahProps {
  surahName?: string;
  classNameParent?: string;
  classNameArabic?: string;
  classNameEnglish?: string;
}

const Bismillah: React.FC<BismillahProps> = ({
  surahName,
  classNameParent,
  classNameArabic,
  classNameEnglish,
}) => {
  // Skip Bismillah for Surah At-Tawbah
  if (surahName?.toLowerCase() === "at-tawba") return null;

  return (
    <motion.div
      className={cn(
        "flex justify-center items-center flex-col mt-6 mb-10 px-4",
        classNameParent
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Card className="bg-background shadow-md border max-w-2xl text-center rounded-2xl p-6">
        <CardContent>
          <p
            className={cn(
              "text-4xl sm:text-xl md:text-2xl font-[Amiri] leading-snug tracking-wide",
              classNameArabic
            )}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>

          <Separator className="my-4 w-1/3 mx-auto" />

          <p className={cn("italic text-sm sm:text-xl", classNameEnglish)}>
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Bismillah;
