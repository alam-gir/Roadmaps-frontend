import axiosInstance, { ThrowAxiosError } from "~/lib/axios";
import type { TApiResponse } from "~/types/apiResponseTypes";
import type { TUser } from "~/types/userTypes";

export const getUserProfile = async () : Promise<TApiResponse<TUser>> => {
    try {
        const response = await axiosInstance.get("/users/me");
        return response.data;
    } catch (error) {
        throw ThrowAxiosError(error);
    }
}