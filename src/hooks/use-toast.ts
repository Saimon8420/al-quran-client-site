import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

interface toastPropses {
  isError?: boolean;
  isSuccess?: boolean;
  error?: FetchBaseQueryError | SerializedError;
  data?: {
    status: string;
    code: number;
  };
}

const useToast = (propses: toastPropses) => {
  const [successToastShown, setSuccessToastShown] = useState(false);
  const { isError, isSuccess, data, error } = propses;
  return useEffect(() => {
    if (isError && error) {
      let description = "Something went wrong";
      if ("status" in error) {
        // FetchBaseQueryError
        const errorData = error.data as {
          message: string | unknown;
        };
        if (errorData && typeof errorData.message === "string") {
          description = errorData.message;
        } else {
          description = `Error: ${error.status}`;
        }
      } else if (error.message) {
        // SerializedError
        description = error.message;
      }
      toast.error("Error", {
        description,
        closeButton: true,
        duration: 3000,
      });
    }
    if (isSuccess && data && !successToastShown) {
      toast.success("Success", {
        description: `Status : ${data.status}, Code : ${data.code}`,
        closeButton: true,
        duration: 3000,
      });
      setSuccessToastShown(true);
    }
  }, [isError, error, isSuccess, data, successToastShown]);
};

export default useToast;
