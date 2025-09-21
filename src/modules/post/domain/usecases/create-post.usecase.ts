import { Injectable } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { PostRepository } from '../repositories/post.repository';

export interface CreatePostCommand {
    title: string;
    content: string;
    userId: string;
}

@Injectable()
export class CreatePostUseCase {
    constructor(private readonly postRepository: PostRepository) { }

    async execute(command: CreatePostCommand): Promise<Post> {
        const post = Post.create(
            command.title,
            command.content,
            command.userId
        );

        return await this.postRepository.createPost(post);
    }
}
