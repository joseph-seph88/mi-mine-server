import { TABLE_NAMES } from 'src/shared/constants/table.constants';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PostRequestInterface } from '../../domain/interfaces/post-request.interface';
import { PostResponseInterface } from '../../domain/interfaces/post-response.interface';

@Entity(TABLE_NAMES.POST)
export class PostEntity {
    @PrimaryGeneratedColumn()
    postId: number;

    @Column()
    title: string;

    @Column('text')
    content: string;

    @Column()
    imageUrl: string;

    @Column({ name: 'user_id' })
    userId: string;

    @Column({ default: 0 })
    likeCount: number;

    @Column({ default: 0 })
    commentCount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    static fromRequestData(data: PostRequestInterface): PostEntity {
        const entity = new PostEntity();
        entity.title = data.title ?? '';
        entity.content = data.content ?? '';
        entity.imageUrl = data.imageUrl ?? '';
        return entity;
    }

    toInterface(): PostResponseInterface {
        return {
            postId: this.postId,
            title: this.title,
            content: this.content,
            imageUrl: this.imageUrl,
            userId: this.userId,
            likeCount: this.likeCount,
            commentCount: this.commentCount,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
