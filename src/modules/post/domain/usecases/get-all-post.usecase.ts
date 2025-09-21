import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { PostResponseInterface } from '../interfaces/post-response.interface';

@Injectable()
export class GetAllPostsUseCase {
    constructor(private readonly postRepository: PostRepository) { }

    async execute(page?: number, limit?: number): Promise<PostResponseInterface[]> {
        return await this.postRepository.getAllPosts(page, limit);
    }
}
