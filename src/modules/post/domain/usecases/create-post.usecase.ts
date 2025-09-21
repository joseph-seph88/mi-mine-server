import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { PostResponseInterface } from '../interfaces/post-response.interface';
import { PostRequestInterface } from '../interfaces/post-request.interface';

@Injectable()
export class CreatePostUseCase {
    constructor(private readonly postRepository: PostRepository) { }

    async execute(postData: PostRequestInterface): Promise<PostResponseInterface> {
        return await this.postRepository.createPost(postData);
    }
}
