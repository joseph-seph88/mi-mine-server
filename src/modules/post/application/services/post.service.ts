import { Injectable } from '@nestjs/common';
import { UpdatePostUseCase } from '../../domain/usecases/update-post.usecase';
import { DeletePostUseCase } from '../../domain/usecases/delete-post.usecase';
import { GetAllPostsUseCase } from '../../domain/usecases/get-all-post.usecase';
import { GetPostByUserIdUseCase } from '../../domain/usecases/get-post-by-user-id.usecase';
import { GetPostByIdUseCase } from '../../domain/usecases/get-post-by-id.usecase';
import { PostRequestDto } from '../../presentation/dtos/request/post-request.dto';
import { PostResponseDto } from '../../presentation/dtos/response/post-response.dto';
import { CreatePostUseCase } from '../../domain/usecases/create-post.usecase';
import { PostRequestInterface } from '../../domain/interfaces/post-request.interface';
import { PostRadiusRequestDto } from '../../presentation/dtos/request/post-radius-request.dto';
import { GetPostByRadiusUseCase } from '../../domain/usecases/get-post-by-radius.usecase';

@Injectable()
export class PostService {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly getAllPostsUseCase: GetAllPostsUseCase,
    private readonly getPostByUserIdUseCase: GetPostByUserIdUseCase,
    private readonly getPostByIdUseCase: GetPostByIdUseCase,
    private readonly updatePostUseCase: UpdatePostUseCase,
    private readonly deletePostUseCase: DeletePostUseCase,
    private readonly getPostByRadiusUseCase: GetPostByRadiusUseCase,
  ) { }

  async createPost(postRequestDto: PostRequestDto, userId: string): Promise<PostResponseDto> {
    const postData: PostRequestInterface = {
      title: postRequestDto.title || '',
      content: postRequestDto.content || '',
      imageUrl: postRequestDto.imageUrl || '',
    };
    return await this.createPostUseCase.execute(postData);
  }

  async getAllPosts(): Promise<PostResponseDto[]> {
    return await this.getAllPostsUseCase.execute();
  }

  async getPostByUserId(userId: string): Promise<PostResponseDto[]> {
    return await this.getPostByUserIdUseCase.execute(userId);
  }

  async getPostById(postId: number): Promise<PostResponseDto> {
    return await this.getPostByIdUseCase.execute(postId);
  }

  async updatePost(postId: number, postRequestDto: PostRequestDto): Promise<PostResponseDto> {
    return await this.updatePostUseCase.execute(postId, postRequestDto);
  }

  async deletePost(postId: number): Promise<void> {
    await this.deletePostUseCase.execute(postId);
  }

  async getPostsByRadius(postRadiusRequestDto: PostRadiusRequestDto): Promise<PostResponseDto[]> {
    return await this.getPostByRadiusUseCase.execute(postRadiusRequestDto);
  }
}
