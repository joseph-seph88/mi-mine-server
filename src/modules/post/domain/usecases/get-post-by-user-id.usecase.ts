import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { PostResponseInterface } from '../interfaces/post-response.interface';

@Injectable()
export class GetPostByUserIdUseCase {
    constructor(private readonly postRepository: PostRepository) { }

    async execute(userId: string, page?: number, limit?: number): Promise<PostResponseInterface[]> {
        return await this.postRepository.getPostsByUserId(
            userId,
            page,
            limit
        );
    }
}
