import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CommentUpdateRequestDto {
    @ApiPropertyOptional({ description: '댓글 내용', example: '수정된 댓글 내용입니다' })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    content?: string;
}
