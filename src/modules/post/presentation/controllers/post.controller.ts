import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PostService } from '../../application/services/post.service';
import { API_TAGS, CONTROLLERS } from 'src/shared/constants/api.constants';
import { ApiCreateResponse, ApiDeleteResponse, ApiGetResponse, ApiUpdateResponse } from 'src/shared/decorators/swagger/api-response.decorator';
import { AppRoute } from 'src/shared/enums/common';
import { PostRequestDto } from '../dtos/request/post-request.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { JwtPayload } from 'src/shared/interfaces/jwt-payload.interface';
import { PostRadiusRequestDto } from '../dtos/request/post-radius-request.dto';
import { PostResponseDto } from '../dtos/response/post-response.dto';
import { ApiPaginationQueries } from 'src/shared/decorators/swagger/api-query.decorator';

@ApiTags(API_TAGS.POST)
@ApiBearerAuth()
@Controller(CONTROLLERS.POST)
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateResponse('게시글 생성', PostResponseDto)
  async createPost(
    @Body() postRequestDto: PostRequestDto,
    @CurrentUser() tokenData: JwtPayload
  ) {
    return await this.postService.createPost(postRequestDto, tokenData.sub);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiGetResponse('모든 게시글 조회', PostResponseDto, { isArray: true })
  @ApiPaginationQueries()
  async getAllPosts(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 10;
    return await this.postService.getAllPosts(pageNum, limitNum);
  }

  @Get(AppRoute.POST_GET_BY_USER_ID)
  @HttpCode(HttpStatus.OK)
  @ApiGetResponse('특정 사용자의 게시글 조회', PostResponseDto, { isArray: true })
  @ApiPaginationQueries()
  async getPostsByUserId(
    @CurrentUser() tokenData: JwtPayload,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 10;
    return await this.postService.getPostByUserId(tokenData.sub, pageNum, limitNum);
  }

  @Get(AppRoute.POST_GET_BY_POST_ID)
  @HttpCode(HttpStatus.OK)
  @ApiGetResponse('게시글 상세 조회', PostResponseDto)
  async getPostById(@Param('postId') postId: string) {
    return await this.postService.getPostById(parseInt(postId));
  }

  @Patch(AppRoute.POST_UPDATE)
  @HttpCode(HttpStatus.OK)
  @ApiUpdateResponse('게시글 수정', PostResponseDto)
  async updatePost(
    @Param('postId') postId: string, 
    @Body() postRequestDto: PostRequestDto,
  ) {
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
  @ApiGetResponse('반경 내 게시글 조회', PostResponseDto, { isArray: true })
  @ApiPaginationQueries()
  async getPostsByRadius(
    @Body() postRadiusRequestDto: PostRadiusRequestDto,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 10;
    
    return await this.postService.getPostsByRadius(postRadiusRequestDto, pageNum, limitNum);
  }
}
