import { TABLE_NAMES } from 'src/shared/constants/table.constants';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { CommentRequestInterface } from '../../domain/interfaces/comment-request.interface';
import { CommentResponseInterface } from '../../domain/interfaces/comment-response.interface';

@Entity(TABLE_NAMES.COMMENT)
export class CommentEntity {
    @PrimaryGeneratedColumn()
    commentId: number;

    @Column({ name: 'post_id' })
    postId: number;

    @Column({ name: 'user_id' })
    userId: string;

    @Column({ name: 'parent_comment_id', nullable: true })
    parentCommentId: number | null;

    @Column('text')
    content: string;

    @Column({ default: 0 })
    likeCount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => CommentEntity, comment => comment.replies, { nullable: true })
    @JoinColumn({ name: 'parent_comment_id' })
    parentComment: CommentEntity;

    @OneToMany(() => CommentEntity, comment => comment.parentComment)
    replies: CommentEntity[];

    static fromRequestData(data: CommentRequestInterface): CommentEntity {
        const entity = new CommentEntity();
        entity.postId = data.postId;
        entity.userId = data.userId;
        entity.parentCommentId = data.parentCommentId || null;
        entity.content = data.content ?? '';
        return entity;
    }

    toInterface(): CommentResponseInterface {
        return {
            commentId: this.commentId,
            postId: this.postId,
            userId: this.userId,
            parentCommentId: this.parentCommentId,
            content: this.content,
            likeCount: this.likeCount,
            replyCount: this.replies?.length || 0,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            replies: this.replies?.map(reply => reply.toInterface()) || [],
        };
    }
}
