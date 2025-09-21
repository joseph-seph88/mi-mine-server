import { CommentRequestInterface } from '../interfaces/comment-request.interface';
import { CommentResponseInterface } from '../interfaces/comment-response.interface';

export abstract class CommentRepository {
    abstract createComment(data: CommentRequestInterface): Promise<CommentResponseInterface>;
    abstract getCommentsByPostId(postId: number, page?: number, limit?: number, replyLimit?: number): Promise<CommentResponseInterface[]>;
    abstract getCommentsByUserId(userId: string, page?: number, limit?: number): Promise<CommentResponseInterface[]>;
    abstract getCommentById(commentId: number): Promise<CommentResponseInterface>;
    abstract updateComment(commentId: number, data: Partial<CommentRequestInterface>): Promise<CommentResponseInterface>;
    abstract deleteComment(commentId: number): Promise<void>;
    abstract getRepliesByCommentId(commentId: number, page?: number, limit?: number): Promise<CommentResponseInterface[]>;
}
