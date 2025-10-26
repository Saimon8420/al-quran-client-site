import { FileX } from "lucide-react";

const NoDataFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <FileX className="w-12 h-12 mb-4" />
      <h2 className="text-xl font-semibold">No Data Found</h2>
      <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
        There is no data to display at the moment.
      </p>
    </div>
  );
};

export default NoDataFound;
