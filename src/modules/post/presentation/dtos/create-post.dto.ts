import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
    @ApiProperty({ description: '게시글 제목', example: '첫 번째 게시글입니다' })
    @IsNotEmpty({ message: '제목은 필수입니다.' })
    @IsString({ message: '제목은 문자열이어야 합니다.' })
    @MaxLength(100, { message: '제목은 100자 이하여야 합니다.' })
    title: string;

    @ApiProperty({ description: '게시글 내용', example: '안녕하세요. 첫 번째 게시글 내용입니다.' })
    @IsNotEmpty({ message: '내용은 필수입니다.' })
    @IsString({ message: '내용은 문자열이어야 합니다.' })
    @MaxLength(2000, { message: '내용은 2000자 이하여야 합니다.' })
    content: string;
}
