export type TRoadmapParams = {
    page?: number;
    size?: number;
    sortBy?: 'popularity';
    orderBy?: 'ascending' | 'descending';
    statuses?: string[];
    categoryIds?: string[]
}

export type TRoadmap = {
    id: string;
    text?: string;
    image?: string;
    category: string;
    status: string;
    totalUpvote: number;
    totalComment: number;
    createdAt: Date;
}