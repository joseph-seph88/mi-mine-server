import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { PostService } from '../../application/services/post.service';
import { API_TAGS, CONTROLLERS } from 'src/shared/constants/api.constants';
import { ApiCreateResponse, ApiDeleteResponse, ApiGetResponse, ApiUpdateResponse } from 'src/shared/decorators/swagger/api-response.decorator';
import { AppRoute } from 'src/shared/enums/common';
import { PostRequestDto } from '../dtos/request/post-request.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { JwtPayload } from 'src/shared/interfaces/jwt-payload.interface';
import { PostRadiusRequestDto } from '../dtos/request/post-radius-request.dto';

@ApiTags(API_TAGS.POST)
@ApiBearerAuth()
@Controller(CONTROLLERS.POST)
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateResponse('게시글 생성')
  async createPost(@Body() postRequestDto: PostRequestDto, @Req() req: any) {
    return await this.postService.createPost(postRequestDto, req.user.id);
  }

  @Get()
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

  @Get(AppRoute.POST_GET_BY_POST_ID)
  @HttpCode(HttpStatus.OK)
  @ApiGetResponse('게시글 상세 조회')
  @ApiQuery({ name: 'includeComments', required: false, description: '댓글 포함 여부', example: false })
  @ApiQuery({ name: 'commentLimit', required: false, description: '댓글 개수 제한', example: 10 })
  async getPostById(
    @Param('postId') postId: string,
    @Query('includeComments') includeComments?: string,
    @Query('commentLimit') commentLimit?: string,
  ) {
    const shouldIncludeComments = includeComments === 'true';
    const commentLimitNum = commentLimit ? parseInt(commentLimit) : 10;

    return await this.postService.getPostById(
      parseInt(postId),
      shouldIncludeComments,
      commentLimitNum
    );
  }

  @Patch(AppRoute.POST_UPDATE)
  @HttpCode(HttpStatus.OK)
  @ApiUpdateResponse('게시글 수정')
  async updatePost(@Param('postId') postId: string, @Body() postRequestDto: PostRequestDto) {
    return await this.postService.updatePost(parseInt(postId), postRequestDto);
  }

  @Delete(AppRoute.POST_DELETE)
  @HttpCode(HttpStatus.OK)
  @ApiDeleteResponse('게시글 삭제')
  async deletePost(@Param('postId') postId: string) {
    await this.postService.deletePost(parseInt(postId));
  }

  @Get(AppRoute.POST_GET_BY_RADIUS)
  @HttpCode(HttpStatus.OK)
  @ApiGetResponse('반경 내 게시글 조회')
  async getPostsByRadius(@Body() postRadiusRequestDto: PostRadiusRequestDto) {
    return await this.postService.getPostsByRadius(postRadiusRequestDto);
  }
}
