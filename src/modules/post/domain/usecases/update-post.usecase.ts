import { Injectable } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { PostRepository } from '../repositories/post.repository';

export interface UpdatePostCommand {
    postId: number;
    title?: string;
    content?: string;
    userId: string;
}

@Injectable()
export class UpdatePostUseCase {
    constructor(private readonly postRepository: PostRepository) { }

    async execute(command: UpdatePostCommand): Promise<Post> {
        const existingPost = await this.postRepository.getPostById(command.postId);

        if (existingPost.userId !== command.userId) {
            throw new Error('게시글 수정 권한이 없습니다.');
        }

        if (command.title !== undefined && command.content !== undefined) {
            existingPost.updateContent(command.title, command.content);
        }

        const updatedPost = await this.postRepository.updatePost(command.postId, existingPost);

        if (!updatedPost) {
            throw new Error('게시글 수정에 실패했습니다.');
        }

        return updatedPost;
    }
}
