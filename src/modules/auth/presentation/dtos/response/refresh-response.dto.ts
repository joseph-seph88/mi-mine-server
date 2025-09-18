import { ApiProperty } from "@nestjs/swagger";

export class RefreshResponseDto {
    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: '액세스 토큰'
    })
    accessToken: string;

    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: '리프레시 토큰'
    })
    refreshToken: string;

    @ApiProperty({
        example: 900,
        description: '토큰 만료 시간 (초)'
    })
    expiresIn: number;
}
