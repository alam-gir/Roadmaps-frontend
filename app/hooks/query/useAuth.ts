import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { TLoginFormData, TSignupFormData } from "~/lib/zod-schema/auth";
import {
  getEmailVerificationLink,
  login,
  logout,
  signup,
  verifyEmail,
} from "~/services/authService";
import type { TApiError, TApiResponse } from "~/types/apiResponseTypes";

export const useLoginMutation = (
  options?: Omit<
    UseMutationOptions<TApiResponse<null>, TApiError, TLoginFormData>,
    "mutationFn"
  >
) => {
  return useMutation({
    mutationFn: login,
    ...options,
  });
};

export const useSignupMutation = (
  options?: Omit<
    UseMutationOptions<TApiResponse<null>, TApiError, TSignupFormData>,
    "mutationFn"
  >
) => {
  return useMutation({
    mutationFn: signup,
    ...options
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logout,
  });
};

export const useVerifyEmailMutation = () => {
  return useMutation({
    mutationFn: verifyEmail,
  });
};

export const getEmailVerificationLinkMutation = () => {
  return useMutation({
    mutationFn: getEmailVerificationLink,
  });
};
