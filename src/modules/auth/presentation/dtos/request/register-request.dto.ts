import { IsEmail, IsNotEmpty, MinLength, MaxLength, Matches } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestDto {
    @ApiProperty({
        example: 'user@example.com',
        description: '사용자 이메일'
    })
    @IsEmail({}, { message: '올바른 이메일 형식을 입력해주세요.' })
    email: string;

    @ApiProperty({
        example: 'password123!',
        description: '비밀번호 (8-20자, 영문+숫자+특수문자)',
        minLength: 8,
        maxLength: 20
    })
    @IsNotEmpty({ message: '비밀번호는 필수 입력 항목입니다.' })
    @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
    @MaxLength(20, { message: '비밀번호는 최대 20자까지 가능합니다.' })
    @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
        message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.'
    })
    password: string;

    @ApiProperty({
        example: '마크2',
        description: '사용자 닉네임 (2-10자)',
        minLength: 2,
        maxLength: 10
    })
    @IsNotEmpty({ message: '닉네임은 필수 입력 항목입니다.' })
    @MinLength(2, { message: '닉네임은 최소 2자 이상이어야 합니다.' })
    @MaxLength(10, { message: '닉네임은 최대 10자까지 가능합니다.' })
    nickName: string;
}