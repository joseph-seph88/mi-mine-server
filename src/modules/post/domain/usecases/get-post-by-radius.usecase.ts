import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { PostResponseInterface } from '../interfaces/post-response.interface';
import { PostRadiusRequestInterface } from '../interfaces/post-radius-request.interface';

@Injectable()
export class GetPostByRadiusUseCase {
    constructor(private readonly postRepository: PostRepository) { }

    async execute(postRadiusRequestInterface: PostRadiusRequestInterface, page?: number, limit?: number): Promise<PostResponseInterface[]> {
        return await this.postRepository.getPostsByRadius(postRadiusRequestInterface, page, limit);
    }
}