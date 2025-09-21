import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';

export interface DeletePostCommand {
    postId: number;
    userId: string;
}

@Injectable()
export class DeletePostUseCase {
    constructor(private readonly postRepository: PostRepository) { }

    async execute(command: DeletePostCommand): Promise<void> {
        const existingPost = await this.postRepository.getPostById(command.postId);

        if (existingPost.userId !== command.userId) {
            throw new Error('게시글 삭제 권한이 없습니다.');
        }

        const isDeleted = await this.postRepository.deletePost(command.postId);

        if (!isDeleted) {
            throw new Error('게시글 삭제에 실패했습니다.');
        }
    }
}
