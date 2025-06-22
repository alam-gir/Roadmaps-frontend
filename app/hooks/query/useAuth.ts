import { useMutation } from "@tanstack/react-query";
import { login, logout, signup } from "~/services/authService";
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