import { Injectable } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { PostRepository } from '../repositories/post.repository';

export interface GetPostByIdQuery {
    postId: number;
}

@Injectable()
export class GetPostByIdUseCase {
    constructor(private readonly postRepository: PostRepository) { }

    async execute(query: GetPostByIdQuery): Promise<Post> {
        return await this.postRepository.getPostById(query.postId);
    }
}
