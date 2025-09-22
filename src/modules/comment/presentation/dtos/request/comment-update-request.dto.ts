import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentUpdateRequestDto {
    @ApiProperty({ description: '댓글 내용', example: '수정된 댓글 내용입니다' })
    @IsString()
    @IsNotEmpty()
    content: string;
}
