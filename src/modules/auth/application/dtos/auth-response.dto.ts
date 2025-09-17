import { ApiProperty } from '@nestjs/swagger';
import { AuthUser } from '../../../../shared/interfaces/auth-user.interface';

export class AuthResponseDto {
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
        description: '사용자 정보'
    })
    user: AuthUser;
}

export class RefreshTokenDto {
    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: '리프레시 토큰'
    })
    refreshToken: string;
}
