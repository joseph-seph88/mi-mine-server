import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
    @ApiProperty({
        example: 'user@example.com',
        description: '사용자 이메일'
    })
    @IsEmail({}, { message: '올바른 이메일 형식을 입력해주세요.' })
    email: string;

    @ApiProperty({
        example: 'password123!',
        description: '사용자 비밀번호'
    })
    @IsNotEmpty({ message: '비밀번호는 필수 입력 항목입니다.' })
    password: string;
}