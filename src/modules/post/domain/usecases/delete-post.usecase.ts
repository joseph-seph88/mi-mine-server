import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';

@Injectable()
export class DeletePostUseCase {
    constructor(private readonly postRepository: PostRepository) { }

    async execute(postId: number): Promise<void> {
        await this.postRepository.deletePost(postId);
    }
}
