import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../repositories/comment.repository';
import { CommentResponseInterface } from '../interfaces/comment-response.interface';
import { CommentRequestInterface } from '../interfaces/comment-request.interface';

@Injectable()
export class UpdateCommentUseCase {
    constructor(private readonly commentRepository: CommentRepository) { }

    async execute(commentId: number, commentData: Partial<CommentRequestInterface>): Promise<CommentResponseInterface> {
        const updatedComment = await this.commentRepository.updateComment(commentId, commentData);
        return updatedComment;
    }
}
