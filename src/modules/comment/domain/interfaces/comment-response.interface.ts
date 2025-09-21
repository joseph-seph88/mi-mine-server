export interface CommentResponseInterface {
    commentId: number;
    postId: number;
    userId: string;
    parentCommentId: number | null;
    content: string;
    likeCount: number;
    replyCount?: number;
    createdAt: Date;
    updatedAt: Date;
    replies?: CommentResponseInterface[];
}
