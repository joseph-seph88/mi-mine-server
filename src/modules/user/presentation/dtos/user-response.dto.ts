import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
  @ApiProperty({ description: '사용자 ID', example: '1' })
  id: string;

  @ApiProperty({ description: '사용자 이메일', example: 'test@example.com' })
  email: string;

  @ApiProperty({ description: '사용자 닉네임', example: 'test' })
  nickName: string;

  @ApiProperty({ description: '사용자 프로필 이미지', example: 'https://example.com/profile.jpg' })
  profileImageUrl: string;

  @ApiProperty({ description: '사용자 친구 수', example: 1 })
  friendCount: number;

  @ApiProperty({ description: '사용자 팔로워 수', example: 1 })
  followerCount: number;

  @ApiProperty({ description: '사용자 게시글 수', example: 1 })
  postCount: number;

  @ApiProperty({ description: '사용자 역할', example: ['user'] })
  roles?: string[];

  @ApiProperty({ description: '사용자 생성 시간', example: '2025-01-01' })
  createdAt: Date;

  @ApiProperty({ description: '사용자 수정 시간', example: '2025-01-01' })
  updatedAt: Date;

  @ApiProperty({ description: '사용자 삭제 시간', example: '2025-01-01' })
  deletedAt: Date | null;

  @ApiProperty({ description: '사용자 친구 목록', example: ['friend1', 'friend2'] })
  friendIdList: string[];

  @ApiProperty({ description: '사용자 팔로워 목록', example: ['follower1', 'follower2'] })
  followerIdList: string[];

  static create(data: Partial<UserResponseDto>): UserResponseDto {
    return Object.assign(new UserResponseDto(), data);
  }
}
