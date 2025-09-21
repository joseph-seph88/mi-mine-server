import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../repositories/comment.repository';

@Injectable()
export class DeleteCommentUseCase {
    constructor(private readonly commentRepository: CommentRepository) { }

    async execute(commentId: number): Promise<void> {
        await this.commentRepository.deleteComment(commentId);
    }
}
