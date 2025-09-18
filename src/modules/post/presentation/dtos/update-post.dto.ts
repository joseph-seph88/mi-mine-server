import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdatePostDto {
    @ApiProperty({ description: '게시글 제목', example: '수정된 게시글 제목', required: false })
    @IsOptional()
    @IsString({ message: '제목은 문자열이어야 합니다.' })
    @MaxLength(100, { message: '제목은 100자 이하여야 합니다.' })
    title?: string;

    @ApiProperty({ description: '게시글 내용', example: '수정된 게시글 내용입니다.', required: false })
    @IsOptional()
    @IsString({ message: '내용은 문자열이어야 합니다.' })
    @MaxLength(2000, { message: '내용은 2000자 이하여야 합니다.' })
    content?: string;
}
