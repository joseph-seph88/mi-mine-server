import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../repositories/comment.repository';
import { CommentResponseInterface } from '../interfaces/comment-response.interface';

@Injectable()
export class GetRepliesByCommentIdUseCase {
    constructor(private readonly commentRepository: CommentRepository) { }

    async execute(commentId: number, page?: number, limit?: number): Promise<CommentResponseInterface[]> {
        return await this.commentRepository.getRepliesByCommentId(commentId, page, limit);
    }
}
