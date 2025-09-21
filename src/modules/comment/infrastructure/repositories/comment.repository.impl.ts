import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { CommentRepository } from '../../domain/repositories/comment.repository';
import { CommentRequestInterface } from '../../domain/interfaces/comment-request.interface';
import { CommentResponseInterface } from '../../domain/interfaces/comment-response.interface';

@Injectable()
export class CommentRepositoryImpl implements CommentRepository {
    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
    ) { }

    async createComment(data: CommentRequestInterface): Promise<CommentResponseInterface> {
        const comment = CommentEntity.fromRequestData(data);
        const savedComment = await this.commentRepository.save(comment);
        return savedComment.toInterface();
    }

    async getCommentsByPostId(postId: number, page: number = 1, limit: number = 10, replyLimit: number = 3): Promise<CommentResponseInterface[]> {
        const skip = (page - 1) * limit;
        const comments = await this.commentRepository.find({
            where: { postId, parentCommentId: IsNull() },
            relations: ['replies'],
            order: { createdAt: 'DESC' },
            skip,
            take: limit,
        });

        const commentsWithLimitedReplies = await Promise.all(
            comments.map(async (comment) => {
                const limitedReplies = comment.replies
                    ?.slice(0, replyLimit)
                    .map(reply => reply.toInterface()) || [];

                const commentInterface = comment.toInterface();
                commentInterface.replies = limitedReplies;
                return commentInterface;
            })
        );

        return commentsWithLimitedReplies;
    }

    async getCommentsByUserId(userId: string, page: number = 1, limit: number = 10): Promise<CommentResponseInterface[]> {
        const skip = (page - 1) * limit;
        const comments = await this.commentRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
            skip,
            take: limit,
        });

        return comments.map(comment => comment.toInterface());
    }

    async getCommentById(commentId: number): Promise<CommentResponseInterface> {
        const comment = await this.commentRepository.findOne({
            where: { commentId },
            relations: ['replies'],
        });

        if (!comment) {
            throw new Error(`Comment with ID ${commentId} not found`);
        }

        return comment.toInterface();
    }

    async updateComment(commentId: number, data: Partial<CommentRequestInterface>): Promise<CommentResponseInterface> {
        await this.commentRepository.update(commentId, data);
        return await this.getCommentById(commentId);
    }

    async deleteComment(commentId: number): Promise<void> {
        const replies = await this.commentRepository.count({
            where: { parentCommentId: commentId },
        });

        if (replies > 0) {
            await this.commentRepository.update(commentId, {
                content: '[삭제된 댓글입니다]',
            });
        } else {
            await this.commentRepository.delete(commentId);
        }
    }

    async getRepliesByCommentId(commentId: number, page: number = 1, limit: number = 10): Promise<CommentResponseInterface[]> {
        const skip = (page - 1) * limit;
        const replies = await this.commentRepository.find({
            where: { parentCommentId: commentId },
            order: { createdAt: 'ASC' },
            skip,
            take: limit,
        });

        return replies.map(reply => reply.toInterface());
    }
}
