import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PostService } from '../../application/services/post.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { JwtAuthGuard } from '../../../../shared/security/guards/jwt-auth.guard';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 생성' })
  @ApiResponse({ status: 201, description: '게시글이 성공적으로 생성되었습니다.' })
  async create(@Body() createPostDto: CreatePostDto, @Req() req: any) {
    return await this.postService.create(createPostDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: '모든 게시글 조회' })
  @ApiResponse({ status: 200, description: '게시글 목록을 성공적으로 조회했습니다.' })
  async findAll() {
    return await this.postService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: '특정 사용자의 게시글 조회' })
  @ApiResponse({ status: 200, description: '사용자의 게시글 목록을 성공적으로 조회했습니다.' })
  async findByUserId(@Param('userId') userId: string) {
    return await this.postService.findByUserId(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: '게시글 상세 조회' })
  @ApiResponse({ status: 200, description: '게시글을 성공적으로 조회했습니다.' })
  @ApiResponse({ status: 404, description: '게시글을 찾을 수 없습니다.' })
  async findOne(@Param('id') id: string) {
    return await this.postService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 수정' })
  @ApiResponse({ status: 200, description: '게시글이 성공적으로 수정되었습니다.' })
  @ApiResponse({ status: 404, description: '게시글을 찾을 수 없습니다.' })
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiResponse({ status: 200, description: '게시글이 성공적으로 삭제되었습니다.' })
  @ApiResponse({ status: 404, description: '게시글을 찾을 수 없습니다.' })
  async remove(@Param('id') id: string) {
    await this.postService.remove(id);
    return { message: '게시글이 성공적으로 삭제되었습니다.' };
  }

  @Get('stats/count')
  @ApiOperation({ summary: '전체 게시글 수 조회' })
  @ApiResponse({ status: 200, description: '게시글 수를 성공적으로 조회했습니다.' })
  async getPostCount() {
    const count = await this.postService.getPostCount();
    return { count };
  }
}
