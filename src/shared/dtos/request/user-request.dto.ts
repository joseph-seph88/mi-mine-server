import { ApiProperty } from "@nestjs/swagger";
import { MinLength, MaxLength, IsOptional, IsString, IsNumber, IsArray } from "class-validator";

export class UserRequestDto {
  @ApiProperty({
    example: '마크2',
    description: '사용자 닉네임'
  })
  @IsOptional()
  @MinLength(2, { message: '닉네임은 최소 2자 이상이어야 합니다.' })
  @MaxLength(10, { message: '닉네임은 최대 10자까지 가능합니다.' })
  nickName?: string;

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    description: '사용자 프로필 이미지'
  })
  @IsOptional()
  @IsString({ message: '프로필 이미지는 문자열이어야 합니다.' })
  profileImageUrl?: string;

  @ApiProperty({
    example: 10,
    description: '사용자 친구 수'
  })
  @IsOptional()
  @IsNumber({}, { message: '친구 수는 숫자이어야 합니다.' })
  friendCount?: number;

  @ApiProperty({
    example: 10,
    description: '사용자 팔로워 수'
  })
  @IsOptional()
  @IsNumber({}, { message: '팔로워 수는 숫자이어야 합니다.' })
  followerCount?: number;

  @ApiProperty({
    example: 10,
    description: '사용자 게시글 수'
  })
  @IsOptional()
  @IsNumber({}, { message: '게시글 수는 숫자이어야 합니다.' })
  postCount?: number;

  @ApiProperty({
    example: ['friend1', 'friend2'],
    description: '사용자 친구 목록'
  })
  @IsOptional()
  @IsArray({ message: '친구 목록은 배열이어야 합니다.' })
  friendIdList?: string[];

  @ApiProperty({
    example: ['follower1', 'follower2'],
    description: '사용자 팔로워 목록'
  })
  @IsOptional()
  @IsArray({ message: '팔로워 목록은 배열이어야 합니다.' })
  followerIdList?: string[];
}