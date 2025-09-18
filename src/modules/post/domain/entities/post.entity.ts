import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('text')
    content: string;

    @Column({ name: 'user_id' })
    userId: string; // User와의 관계를 ID로만 관리 (순환의존 방지)

    @Column({ default: 0 })
    likeCount: number;

    @Column({ default: 0 })
    commentCount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // 도메인 메서드
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