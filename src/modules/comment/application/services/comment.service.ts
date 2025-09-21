import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CreateCommentUseCase } from '../../domain/usecases/create-comment.usecase';
import { GetCommentsByPostIdUseCase } from '../../domain/usecases/get-comments-by-post-id.usecase';
import { GetCommentsByUserIdUseCase } from '../../domain/usecases/get-comments-by-user-id.usecase';
import { GetCommentByIdUseCase } from '../../domain/usecases/get-comment-by-id.usecase';
import { UpdateCommentUseCase } from '../../domain/usecases/update-comment.usecase';
import { DeleteCommentUseCase } from '../../domain/usecases/delete-comment.usecase';
import { GetRepliesByCommentIdUseCase } from '../../domain/usecases/get-replies-by-comment-id.usecase';
import { CommentRequestInterface } from '../../domain/interfaces/comment-request.interface';
import { CommentRequestDto } from '../../presentation/dtos/request/comment-request.dto';
import { CommentUpdateRequestDto } from '../../presentation/dtos/request/comment-update-request.dto';
import { CommentResponseDto } from '../../presentation/dtos/response/comment-response.dto';

@Injectable()
export class CommentService {
    constructor(
        private readonly createCommentUseCase: CreateCommentUseCase,
        private readonly getCommentsByPostIdUseCase: GetCommentsByPostIdUseCase,
        private readonly getCommentsByUserIdUseCase: GetCommentsByUserIdUseCase,
        private readonly getCommentByIdUseCase: GetCommentByIdUseCase,
        private readonly updateCommentUseCase: UpdateCommentUseCase,
        private readonly deleteCommentUseCase: DeleteCommentUseCase,
        private readonly getRepliesByCommentIdUseCase: GetRepliesByCommentIdUseCase,
    ) { }

    async createComment(commentRequestDto: CommentRequestDto, userId: string): Promise<CommentResponseDto> {
        const commentData: CommentRequestInterface = {
            postId: commentRequestDto.postId,
            userId: userId,
            parentCommentId: commentRequestDto.parentCommentId,
            content: commentRequestDto.content,
        };
        return await this.createCommentUseCase.execute(commentData);
    }

    async getCommentsByPostId(postId: number, page?: number, limit?: number, replyLimit?: number): Promise<CommentResponseDto[]> {
        return await this.getCommentsByPostIdUseCase.execute(postId, page, limit, replyLimit);
    }

    async getCommentsByUserId(userId: string, page?: number, limit?: number): Promise<CommentResponseDto[]> {
        return await this.getCommentsByUserIdUseCase.execute(userId, page, limit);
    }

    async getCommentById(commentId: number): Promise<CommentResponseDto> {
        return await this.getCommentByIdUseCase.execute(commentId);
    }

    async updateComment(
        commentId: number,
        commentUpdateRequestDto: CommentUpdateRequestDto,
        userId: string,
    ): Promise<CommentResponseDto> {
        const existingComment = await this.getCommentById(commentId);
        if (existingComment.userId !== userId) {
            throw new ForbiddenException('댓글을 수정할 권한이 없습니다.');
        }

        const updateData: Partial<CommentRequestInterface> = {
            content: commentUpdateRequestDto.content,
        };

        return await this.updateCommentUseCase.execute(commentId, updateData);
    }

    async deleteComment(commentId: number, userId: string): Promise<void> {
        const existingComment = await this.getCommentById(commentId);
        if (existingComment.userId !== userId) {
            throw new ForbiddenException('댓글을 삭제할 권한이 없습니다.');
        }

        await this.deleteCommentUseCase.execute(commentId);
    }

    async getRepliesByCommentId(commentId: number, page?: number, limit?: number): Promise<CommentResponseDto[]> {
        return await this.getRepliesByCommentIdUseCase.execute(commentId, page, limit);
    }
}
