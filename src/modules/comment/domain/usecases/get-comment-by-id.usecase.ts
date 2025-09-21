import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../repositories/comment.repository';
import { CommentResponseInterface } from '../interfaces/comment-response.interface';

@Injectable()
export class GetCommentByIdUseCase {
    constructor(private readonly commentRepository: CommentRepository) { }

    async execute(commentId: number): Promise<CommentResponseInterface> {
        return await this.commentRepository.getCommentById(commentId);
    }
}
