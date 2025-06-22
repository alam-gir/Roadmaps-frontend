import axiosInstance, { ThrowAxiosError } from "~/lib/axios";
import type {
  TApiResponse,
  TPaginatedApiResponse,
} from "~/types/apiResponseTypes";
import type { TRoadmap, TRoadmapParams } from "~/types/roadmapTypes";

export const getRoadmaps = async (
  params: TRoadmapParams
): Promise<TPaginatedApiResponse<TRoadmap>> => {
  try {
    const response = axiosInstance.get("/roadmaps", {
      params,
    });

    return (await response).data;
  } catch (e) {
    throw ThrowAxiosError(e);
  }
};

export const getRoadmapById = async (
  id: string
): Promise<TApiResponse<TRoadmap>> => {
  try {
    const response = axiosInstance.get("/roadmap/" + id);
    return (await response).data;
  } catch (e) {
    throw ThrowAxiosError(e);
  }
};

export const upvoteToRoadmapByRoadmapId = async (
  roadmapId: string
): Promise<TApiResponse<null>> => {
  try {
    const response = await axiosInstance.post(
      "/roadmaps/" + roadmapId + "/upvotes"
    );
    return response.data;
  } catch (error) {
    throw ThrowAxiosError(error);
  }
};
