import { useMutation } from "@tanstack/react-query";
import { getEmailVerificationLink, login, logout, signup, verifyEmail } from "~/services/authService";
import type { TLoginCredential, TSignupCredential } from "~/types/authenticationTypes";

export const useLoginMutation = () => {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: login
    })
}

export const useSignupMutation = () => {
    return useMutation({
        mutationKey: ['signup'],
        mutationFn: signup
    })
}

export const useLogoutMutation = () => {
    return useMutation({
        mutationKey: ['logout'],
        mutationFn: logout
    })
}

export const useVerifyEmailMutation = () => {
    return useMutation({
        mutationKey: ['verify-email'],
        mutationFn: verifyEmail
    })
}

export const getEmailVerificationLinkMutation = () => {
    return useMutation({
        mutationKey: ['get-email-verification'],
        mutationFn: getEmailVerificationLink
    })
}