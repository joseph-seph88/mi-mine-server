import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({
        example: 'user@example.com',
        description: '사용자 이메일'
    })
    @IsEmail({}, { message: '유효한 이메일 주소를 입력해주세요.' })
    email: string;

    @ApiProperty({
        example: 'password123',
        description: '사용자 비밀번호',
        minLength: 8
    })
    @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
    @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
    password: string;

    @ApiProperty({
        example: '마크2',
        description: '사용자 이름'
    })
    @IsString({ message: '이름은 문자열이어야 합니다.' })
    @MinLength(2, { message: '이름은 최소 2자 이상이어야 합니다.' })
    name: string;
}
