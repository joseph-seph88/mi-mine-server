export interface CommentRequestInterface {
    postId: number;
    userId: string;
    parentCommentId?: number | null;
    content: string;
}
