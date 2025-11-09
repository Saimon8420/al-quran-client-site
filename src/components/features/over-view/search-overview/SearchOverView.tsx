import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetSearchDataQuery } from "@/components/redux/api/quranSearchApi";
import Loader from "@/components/ui/loader/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { quranBaseApi } from "@/components/redux/api/baseApi";
import useHanldeNavigate from "@/hooks/use-handle-navigate";
import OverviewRenderItem from "@/components/ui/overview-render-item/overview-render-item";
import OverViewLayout from "../common/over-view-layout";
import { useRef, useState } from "react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import RenderRevelationImage from "../common/RenderRevelationImage";
import { Badge } from "@/components/ui/badge";

const SearchOverView = () => {
  const [submittedTerm, setSubmittedTerm] = useState<string>("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();

  const { data, isLoading, isFetching, isError, error, isSuccess } =
    useGetSearchDataQuery({ query: submittedTerm }, { skip: !submittedTerm });

  // useToast({
  //   isError,
  //   error,
  //   isLoading,
  //   isFetching,
  //   isSuccess,
  //   data: { status: data?.status, code: data?.code },
  // });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(quranBaseApi.util.invalidateTags(["search-text"]));
    setSubmittedTerm("");
    const searchTerm = inputRef?.current;
    if (searchTerm) {
      setSubmittedTerm(searchTerm.value);
      inputRef.current === null;
    }
  };

  const handleNavigate = useHanldeNavigate();

  if ((isLoading || isFetching) && !data?.data && !isError) {
    return <Loader />;
  }

  if (isError && error) {
    let description: React.ReactNode = "Something went wrong";

    if ("status" in error) {
      if (typeof error.data === "string") {
        description = error.data;
      } else if (error.data && typeof error.data === "object") {
        const errData = error.data as Record<string, any>;
        description = (
          <div className="space-y-1 text-sm">
            <p>
              <b>Description:</b> {errData?.data || "N/A"}
            </p>
            <p>
              <b>Status:</b> {errData?.status || error.status || "Unknown"}
            </p>
            <p>
              <b>Code:</b> {errData?.code || "N/A"}
            </p>
          </div>
        );
      } else {
        description = `Error Status: ${error.status}`;
      }
    } else if ("message" in error && error.message) {
      description = error.message;
    }

    toast.error("Error", { description });
  }

  console.log(data?.data?.matches[0]);

  return (
    <OverViewLayout>
      <div className="flex flex-col">
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center gap-4"
        >
          <Input
            className="my-4"
            placeholder="Search the text of the Quran"
            lang="english"
            ref={inputRef}
          />
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={isFetching || isLoading}
          >
            Search
          </Button>
        </form>

        <div>
          {/* ✅ Results section */}
          {data?.data && data?.data?.count > 0 ? (
            data?.data?.matches?.map((item: any, index) => (
              // <OverviewRenderItem
              //   surah={item.surah}
              //   path="surah"
              //   key={item.number}
              //   navigate={handleNavigate}
              // />
              <Item
                key={index}
                variant="outline"
                className="flex items-center justify-between gap-4"
              >
                <div className="flex flex-wrap gap-4 sm:order-1 order-2 sm:ml-0 ml-auto">
                  <ItemMedia
                    variant="icon"
                    className="flex flex-col items-center justify-center min-w-fit"
                  >
                    <span className="text-md font-bold">{item.number}</span>
                  </ItemMedia>

                  <RenderRevelationImage
                    revelationType={item.surah.revelationType}
                  />

                  <ItemContent>
                    {/* <ItemTitle className="text-lg font-semibold overflow-hidden text-wrap">
                      {item.text}
                    </ItemTitle> */}
                    <ItemDescription className="text-sm text-muted-foreground">
                      {item.text}
                    </ItemDescription>
                  </ItemContent>
                </div>

                <ItemActions className="flex flex-col sm:order-2 order-1 sm:w-fit w-full  sm:items-start items-end">
                  <div className="text-base w-full flex flex-wrap">
                    <span className="font-arabic text-xl ml-auto">
                      {item.surah.name}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge variant="default" className="text-xs font-bold">
                      Ayahs {item.surah.numberOfAyahs}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {item.surah.revelationType}
                    </Badge>
                  </div>
                </ItemActions>
              </Item>
            ))
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Results Found</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Your search for "<b>{submittedTerm}</b>" did not return any
                  results.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </OverViewLayout>
  );
};

export default SearchOverView;
