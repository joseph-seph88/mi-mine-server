import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../repositories/comment.repository';
import { CommentResponseInterface } from '../interfaces/comment-response.interface';

@Injectable()
export class GetCommentsByPostIdUseCase {
    constructor(private readonly commentRepository: CommentRepository) { }

    async execute(postId: number, page?: number, limit?: number, replyLimit?: number): Promise<CommentResponseInterface[]> {
        return await this.commentRepository.getCommentsByPostId(postId, page, limit, replyLimit);
    }
}
