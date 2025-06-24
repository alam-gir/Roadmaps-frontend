import { useMutation } from "@tanstack/react-query";
import { getEmailVerificationLink, login, logout, signup, verifyEmail } from "~/services/authService";

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: login
    })
}

export const useSignupMutation = () => {
    return useMutation({
        mutationFn: signup
    })
}

export const useLogoutMutation = () => {
    return useMutation({
        mutationFn: logout
    })
}

export const useVerifyEmailMutation = () => {
    return useMutation({
        mutationFn: verifyEmail
    })
}

export const getEmailVerificationLinkMutation = () => {
    return useMutation({
        mutationFn: getEmailVerificationLink
    })
}