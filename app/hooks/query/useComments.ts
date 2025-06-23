import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "~/lib/queryClient";
import {
  commentToRoadmapByRoadmapId,
  getCommentRepliesByCommentId,
  getCommentsByRoadmapId,
  replyToCommentByRoadmapIdAndCommentId,
  upvoteTocommentBycommentId,
} from "~/services/commentService";
import {
  roadmapAddCommentUpdateFn,
  updateRoamampsInAllCache,
} from "./useRoadmaps";

export const useCommentsOfRoadmap = (roadmapId: string) => {
  return useQuery({
    queryKey: ["comments", { roadmapId }],
    queryFn: () => getCommentsByRoadmapId(roadmapId),
    enabled: !!roadmapId,
  });
};

export const useRepliesOfComments = (commentId: string) => {
  return useQuery({
    queryKey: ["replies", { commentId }],
    queryFn: () => getCommentRepliesByCommentId(commentId),
    enabled: !!commentId,
  });
};

export const useCommentMutation = () => {
  return useMutation({
    mutationFn: commentToRoadmapByRoadmapId,

    onMutate: async ({ roadmapId }) => {
      await queryClient.cancelQueries({
        queryKey: ["comments", { roadmapId }],
      });

      const oldRoadmaps = updateRoamampsInAllCache(
        roadmapId,
        queryClient,
        roadmapAddCommentUpdateFn
      );

      return { oldRoadmaps, roadmapId };
    },

    onError: (error, {}, context) => {
      if (context?.oldRoadmaps.oldDataMap) {
        for (const [key, value] of context.oldRoadmaps.oldDataMap.entries()) {
          queryClient.setQueryData(key, value);
        }
      }
    },

    onSettled: (res, error, {}, context) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", { roadmapId: context?.roadmapId }],
      });
    },
  });
};

export const useCommentReplyMutation = () => {
  return useMutation({
    mutationFn: replyToCommentByRoadmapIdAndCommentId,
    onMutate: async ({ commentId, roadmapId }) => {
      await queryClient.cancelQueries({
        queryKey: ["replies", { commentId }],
      });

      const oldRoadmaps = updateRoamampsInAllCache(
        roadmapId,
        queryClient,
        roadmapAddCommentUpdateFn
      );

      return { oldRoadmaps, roadmapId, commentId };
    },

    onError: (error, {}, context) => {
      if (context?.oldRoadmaps.oldDataMap) {
        for (const [key, value] of context.oldRoadmaps.oldDataMap.entries()) {
          queryClient.setQueryData(key, value);
        }
      }
    },

    onSettled: (res, error, {}, context) => {
      queryClient.invalidateQueries({
        queryKey: ["replies", { roadmapId: context?.commentId }],
      });
    },
  });
};

export const useCommentUpvoteMutation = () => {
  return useMutation({
    mutationFn: upvoteTocommentBycommentId,
  });
};
