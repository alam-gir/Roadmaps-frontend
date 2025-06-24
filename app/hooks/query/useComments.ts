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
import type { TPaginatedApiResponse } from "~/types/apiResponseTypes";
import { type TComment, type TCommentReply } from "~/types/commentTypes";

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

    // TODO : at update i need to change this internal workings. now its for both, a comment and for a reply. But it should be distinguish. Now compromise performance.
    onMutate: async ({ commentId, roadmapId }) => {
      queryClient.cancelQueries({ queryKey: ["comments", { roadmapId }] });
      queryClient.cancelQueries({ queryKey: ["replies", { commentId }] });

      const oldComments = queryClient.getQueryData<
        TPaginatedApiResponse<TComment>
      >(["comments", { roadmapId }]);
      const oldReplies = queryClient.getQueryData<
        TPaginatedApiResponse<TCommentReply>
      >(["replies", commentId]);

      // update comment upvote
      if (oldComments) {
        const updateCommentsContent = oldComments.data.content.map((item) => {
          if (item.id === commentId) {
            if (item.hasVote) {
              return {
                ...item,
                hasVote: false,
                totalUpvote: item.totalUpvote - 1,
              };
            } else {
              return {
                ...item,
                hasVote: true,
                totalUpvote: item.totalUpvote + 1,
              };
            }
          }

          return item;
        });

        const updatedComments = {
          ...oldComments,
          data: {
            ...oldComments?.data,
            content: updateCommentsContent,
          },
        };

        queryClient.setQueryData(["comments", { roadmapId }], updatedComments);
      }

      // update reply upvote
      if (oldReplies) {
        const updatedRepliesContent = oldReplies.data.content.map((item) => {
          if (item.id === commentId) {
            if (item.hasVote) {
              return {
                ...item,
                hasVote: false,
                totalUpvote: item.totalUpvote - 1,
              };
            } else {
              return {
                ...item,
                hasVote: true,
                totalUpvote: item.totalUpvote + 1,
              };
            }
          }

          return item;
        });

        const updatedReplies = {
          ...oldReplies,
          data: {
            ...oldReplies.data,
            content: updatedRepliesContent,
          },
        };

        queryClient.setQueryData(["replies", { commentId }], updatedReplies);
      }
    },
  });
};

// helper
