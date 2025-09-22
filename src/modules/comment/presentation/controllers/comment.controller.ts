import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { API_TAGS, CONTROLLERS } from 'src/shared/constants/api.constants';
import { ApiCreateResponse, ApiDeleteResponse, ApiGetResponse, ApiUpdateResponse } from 'src/shared/decorators/swagger/api-response.decorator';
import { ApiCommentQueries, ApiPaginationQueries } from 'src/shared/decorators/swagger/api-query.decorator';
import { CommentRequestDto } from '../dtos/request/comment-request.dto';
import { CommentUpdateRequestDto } from '../dtos/request/comment-update-request.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { JwtPayload } from 'src/shared/interfaces/jwt-payload.interface';
import { CommentService } from '../../application/services/comment.service';
import { AppRoute } from 'src/shared/enums/common';
import { CommentResponseDto } from '../dtos/response/comment-response.dto';

@ApiTags(API_TAGS.COMMENT)
@ApiBearerAuth()
@Controller(CONTROLLERS.COMMENT)
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiCreateResponse('댓글 생성', CommentResponseDto)
    async createComment(
        @Body() commentRequestDto: CommentRequestDto, 
        @CurrentUser() tokenData: JwtPayload
    ) {
        return await this.commentService.createComment(commentRequestDto, tokenData.sub);
    }

    @Get(AppRoute.COMMENT_GET_BY_POST_ID)
    @HttpCode(HttpStatus.OK)
    @ApiGetResponse('특정 포스트의 댓글 목록 조회', CommentResponseDto, { isArray: true })
    @ApiCommentQueries()
    async getCommentsByPostId(
        @Param('postId') postId: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
        @Query('replyLimit') replyLimit?: string,
    ) {
        const pageNum = page ? parseInt(page) : 1;
        const limitNum = limit ? parseInt(limit) : 10;
        const replyLimitNum = replyLimit ? parseInt(replyLimit) : 3;
        return await this.commentService.getCommentsByPostId(parseInt(postId), pageNum, limitNum, replyLimitNum);
    }

    @Get(AppRoute.COMMENT_GET_BY_USER_ID)
    @HttpCode(HttpStatus.OK)
    @ApiGetResponse('특정 사용자의 댓글 목록 조회', CommentResponseDto, { isArray: true })
    @ApiPaginationQueries()
    async getCommentsByUserId(
        @CurrentUser() tokenData: JwtPayload,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        const pageNum = page ? parseInt(page) : 1;
        const limitNum = limit ? parseInt(limit) : 10;
        return await this.commentService.getCommentsByUserId(tokenData.sub, pageNum, limitNum);
    }

    @Get(AppRoute.COMMENT_GET_BY_COMMENT_ID)
    @HttpCode(HttpStatus.OK)
    @ApiGetResponse('댓글 상세 조회', CommentResponseDto)
    async getCommentById(@Param('commentId') commentId: string) {
        return await this.commentService.getCommentById(parseInt(commentId));
    }

    @Get(AppRoute.COMMENT_GET_BY_COMMENT_ID_REPLIES)
    @HttpCode(HttpStatus.OK)
    @ApiGetResponse('특정 댓글의 대댓글 목록 조회', CommentResponseDto, { isArray: true })
    @ApiPaginationQueries()
    async getRepliesByCommentId(
        @Param('commentId') commentId: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        const pageNum = page ? parseInt(page) : 1;
        const limitNum = limit ? parseInt(limit) : 10;
        return await this.commentService.getRepliesByCommentId(parseInt(commentId), pageNum, limitNum);
    }

    @Patch(AppRoute.COMMENT_UPDATE)
    @HttpCode(HttpStatus.OK)
    @ApiUpdateResponse('댓글 수정', CommentResponseDto)
    async updateComment(
        @Param('commentId') commentId: string,
        @Body() commentUpdateRequestDto: CommentUpdateRequestDto,
        @CurrentUser() tokenData: JwtPayload,
    ) {
        return await this.commentService.updateComment(parseInt(commentId), commentUpdateRequestDto, tokenData.sub);
    }

    @Delete(AppRoute.COMMENT_DELETE)
    @HttpCode(HttpStatus.OK)
    @ApiDeleteResponse('댓글 삭제')
    async deleteComment(
        @Param('commentId') commentId: string,
        @CurrentUser() tokenData: JwtPayload,
    ) {
        await this.commentService.deleteComment(parseInt(commentId), tokenData.sub);
    }
}
