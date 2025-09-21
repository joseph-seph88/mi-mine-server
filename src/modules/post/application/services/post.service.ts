import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '../../domain/entities/post.entity';
import { CreatePostCommand, CreatePostUseCase } from '../../domain/usecases/create-post.usecase';
import { UpdatePostUseCase } from '../../domain/usecases/update-post.usecase';
import { DeletePostUseCase } from '../../domain/usecases/delete-post.usecase';
import { GetAllPostsUseCase } from '../../domain/usecases/get-all-post.usecase';
import { GetPostByUserIdUseCase } from '../../domain/usecases/get-post-by-user-id.usecase';
import { GetPostByIdUseCase } from '../../domain/usecases/get-post-by-id.usecase';
import { PostRequestDto } from '../../presentation/dtos/request/post-request.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly getAllPostsUseCase: GetAllPostsUseCase,
    private readonly getPostByUserIdUseCase: GetPostByUserIdUseCase,
    private readonly getPostByIdUseCase: GetPostByIdUseCase,
    private readonly updatePostUseCase: UpdatePostUseCase,
    private readonly deletePostUseCase: DeletePostUseCase,  
  ) { }

  async createPost(postRequestDto: PostRequestDto, userId: string): Promise<Post> {
    await this.createPostUseCase.execute(createPostDto, userId);
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.getAllPostsUseCase.execute();
  }

  async getPostByUserId(id: string): Promise<Post> {
    const post = await this.getPostByUserIdUseCase.execute(id);
    if (!post) {
      throw new NotFoundException(`게시글을 찾을 수 없습니다. ID: ${id}`);
    }
    return post;
  }

  async getPostById(userId: string): Promise<Post[]> {
    await this.getPostByIdUseCase.execute(userId);
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    await this.updatePostUseCase.execute(id, updatePostDto);
  }

  async deletePost(id: string): Promise<void> {
    await this.deletePostUseCase.execute(id);
  }
}
