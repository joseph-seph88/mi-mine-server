import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../repositories/comment.repository';
import { CommentResponseInterface } from '../interfaces/comment-response.interface';
import { CommentRequestInterface } from '../interfaces/comment-request.interface';

@Injectable()
export class CreateCommentUseCase {
    constructor(private readonly commentRepository: CommentRepository) { }

    async execute(commentData: CommentRequestInterface): Promise<CommentResponseInterface> {
        return await this.commentRepository.createComment(commentData);
    }
}
