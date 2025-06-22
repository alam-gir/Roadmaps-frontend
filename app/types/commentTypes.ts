export type TCommentParam = {
    page?: number;
    size?: number;
}

export type TComment = {
    id: string;
    authorId: string;
    author: string;
    text?: string;
    image?: string;
    totalUpvote: number;
    totalReplies: number;
    createdAt: Date;
}

export interface TCommentReply extends TComment {
    parentId: string;
    parentAuthor: string;
}

export type TCommentRequest = {
    text?: string;
    image?: File;
}