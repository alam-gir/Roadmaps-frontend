
export type TLoginCredential = {
    email: string;
    password: string;
}

export interface TSignupCredential extends TLoginCredential {
    name: string;
    confirmPassword: string;
}

export type TVerifyEmailParam = {
    email: string;
    token: string;
}