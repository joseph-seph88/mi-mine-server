import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { PostResponseInterface } from '../interfaces/post-response.interface';
import { PostRequestInterface } from '../interfaces/post-request.interface';

@Injectable()
export class UpdatePostUseCase {
    constructor(private readonly postRepository: PostRepository) { }

    async execute(postId: number, postData: PostRequestInterface): Promise<PostResponseInterface> {
        const updatedPost = await this.postRepository.updatePost(postId, postData);

        return updatedPost;
    }
}
