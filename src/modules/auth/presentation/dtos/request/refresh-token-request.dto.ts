import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenRequestDto {
    @ApiProperty({
        example: '123',
        description: '사용자 ID'
    })
    @IsNotEmpty({ message: '사용자 ID는 필수 입력 항목입니다.' })
    @IsString({ message: '사용자 ID는 문자열이어야 합니다.' })
    userId: string;

    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: '리프레시 토큰'
    })
    @IsNotEmpty({ message: '리프레시 토큰은 필수 입력 항목입니다.' })
    @IsString({ message: '리프레시 토큰은 문자열이어야 합니다.' })
    refreshToken: string;
}
