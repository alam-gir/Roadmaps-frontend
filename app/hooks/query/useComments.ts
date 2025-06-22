import { useMutation, useQuery } from "@tanstack/react-query";
import {
  commentToRoadmapByRoadmapId,
  getCommentRepliesByCommentId,
  getCommentsByRoadmapId,
  replyToCommentByRoadmapIdAndCommentId,
  upvoteTocommentBycommentId,
} from "~/services/commentService";

export const useCommentsOfRoadmap = (roadmapId: string) => {
  return useQuery({
    queryKey: ["roadmap-comments", "roadmap-" + roadmapId + "-comments"],
    queryFn: () => getCommentsByRoadmapId(roadmapId),
    enabled: !!roadmapId,
  });
};

export const useRepliesOfComments = (commentId: string) => {
  return useQuery({
    queryKey: ["comment-replies", "comment-" + commentId + "-replies"],
    queryFn: () => getCommentRepliesByCommentId(commentId),
    enabled: !!commentId,
  });
};

export const useCommentMutation = () => {
  return useMutation({
    mutationKey: ["roadmap-comments"],
    mutationFn: commentToRoadmapByRoadmapId,
  });
};

export const useCommentReplyMutation = () => {
  return useMutation({
    mutationKey: ["comment-replies"],
    mutationFn: replyToCommentByRoadmapIdAndCommentId,
  });
};

export const useCommentUpvoteMutation = () => {
    return useMutation({
        mutationKey: ["roadmap-comments", "comment-replies"],
        mutationFn: upvoteTocommentBycommentId
    })
}
