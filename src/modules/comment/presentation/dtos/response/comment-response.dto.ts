import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CommentResponseDto {
    @ApiProperty({
        example: 1,
        description: '댓글 ID'
    })
    commentId: number;

    @ApiProperty({
        example: 1,
        description: '게시글 ID'
    })
    postId: number;

    @ApiProperty({
        example: '1',
        description: '사용자 ID'
    })
    userId: string;

    @ApiProperty({
        example: 1,
        description: '부모 댓글 ID'
    })
    parentCommentId: number | null;

    @ApiProperty({
        example: '좋은 포스트네요!',
        description: '댓글 내용'
    })
    content: string;

    @ApiProperty({
        example: 1,
        description: '좋아요 수'
    })
    likeCount: number;

    @ApiPropertyOptional({
        example: 1,
        description: '대댓글 수'
    })
    replyCount?: number;

    @ApiProperty({
        example: '2025-09-18T10:30:00.000Z',
        description: '생성 시간'
    })
    createdAt: Date;

    @ApiProperty({
        example: '2025-09-18T10:30:00.000Z',
        description: '수정 시간'
    })
    updatedAt: Date;

    @ApiPropertyOptional({
        type: () => CommentResponseDto,
        isArray: true,
        example: [
            {
                commentId: 2,
                postId: 1,
                userId: '2',
                parentCommentId: 1,
                content: '대댓글입니다!',
                likeCount: 0,
                replyCount: 0,
                createdAt: '2025-09-18T10:35:00.000Z',
                updatedAt: '2025-09-18T10:35:00.000Z'
            }
        ],
        description: '대댓글 목록'
    })
    replies?: CommentResponseDto[];
}
