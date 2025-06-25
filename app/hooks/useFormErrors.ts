import { useState } from "react";
import type { FieldErrors } from "react-hook-form";
import type { TApiError } from "~/types/apiResponseTypes";

export const useFormErrors = () => {
  const [apiFieldErrors, setApiFieldErrors] = useState<Record<string, string>>(
    {}
  );
  const [apiGeneralError, setApiGeneralError] = useState("");

  const handleApiFormError = (error: TApiError) => {
    setApiFieldErrors({});
    setApiGeneralError("");

    if ("validationErrors" in error && error.validationErrors) {
      const fieldErrors: Record<string, string> = {};
      error.validationErrors.forEach(
        (item) => (fieldErrors[item.field] = item.message)
      );
      setApiFieldErrors(fieldErrors);
    } else {
      setApiGeneralError(
        error.message || "Unknown error occured, try again later!"
      );
    }
  };

  const clearApiErrors = () => {
    setApiFieldErrors({});
    setApiGeneralError("");
  };

  const getFieldError = (field: string, formErrors?: FieldErrors) => {
    // at first check form error from client,
    return (formErrors?.[field]?.message as string) || apiFieldErrors[field];
  };

  return {
    apiFieldErrors,
    apiGeneralError,
    handleApiFormError,
    clearApiErrors,
    getFieldError,
  };
};
