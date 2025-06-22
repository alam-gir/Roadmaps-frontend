import axiosInstance, { ThrowAxiosError } from "~/lib/axios";
import type { TApiResponse } from "~/types/apiResponseTypes";
import type {
  TLoginCredential,
  TSignupCredential,
  TVerifyEmailParam,
} from "~/types/authenticationTypes";

export const login = async (
  loginCredential: TLoginCredential
): Promise<TApiResponse<null>> => {
  try {
    const formData = new FormData();
    formData.append("email", loginCredential.email);
    formData.append("password", loginCredential.password);

    const resposne = await axiosInstance.post("/auth/login", formData);

    return resposne.data;
  } catch (error) {
    throw ThrowAxiosError(error);
  }
};

export const signup = async (
  signupCredential: TSignupCredential
): Promise<TApiResponse<null>> => {
  try {
    const formData = new FormData();
    formData.append("name", signupCredential.name);
    formData.append("email", signupCredential.email);
    formData.append("password", signupCredential.password);

    const response = await axiosInstance.post("/auth/signup", formData);
    return response.data;
  } catch (error) {
    throw ThrowAxiosError(error);
  }
};

export const logout = async (): Promise<TApiResponse<null>> => {
  try {
    const response = await axiosInstance.get("/auth/logout");
    return response.data;
  } catch (error) {
    throw ThrowAxiosError(error);
  }
};

export const verifyEmail = async (
  params: TVerifyEmailParam
): Promise<TApiResponse<null>> => {
  try {
    const response = await axiosInstance.get("/auth/verify-email", {
      params,
    });
    return response.data;
  } catch (error) {
    throw ThrowAxiosError(error);
  }
};

export const getEmailVerificationLink = async (): Promise<
  TApiResponse<null>
> => {
  try {
    const response = await axiosInstance.get(
      "/auth/get-email-verification-link"
    );
    return response.data;
  } catch (error) {
    throw ThrowAxiosError(error);
  }
};
