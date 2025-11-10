import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetSearchDataQuery } from "@/components/redux/api/quranSearchApi";
import Loader from "@/components/ui/loader/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { quranBaseApi } from "@/components/redux/api/baseApi";
import OverViewLayout from "../common/over-view-layout";
import { useRef, useState } from "react";
import useToast from "@/hooks/use-toast";
import { useNavigate } from "react-router";

const SearchOverView = () => {
  const [submittedTerm, setSubmittedTerm] = useState<string>("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { data, isLoading, isFetching, isError, error, isSuccess } =
    useGetSearchDataQuery({ query: submittedTerm }, { skip: !submittedTerm });

  useToast({
    isError,
    error,
    isLoading,
    isFetching,
    isSuccess,
    data: { status: data?.status, code: data?.code },
  });

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

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <OverViewLayout>
      <div className="flex flex-col p-2 gap-2 max-w-7xl">
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

        {!submittedTerm && (
          <p className="text-sm text-muted-foreground">
            only english text is supported. e.g: abraham , muhammad, human
          </p>
        )}

        {!isSuccess && submittedTerm && (
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

        <div className="flex flex-col gap-2">
          {!isError && data?.data?.count && (
            <p className="text-sm text-muted-foreground">
              Total count : {data.data.count}
            </p>
          )}
          {/* ✅ Results section */}
          {!isError &&
            data?.data &&
            data?.data?.count > 0 &&
            data?.data?.matches?.map((item: any, index) => (
              <Card
                key={index}
                className="cursor-pointer"
                onClick={() =>
                  navigate(`/search/${item.surah.number}/${item.numberInSurah}`)
                }
              >
                <CardHeader>
                  <CardTitle>
                    {item.surah?.englishName} — {item.numberInSurah}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {item.text} [{item.surah.number}:{item.numberInSurah}]
                  </p>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </OverViewLayout>
  );
};

export default SearchOverView;
