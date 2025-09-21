import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../domain/entities/post.entity';
import { PostRepository } from '../../domain/repositories/post.repository';

@Injectable()
export class PostRepositoryImpl implements PostRepository {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
    ) { }

    async createPost(post: Post): Promise<Post> {
        return await this.postRepository.save(post);
    }

    async getAllPosts(page: number = 1, limit: number = 10): Promise<Post[]> {
        return await this.postRepository.find({
            order: { createdAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
            select: ['id', 'title', 'content', 'likeCount', 'commentCount', 'createdAt', 'updatedAt']
        });
    }

    async getPostsByUserId(userId: string, page?: number, limit?: number): Promise<Post[]> {
        const actualPage = page ?? 1;
        const actualLimit = limit ?? 10;
        return await this.postRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
            skip: (actualPage - 1) * actualLimit,
            take: actualLimit,
            select: ['id', 'title', 'content', 'likeCount', 'commentCount', 'createdAt', 'updatedAt']
        });
    }

    async getPostById(postId: number): Promise<Post> {
        const postData = await this.postRepository.findOne({ where: { id: postId } });

        if (!postData) {
            throw new NotFoundException(`게시글을 찾을 수 없습니다. ID: ${postId}`);
        }

        return postData;
    }

    async updatePost(id: number, post: Partial<Post>): Promise<Post | null> {
        await this.postRepository.update(id, post);
        return await this.postRepository.findOne({ where: { id } });
    }

    async deletePost(id: number): Promise<boolean> {
        const result = await this.postRepository.softDelete(id);
        return (result.affected ?? 0) > 0;
    }
}
