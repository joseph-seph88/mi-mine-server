import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PostRequestDto {
    @ApiProperty({ description: '게시글 제목', example: '첫 번째 게시글입니다' })
    @IsOptional()
    title?: string;

    @ApiProperty({ description: '게시글 내용', example: '안녕하세요. 첫 번째 게시글 내용입니다.' })
    @IsOptional()
    content?: string;

    @ApiProperty({ description: '게시글 이미지', example: 'https://example.com/image.jpg' })
    @IsOptional()
    image?: string;
}
