import { TABLE_NAMES } from 'src/shared/constants/table.constants';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity(TABLE_NAMES.POST)
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    content: string;

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

    static create(title: string, content: string, userId: string): Post {
        const post = new Post();
        post.title = title;
        post.content = content;
        post.userId = userId;
        post.likeCount = 0;
        post.commentCount = 0;
        return post;
    }

    updateContent(title: string, content: string): void {
        this.title = title;
        this.content = content;
    }

    incrementLike(): void {
        this.likeCount++;
    }

    incrementComment(): void {
        this.commentCount++;
    }
}