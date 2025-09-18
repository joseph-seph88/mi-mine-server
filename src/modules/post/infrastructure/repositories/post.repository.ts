import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../domain/entities/post.entity';
import { PostRepositoryInterface } from '../../domain/repositories/post.repository.interface';

@Injectable()
export class PostRepository implements PostRepositoryInterface {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
    ) { }

    async save(post: Post): Promise<Post> {
        return await this.postRepository.save(post);
    }

    async findById(id: string): Promise<Post | null> {
        return await this.postRepository.findOne({ where: { id } });
    }

    async findAll(): Promise<Post[]> {
        return await this.postRepository.find({
            order: { createdAt: 'DESC' },
        });
    }

    async findByUserId(userId: string): Promise<Post[]> {
        return await this.postRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }

    async update(id: string, postData: Partial<Post>): Promise<Post | null> {
        await this.postRepository.update(id, postData);
        return await this.findById(id);
    }

    async softDelete(id: string): Promise<boolean> {
        const result = await this.postRepository.softDelete(id);
        return (result.affected ?? 0) > 0;
    }

    async count(): Promise<number> {
        return await this.postRepository.count();
    }
}
