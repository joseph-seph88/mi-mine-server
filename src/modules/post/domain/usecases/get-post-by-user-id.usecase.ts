import { Injectable } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { PostRepository } from '../repositories/post.repository';

export interface GetPostByUserIdQuery {
    userId: string;
    page?: number;
    limit?: number;
}

@Injectable()
export class GetPostByUserIdUseCase {
    constructor(private readonly postRepository: PostRepository) { }

    async execute(query: GetPostByUserIdQuery): Promise<Post[]> {
        return await this.postRepository.getPostsByUserId(
            query.userId,
            query.page,
            query.limit
        );
    }
}
