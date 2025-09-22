import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CommentRequestDto {
    @ApiProperty({ description: '포스트 ID', example: 1 })
    @Type(() => Number)
    @IsNotEmpty()
    postId: number;

    @ApiPropertyOptional({ description: '부모 댓글 ID (대댓글인 경우)', example: 1 })
    @Type(() => Number)
    @IsOptional()
    parentCommentId?: number | null;

    @ApiProperty({ description: '댓글 내용', example: '좋은 포스트네요!' })
    @IsString()
    @IsNotEmpty()
    content: string;
}
