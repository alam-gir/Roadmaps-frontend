import { useMutation, useQuery, type UseQueryOptions } from "@tanstack/react-query"
import type { ApiException } from "~/lib/axios"
import { getRoadmapById, getRoadmaps, upvoteToRoadmapByRoadmapId } from "~/services/roadmapService"
import type { TApiResponse, TPaginatedApiResponse } from "~/types/apiResponseTypes"
import type { TRoadmap, TRoadmapParams } from "~/types/roadmapTypes"

export const useRoadmaps = (
    params: TRoadmapParams,
    options?: UseQueryOptions<TPaginatedApiResponse<TRoadmap>, ApiException>
) => {
    return useQuery({
        queryKey: ['Roadmaps', params],
        queryFn: () => getRoadmaps(params),
        ...options
    })
}

export const userRoadmap = (
    id: string,
    options?: UseQueryOptions<TApiResponse<TRoadmap>, ApiException>
) => {
    return useQuery({
        queryKey: ['Roadmaps', 'Roadmap-' + id],
        queryFn: () => getRoadmapById(id),
        enabled: !!id,
        ...options
    })
}

export const useRoamdapUpvoteMutation = () => {
    return useMutation({
        mutationKey: ["roadmaps", "comment-replies"],
        mutationFn: upvoteToRoadmapByRoadmapId
    })
}
