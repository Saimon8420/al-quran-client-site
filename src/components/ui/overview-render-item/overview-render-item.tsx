import type {
  SectionReference,
  Surah,
} from "@/components/redux/slices/metaSlice";
import React from "react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../item";
import RenderRevelationImage from "@/components/features/over-view/common/RenderRevelationImage";
import { Badge } from "../badge";

interface OverviewRenderItemProps {
  // Define any props needed for the component
  data?: SectionReference;
  index?: number;
  surah?: Surah;
  navigate: (surah?: number, path?: string, ayah?: number) => void;
  path?: string;
  surahs?: { count: number; references: Surah[] };
}

const OverviewRenderItem: React.FC<OverviewRenderItemProps> = ({
  data,
  index,
  surah,
  navigate,
  surahs,
  path,
}) => {
  if (path === "surah" && surah) {
    return (
      <Item
        key={surah.number}
        variant="outline"
        className="flex items-center justify-between gap-4"
        onClick={() => navigate(surah.number, path)}
      >
        <div className="flex flex-wrap gap-4 sm:order-1 order-2 sm:ml-0 ml-auto">
          <ItemMedia
            variant="icon"
            className="flex flex-col items-center justify-center min-w-fit"
          >
            <span className="text-md font-bold">{surah.number}</span>
          </ItemMedia>

          <RenderRevelationImage revelationType={surah.revelationType} />

          <ItemContent>
            <ItemTitle className="text-lg font-semibold">
              {surah.englishName}
            </ItemTitle>
            <ItemDescription className="text-sm text-muted-foreground">
              {surah.englishNameTranslation}
            </ItemDescription>
          </ItemContent>
        </div>

        <ItemActions className="flex flex-col sm:order-2 order-1 sm:w-fit w-full  sm:items-start items-end">
          <div className="text-base w-full flex flex-wrap">
            <span className="font-arabic text-xl ml-auto">{surah.name}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            <Badge variant="default" className="text-xs font-bold">
              Ayahs {surah.numberOfAyahs}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {surah.revelationType}
            </Badge>
          </div>
        </ItemActions>
      </Item>
    );
  }
  if (path !== "surah" && data && typeof index === "number" && surahs) {
    const surah = surahs.references.find((s) => s.number === data.surah);
    if (!surah) return null;
    return (
      <Item
        key={index}
        variant="outline"
        className="flex items-center justify-between gap-4"
        onClick={() => {
          if (path === "sajda" || path === "ruku") {
            navigate(data.surah, path, data.ayah);
          } else {
            navigate(index + 1, path);
          }
        }}
      >
        <div className="flex flex-wrap gap-4 sm:order-1 order-2 sm:ml-0 ml-auto">
          <ItemMedia
            variant="icon"
            className="flex flex-col items-center justify-center min-w-fit"
          >
            <span className="text-md font-bold">{index + 1}</span>
          </ItemMedia>

          <RenderRevelationImage revelationType={surah.revelationType} />

          <ItemContent>
            <ItemTitle className="text-lg font-semibold">
              {surah.englishName}
            </ItemTitle>
            <ItemDescription className="text-sm text-muted-foreground">
              Ayah {data.ayah}
            </ItemDescription>
          </ItemContent>
        </div>

        <ItemActions className="flex flex-col sm:order-2 order-1 sm:w-fit w-full  sm:items-start items-end">
          <div className="text-base w-full flex flex-wrap">
            <span className="font-arabic text-xl ml-auto">{surah.name}</span>
          </div>
          {path === "sajda" && (
            <div className="flex flex-wrap items-end justify-end gap-2 mt-1 w-full">
              <Badge
                variant={data.recommended ? "default" : "secondary"}
                className="text-xs"
              >
                {data.recommended ? "Recommended" : "Obligatory"}
              </Badge>
            </div>
          )}
        </ItemActions>
      </Item>
    );
  }
};

export default React.memo(OverviewRenderItem);
