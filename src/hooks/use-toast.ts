import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

interface ToastProps {
  isError?: boolean;
  isSuccess?: boolean;
  error?: FetchBaseQueryError | SerializedError;
  data?: {
    status: string;
    code: number;
  };
  isLoading?: boolean;
  isFetching?: boolean;
}

const useToast = (props: ToastProps) => {
  const { isError, isSuccess, data, error, isLoading, isFetching } = props;

  const [successToastShown, setSuccessToastShown] = useState(false);
  const [loadingToastId, setLoadingToastId] = useState<string | number | null>(
    null
  );

  useEffect(() => {
    // Handle Loading Toast (only show when actively loading)
    if ((isLoading || isFetching) && !isError && !isSuccess) {
      if (!loadingToastId) {
        const id = toast.loading("Loading...");
        setLoadingToastId(id);
      }
    } else if (loadingToastId) {
      toast.dismiss(loadingToastId);
      setLoadingToastId(null);
    }

    // Handle Error Toast
    if (isError && error) {
      let description = "Something went wrong";
      if ("status" in error) {
        const errorData = error.data as { message?: string };
        description = errorData?.message || `Error: ${error.status}`;
      } else if ("message" in error && error.message) {
        description = error.message;
      }
      toast.error("Error", { description });
      toast.dismiss(loadingToastId!);
      setLoadingToastId(null);
    }

    // Handle Success Toast
    if (isSuccess && data && !successToastShown) {
      toast.success("Success", {
        description: `Status: ${data.status}, Code: ${data.code}`,
      });
      setSuccessToastShown(true);
    }
  }, [
    isError,
    isSuccess,
    data,
    error,
    isLoading,
    isFetching,
    successToastShown,
    loadingToastId,
  ]);
};

export default useToast;
