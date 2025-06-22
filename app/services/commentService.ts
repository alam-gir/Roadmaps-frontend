import axiosInstance, { ThrowAxiosError } from "~/lib/axios";
import type {
  TApiResponse,
  TPaginatedApiResponse,
} from "~/types/apiResponseTypes";
import type {
  TComment,
  TCommentParam,
  TCommentReply,
  TCommentRequest,
} from "~/types/commentTypes";

export const getCommentsByRoadmapId = async (
  roadmapId: string,
  params?: TCommentParam
): Promise<TPaginatedApiResponse<TComment>> => {
  try {
    const response = await axiosInstance.get(
      "/roadmaps/" + roadmapId + "/comments",
      {
        params: params,
      }
    );
    return response.data;
  } catch (error) {
    throw ThrowAxiosError(error);
  }
};

export const getCommentRepliesByCommentId = async (
  commentId: string,
  params?: TCommentParam
): Promise<TPaginatedApiResponse<TCommentReply>> => {
  try {
    const response = await axiosInstance.get(
      "/roadmaps/comments/" + commentId + "/replies",
      {
        params: params,
      }
    );
    return response.data;
  } catch (error) {
    throw ThrowAxiosError(error);
  }
};

export const commentToRoadmapByRoadmapId = async ({
  roadmapId,
  comment,
}: {
  roadmapId: string;
  comment: TCommentRequest;
}): Promise<TApiResponse<TComment>> => {
  try {
    const formData = new FormData();
    if (comment.text) formData.append("text", comment.text);
    if (comment.image) formData.append("image", comment.image);

    const response = await axiosInstance.post(
      "/roadmaps/" + roadmapId + "/comments",
      formData
    );
    return response.data;
  } catch (error) {
    throw ThrowAxiosError(error);
  }
};

export const replyToCommentByRoadmapIdAndCommentId = async ({
  roadmapId,
  commentId,
  comment,
}: {
  roadmapId: string;
  commentId: string;
  comment: TCommentRequest;
}): Promise<TApiResponse<TCommentReply>> => {
  try {
    const formData = new FormData();
    if (comment.text) formData.append("text", comment.text);
    if (comment.image) formData.append("image", comment.image);

    const response = await axiosInstance.post(
      "/roadmaps/" + roadmapId + "/comments/" + commentId + "/comments",
      formData
    );
    return response.data;
  } catch (error) {
    throw ThrowAxiosError(error);
  }
};
