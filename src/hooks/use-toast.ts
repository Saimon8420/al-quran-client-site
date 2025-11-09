import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

interface ToastProps {
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
  isFetching?: boolean;
  error?: FetchBaseQueryError | SerializedError;
  data?: {
    status?: string;
    code?: number;
    message?: string;
  };
}

const useToast = ({
  isError,
  isSuccess,
  isLoading,
  isFetching,
  error,
  data,
}: ToastProps) => {
  const [successShown, setSuccessShown] = useState(false);
  const [errorShown, setErrorShown] = useState(false);
  const [loadingToastId, setLoadingToastId] = useState<string | number | null>(
    null
  );

  useEffect(() => {
    // ✅ Handle Loading Toast
    if ((isLoading || isFetching) && !isError && !isSuccess) {
      if (!loadingToastId) {
        const id = toast.loading("Loading...");
        setLoadingToastId(id);
      }
    } else if (loadingToastId && !isLoading && !isFetching) {
      toast.dismiss(loadingToastId);
      setLoadingToastId(null);
    }

    // ✅ Handle Error Toast
    if (isError && error && !errorShown) {
      // Prevent double toasting by ensuring success is not active
      if (isSuccess) return;

      let description = "Something went wrong";

      if ("status" in error) {
        const errData =
          typeof error.data === "string"
            ? { message: error.data }
            : (error.data as Record<string, any> | undefined);

        if (errData && Object.keys(errData).length > 0) {
          description =
            errData.message ||
            errData.error ||
            Object.values(errData).join(" ") ||
            "Unexpected error occurred";
        } else {
          description = `Request failed with status ${error.status}`;
        }
      } else if ("message" in error && error.message) {
        description = error.message;
      }

      toast.error("Error", { description });
      toast.dismiss(loadingToastId ?? undefined);
      setLoadingToastId(null);
      setErrorShown(true);
      setSuccessShown(false);
    }

    // ✅ Handle Success Toast
    if (isSuccess && data && !successShown && !isError) {
      const descParts = [];
      if (data.status) descParts.push(`Status: ${data.status}`);
      if (data.code) descParts.push(`Code: ${data.code}`);
      if (data.message) descParts.push(`Message: ${data.message}`);

      toast.success("Success", {
        description: descParts.length ? descParts.join(", ") : undefined,
      });

      setSuccessShown(true);
      setErrorShown(false);
    }

    // ✅ Cleanup on reset (prepare for next request)
    if (!isLoading && !isFetching && !isError && !isSuccess) {
      setSuccessShown(false);
      setErrorShown(false);
    }
  }, [
    isError,
    isSuccess,
    isLoading,
    isFetching,
    error,
    data,
    successShown,
    errorShown,
    loadingToastId,
  ]);
};

export default useToast;
