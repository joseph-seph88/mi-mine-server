import { Injectable } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { PostRepository } from '../repositories/post.repository';

export interface GetAllPostsQuery {
    page: number;
    limit: number;
}

@Injectable()
export class GetAllPostsUseCase {
    constructor(private readonly postRepository: PostRepository) { }

    async execute(query: GetAllPostsQuery): Promise<Post[]> {
        return await this.postRepository.getAllPosts(query.page, query.limit);
    }
}
