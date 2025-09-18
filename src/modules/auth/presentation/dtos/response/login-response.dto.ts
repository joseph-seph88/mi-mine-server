import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'JWT 액세스 토큰'
    })
    accessToken: string;

    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'JWT 리프레시 토큰'
    })
    refreshToken: string;

    @ApiProperty({
        description: '사용자 정보',
        type: 'object',
        properties: {
            id: { type: 'string', example: 'user123' },
            email: { type: 'string', example: 'user@example.com' },
            nickName: { type: 'string', example: '마크2' },
            profileImageUrl: { type: 'string', example: 'https://example.com/profile.jpg' },
            friendCount: { type: 'number', example: 10 },
            followerCount: { type: 'number', example: 25 },
            postCount: { type: 'number', example: 5 }
        }
    })
    user: {
        id: string;
        email: string;
        nickName: string;
        profileImageUrl: string;
        friendCount: number;
        followerCount: number;
        postCount: number;
    };
}
