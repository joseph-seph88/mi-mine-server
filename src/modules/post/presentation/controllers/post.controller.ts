import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PostService } from '../../application/services/post.service';
import { API_TAGS, CONTROLLERS } from 'src/shared/constants/api.constants';
import { ApiCreateResponse, ApiDeleteResponse, ApiGetResponse, ApiUpdateResponse } from 'src/shared/decorators/swagger/api-response.decorator';
import { AppRoute } from 'src/shared/enums/common';
import { PostRequestDto } from '../dtos/request/post-request.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { JwtPayload } from 'src/shared/interfaces/jwt-payload.interface';

@ApiTags(API_TAGS.POST)
@ApiBearerAuth()
@Controller(CONTROLLERS.POST)
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post(AppRoute.POST_CREATE)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateResponse('게시글 생성')
  async createPost(@Body() postRequestDto: PostRequestDto, @Req() req: any) {
    return await this.postService.createPost(postRequestDto, req.user.id);
  }

  @Get(AppRoute.POST_GET_ALL)
  @HttpCode(HttpStatus.OK)
  @ApiGetResponse('모든 게시글 조회')
  async getAllPosts() {
    return await this.postService.getAllPosts();
  }

  @Get(AppRoute.POST_GET_BY_USER_ID)
  @HttpCode(HttpStatus.OK)
  @ApiGetResponse('특정 사용자의 게시글 조회')
  async getPostsByUserId(@CurrentUser() tokenData: JwtPayload) {
    return await this.postService.getPostByUserId(tokenData.sub);
  }

  @Get(AppRoute.POST_GET_BY_ID)
  @HttpCode(HttpStatus.OK)
  @ApiGetResponse('게시글 상세 조회')
  async getPostById(@Param('postId') postId: string) {
    return await this.postService.getPostById(postId);
  }

  @Patch(AppRoute.POST_UPDATE)
  @HttpCode(HttpStatus.OK)
  @ApiUpdateResponse('게시글 수정')
  async updatePost(@Param('postId') postId: string, @Body() postRequestDto: PostRequestDto) {
    return await this.postService.updatePost(postId, postRequestDto);
  }

  @Delete(AppRoute.POST_DELETE)
  @HttpCode(HttpStatus.OK)
  @ApiDeleteResponse('게시글 삭제')
  async deletePost(@Param('postId') postId: string) {
    await this.postService.deletePost(postId);
  }
}
