import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { PostResponseInterface } from '../interfaces/post-response.interface';

@Injectable()
export class GetPostByIdUseCase {
    constructor(private readonly postRepository: PostRepository) { }

    async execute(postId: number): Promise<PostResponseInterface> {
        return await this.postRepository.getPostById(postId);
    }
}
