import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../repositories/comment.repository';
import { CommentResponseInterface } from '../interfaces/comment-response.interface';

@Injectable()
export class GetCommentsByUserIdUseCase {
    constructor(private readonly commentRepository: CommentRepository) { }

    async execute(userId: string, page?: number, limit?: number): Promise<CommentResponseInterface[]> {
        return await this.commentRepository.getCommentsByUserId(userId, page, limit);
    }
}
