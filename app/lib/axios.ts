import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
});

export const ThrowAxiosError = (error : any) => {
    if(axios.isAxiosError(error)){
        const message = error?.response?.data?.message || "Something went wrong!"
        throw new Error(message);
    }

    if(error instanceof Error) {
        throw error;
    }

    throw new Error(error?.message || "Unknown error occurred!");
}

export default axiosInstance;