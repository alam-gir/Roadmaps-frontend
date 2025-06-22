import axios, { AxiosError } from "axios";
import type {
  TApiError,
  TValidationError,
  TValidationErrorField,
} from "~/types/apiResponseTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Error configuration for backend error reponse

const isValidationError = (error: TApiError): error is TValidationError => {
  return "validationErrors" in error;
};

export class ApiException extends Error {
  public errorCode: string;
  public path: string;
  public timeStamp: string;
  public validationErrors?: TValidationErrorField[];

  constructor(apiError: TApiError) {
    super(apiError.message);
    this.errorCode = apiError.errorCode;
    this.path = apiError.path;
    this.timeStamp = apiError.timeStamp;

    if (isValidationError(apiError)) {
      this.validationErrors = apiError.validationErrors;
    }
  }
}

export const ThrowAxiosError = (error: unknown) : never => {
  if (axios.isAxiosError(error)) {
     const axiosError = error as AxiosError<TApiError>

     if(axiosError.response?.data){
        // so now throwing the structured error what actually my backend responding if error.
        throw new ApiException(axiosError.response.data);
     } else{
        throw new Error(error.message || "Network error!");
     }
  }

  if (error instanceof Error) {
    throw error;
  }

  throw new Error("Unknown error occurred!");
};
export default axiosInstance;
