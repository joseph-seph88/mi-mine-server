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

    const result = await this.createPostUseCase.execute(postData);
    return PostResponseDto.fromDomainResponse(result);
  }

  async getAllPosts(page?: number, limit?: number): Promise<PostResponseDto[]> {
    const result = await this.getAllPostsUseCase.execute(page, limit);
    return result.map(PostResponseDto.fromDomainResponse);
  }

  async getPostByUserId(userId: string, page?: number, limit?: number): Promise<PostResponseDto[]> {
    const result = await this.getPostByUserIdUseCase.execute(userId, page, limit);
    return result.map(PostResponseDto.fromDomainResponse);
  }

  async getPostById(postId: number): Promise<PostResponseDto> {
    const result = await this.getPostByIdUseCase.execute(postId);
    return PostResponseDto.fromDomainResponse(result);
  }

  async updatePost(postId: number, postRequestDto: PostRequestDto): Promise<PostResponseDto> {
    const result = await this.updatePostUseCase.execute(postId, postRequestDto);
    return PostResponseDto.fromDomainResponse(result);
  }

  async deletePost(postId: number): Promise<void> {
    await this.deletePostUseCase.execute(postId);
  }

  async getPostsByRadius(postRadiusRequestDto: PostRadiusRequestDto, page?: number, limit?: number): Promise<PostResponseDto[]> {
    const result = await this.getPostByRadiusUseCase.execute(postRadiusRequestDto, page, limit);
    return result.map(PostResponseDto.fromDomainResponse);
  }
}
