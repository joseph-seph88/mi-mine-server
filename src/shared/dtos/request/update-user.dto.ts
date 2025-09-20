import { IsOptional, IsNotEmpty, IsArray, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
    @Transform(({ value }) => parseInt(value))
    @IsNumber({}, { message: 'ID는 숫자여야 합니다.' })
    id: number;

    @IsOptional()
    @IsNotEmpty({ message: '닉네임은 빈 값일 수 없습니다.' })
    nickName?: string;

    @IsOptional()
    @Transform(({ value }) => value === '' ? undefined : value)
    profileImageUrl?: string;

    @IsOptional()
    @IsArray({ message: '친구 목록은 배열이어야 합니다.' })
    @Transform(({ value }) => Array.isArray(value) && value.length === 0 ? undefined : value)
    friendIdList?: string[];

    @IsOptional()
    @IsArray({ message: '팔로워 목록은 배열이어야 합니다.' })
    @Transform(({ value }) => Array.isArray(value) && value.length === 0 ? undefined : value)
    followerIdList?: string[];
}