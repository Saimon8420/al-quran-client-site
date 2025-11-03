import { useMemo, useState } from "react";
import { SearchForm } from "@/components/search-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OverViewLayout from "./over-view-layout";

interface OverViewListProps<T> {
  data: T[];
  searchLabel: string;
  searchPlaceholder: string;
  filterFn: (item: T, searchTerm: string) => boolean;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export const OverViewList = <T,>({
  data,
  searchLabel,
  searchPlaceholder,
  filterFn,
  renderItem,
}: OverViewListProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((item) => filterFn(item, searchTerm));
  }, [data, searchTerm, filterFn]);

  return (
    <OverViewLayout>
      <div>
        <SearchForm
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="my-4"
          label={searchLabel}
          placeholder={searchPlaceholder}
        />
        <div className="flex w-full flex-col gap-2 my-4 p-1 cursor-pointer">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => renderItem(item, index))
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Results Found</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Your search for "{searchTerm}" did not return any results.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </OverViewLayout>
  );
};
