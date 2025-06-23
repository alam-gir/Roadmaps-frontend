import {
  QueryClient,
  useMutation,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import type { ApiException } from "~/lib/axios";
import { queryClient } from "~/lib/queryClient";
import {
  getRoadmapById,
  getRoadmaps,
  upvoteToRoadmapByRoadmapId,
} from "~/services/roadmapService";
import type {
  TApiResponse,
  TPaginatedApiResponse,
} from "~/types/apiResponseTypes";
import type { TRoadmap, TRoadmapParams } from "~/types/roadmapTypes";

export const useRoadmaps = (
  params: TRoadmapParams,
  options?: UseQueryOptions<TPaginatedApiResponse<TRoadmap>, ApiException>
) => {
  return useQuery({
    queryKey: ["roadmaps", params],
    queryFn: () => getRoadmaps(params),
    ...options,
  });
};

export const useRoadmap = (
  id: string,
  options?: UseQueryOptions<TApiResponse<TRoadmap>, ApiException>
) => {
  return useQuery({
    queryKey: ["roadmap", "roadmap-" + id],
    queryFn: () => getRoadmapById(id),
    enabled: !!id,
    ...options,
  });
};

export const useRoamdapUpvoteMutation = () => {
  return useMutation({
    mutationFn: upvoteToRoadmapByRoadmapId,
    onMutate: async (roadmapId) =>
      updateRoamampsInAllCache(roadmapId, queryClient, roadmapUpvoteUpdateFn),
    onError: (error, roadmapId, context) => {
      if (!context?.oldDataMap) return;

      for (const [key, value] of context.oldDataMap.entries()) {
        queryClient.setQueryData(key, value);
      }
    },
  });
};

// helpers

export const updateRoamampsInAllCache = (
  roadmapId: string,
  queryClient: QueryClient,
  updateFn: (item: TRoadmap) => TRoadmap
) => {
  // get all the keys related to 'roadmaps'
  const keys = queryClient
    .getQueryCache()
    .findAll({ queryKey: ["roadmaps"] })
    .map((item) => item.queryKey);

  // store old data to access in the context on error
  const oldDataMap = new Map<
    readonly unknown[],
    TPaginatedApiResponse<TRoadmap>
  >();

  keys.forEach((key) => {
    const data = queryClient.getQueryData<TPaginatedApiResponse<TRoadmap>>(key);
    if (!data) return;

    oldDataMap.set(key, data);

    const updatedContent = data.data.content.map((item) => {
      return item.id.toString() === roadmapId ? updateFn(item) : item;
    });

    const updatedData = {
      ...data,
      data: {
        ...data.data,
        content: updatedContent,
      },
    };

    queryClient.setQueryData(key, updatedData);
  });

  return { oldDataMap };
};

const roadmapUpvoteUpdateFn = (item: TRoadmap) => {
  if (item.hasVote) {
    return {
      ...item,
      hasVote: false,
      totalUpvote: item.totalUpvote - 1,
    } satisfies TRoadmap;
  } else {
    return {
      ...item,
      hasVote: true,
      totalUpvote: item.totalUpvote + 1,
    } satisfies TRoadmap;
  }
};

const roadmapAddCommentUpdateFn = (item: TRoadmap) => {
  return {
    ...item,
    totalComment: item.totalComment + 1,
  } satisfies TRoadmap;
};

const roadmapRemoveCommentUpdateFn = (item: TRoadmap) => {
  return {
    ...item,
    totalComment: item.totalComment - 1,
  } satisfies TRoadmap;
};
