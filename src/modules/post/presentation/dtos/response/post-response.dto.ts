import { ApiProperty } from "@nestjs/swagger";
import { PostResponseInterface } from "src/modules/post/domain/interfaces/post-response.interface";

export class PostResponseDto {
    @ApiProperty({ description: '게시글 ID', example: 1 })
    postId: number;

    @ApiProperty({ description: '제목', example: '제목' })
    title: string;

    @ApiProperty({ description: '내용', example: '내용' })
    content: string;

    @ApiProperty({ description: '이미지 URL', example: 'https://example.com/image.jpg' })
    imageUrl: string;

    @ApiProperty({ description: '사용자 ID', example: '1' })
    userId: string;

    @ApiProperty({ description: '좋아요 수', example: 1 })
    likeCount: number;

    @ApiProperty({ description: '댓글 수', example: 1 })
    commentCount: number;

    @ApiProperty({ description: '생성 시간', example: '2025-01-01' })
    createdAt: Date;

    @ApiProperty({ description: '수정 시간', example: '2025-01-01' })
    updatedAt: Date;

    @ApiProperty({ description: '위도', example: 1.23456789 })
    latitude: number;

    @ApiProperty({ description: '경도', example: 1.23456789 })
    longitude: number;


    static fromDomainResponse(domainResponse: PostResponseInterface): PostResponseDto {
        return {
            postId: domainResponse.postId,
            title: domainResponse.title,
            content: domainResponse.content,
            imageUrl: domainResponse.imageUrl,
            userId: domainResponse.userId,
            likeCount: domainResponse.likeCount,
            commentCount: domainResponse.commentCount,
            createdAt: domainResponse.createdAt,
            updatedAt: domainResponse.updatedAt,
            latitude: domainResponse.latitude ?? 0,
            longitude: domainResponse.longitude ?? 0,
        };
    }
}
